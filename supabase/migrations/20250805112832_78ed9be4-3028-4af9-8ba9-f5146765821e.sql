-- Fix database function security vulnerability by setting search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$function$;

-- Update is_admin function with proper search_path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT public.has_role(auth.uid(), 'admin');
$function$;

-- Create secure admin bootstrap function
CREATE OR REPLACE FUNCTION public.bootstrap_admin(_email text, _bootstrap_key text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  _user_id uuid;
  _expected_key text;
BEGIN
  -- Generate expected bootstrap key (change this in production)
  _expected_key := encode(digest('bootstrap_admin_2025_secure', 'sha256'), 'hex');
  
  -- Verify bootstrap key
  IF _bootstrap_key != _expected_key THEN
    RETURN false;
  END IF;
  
  -- Check if admin already exists
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN false;
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
  
  RETURN true;
END;
$function$;

-- Create server-side rate limiting table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  rate_limit_type text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for rate limits (admin only)
CREATE POLICY "Admins can manage rate limits"
ON public.rate_limits
FOR ALL
USING (public.is_admin());

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_type 
ON public.rate_limits (identifier, rate_limit_type);

-- Create function for server-side rate limiting
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _identifier text,
  _rate_limit_type text,
  _max_requests integer,
  _window_minutes integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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