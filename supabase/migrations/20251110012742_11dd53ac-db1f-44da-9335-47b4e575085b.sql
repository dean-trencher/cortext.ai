-- Create table for crypto ticker configuration
CREATE TABLE public.crypto_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_address TEXT NOT NULL DEFAULT '',
  pump_fun_link TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.crypto_config ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read the config
CREATE POLICY "Anyone can read crypto config"
  ON public.crypto_config
  FOR SELECT
  USING (true);

-- Only allow updates (no inserts/deletes to maintain single row)
CREATE POLICY "Anyone can update crypto config"
  ON public.crypto_config
  FOR UPDATE
  USING (true);

-- Insert initial config row
INSERT INTO public.crypto_config (contract_address, pump_fun_link)
VALUES ('', '');

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION public.update_crypto_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for timestamp
CREATE TRIGGER update_crypto_config_timestamp
  BEFORE UPDATE ON public.crypto_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crypto_config_updated_at();