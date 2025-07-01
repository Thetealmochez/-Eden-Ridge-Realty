
-- Add new columns to the leads table to store detailed information from the AI assistant
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS preference TEXT, -- 'rent' or 'buy'
ADD COLUMN IF NOT EXISTS location_preference TEXT,
ADD COLUMN IF NOT EXISTS budget_min NUMERIC,
ADD COLUMN IF NOT EXISTS budget_max NUMERIC,
ADD COLUMN IF NOT EXISTS bedrooms_preference INTEGER,
ADD COLUMN IF NOT EXISTS timeline TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'ai_assistant',
ADD COLUMN IF NOT EXISTS conversation_data JSONB,
ADD COLUMN IF NOT EXISTS lead_score INTEGER DEFAULT 0;

-- Create an index on the source column for better performance
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);

-- Create an index on the preference column for filtering
CREATE INDEX IF NOT EXISTS idx_leads_preference ON public.leads(preference);
