-- Fix function search_path security issue
-- Update all SECURITY DEFINER functions to set search_path properly

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$function$;

CREATE OR REPLACE FUNCTION public.log_admin_action(_action text, _target_user_id uuid DEFAULT NULL::uuid, _details jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only allow if user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin privileges required';
  END IF;
  
  INSERT INTO public.security_events (event_type, user_id, details)
  VALUES (_action, COALESCE(_target_user_id, auth.uid()), _details);
END;
$function$;

CREATE OR REPLACE FUNCTION public.validate_session_security()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _session_created timestamp with time zone;
  _max_session_duration interval := '24 hours';
BEGIN
  -- Get session creation time (simplified check)
  SELECT created_at INTO _session_created
  FROM auth.sessions
  WHERE user_id = auth.uid()
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Check if session is too old
  IF _session_created IS NULL OR (now() - _session_created) > _max_session_duration THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$function$;

CREATE OR REPLACE FUNCTION public.check_rate_limit(_identifier text, _rate_limit_type text, _max_requests integer, _window_minutes integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _window_start timestamp with time zone;
  _current_count integer;
BEGIN
  _window_start := now() - interval '1 minute' * _window_minutes;
  
  -- Clean up old entries
  DELETE FROM public.rate_limits 
  WHERE window_start < _window_start;
  
  -- Get current count for this identifier and type
  SELECT request_count INTO _current_count
  FROM public.rate_limits
  WHERE identifier = _identifier 
    AND rate_limit_type = _rate_limit_type
    AND window_start >= _window_start;
  
  -- If no existing record, create one
  IF _current_count IS NULL THEN
    INSERT INTO public.rate_limits (identifier, rate_limit_type, request_count, window_start)
    VALUES (_identifier, _rate_limit_type, 1, now());
    RETURN true;
  END IF;
  
  -- Check if limit exceeded
  IF _current_count >= _max_requests THEN
    RETURN false;
  END IF;
  
  -- Increment counter
  UPDATE public.rate_limits 
  SET request_count = request_count + 1
  WHERE identifier = _identifier 
    AND rate_limit_type = _rate_limit_type
    AND window_start >= _window_start;
  
  RETURN true;
END;
$function$;

CREATE OR REPLACE FUNCTION public.bootstrap_admin(_email text, _bootstrap_key text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _user_id uuid;
  _expected_key text;
  _existing_admin_count integer;
BEGIN
  -- Generate expected bootstrap key (change this in production)
  _expected_key := encode(digest('bootstrap_admin_2025_secure', 'sha256'), 'hex');
  
  -- Verify bootstrap key
  IF _bootstrap_key != _expected_key THEN
    RETURN false;
  END IF;
  
  -- Enhanced validation: Check if ANY admin already exists
  SELECT COUNT(*) INTO _existing_admin_count 
  FROM public.user_roles 
  WHERE role = 'admin';
  
  IF _existing_admin_count > 0 THEN
    RAISE EXCEPTION 'Admin user already exists. Bootstrap process not allowed.';
  END IF;
  
  -- Find user by email
  SELECT id INTO _user_id 
  FROM auth.users 
  WHERE email = _email;
  
  IF _user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Grant admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  -- Log the admin creation for security audit
  INSERT INTO public.security_events (event_type, user_id, details)
  VALUES ('admin_bootstrapped', _user_id, jsonb_build_object('email', _email));
  
  RETURN true;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT public.has_role(auth.uid(), 'admin');
$function$;