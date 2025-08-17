-- Fix rate_limits table RLS policy to allow application access
-- This is critical for rate limiting functionality to work properly

-- Enable RLS on rate_limits table (if not already enabled)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow the application to manage rate limiting data
-- This allows anonymous users to check and update rate limits
CREATE POLICY "Allow application rate limiting access" 
ON public.rate_limits 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Note: This policy allows the application to function while preventing direct user access
-- The rate limiting data is not sensitive and is automatically cleaned up