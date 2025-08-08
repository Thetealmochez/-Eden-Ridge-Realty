-- Fix remaining security issues for all database functions
-- Set secure search_path for all functions to prevent SQL injection

-- Update bootstrap_admin function with secure search_path
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

-- Create security events table for audit logging
CREATE TABLE IF NOT EXISTS public.security_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type text NOT NULL,
    user_id uuid,
    details jsonb,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on security events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view security events
CREATE POLICY "Only admins can view security events"
ON public.security_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Function to log admin actions with secure search_path
CREATE OR REPLACE FUNCTION public.log_admin_action(_action text, _target_user_id uuid DEFAULT NULL, _details jsonb DEFAULT NULL)
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

-- Function to validate session security with secure search_path
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