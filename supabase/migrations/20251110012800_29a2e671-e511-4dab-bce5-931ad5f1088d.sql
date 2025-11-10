-- Drop trigger first, then function, then recreate with correct search path
DROP TRIGGER IF EXISTS update_crypto_config_timestamp ON public.crypto_config;
DROP FUNCTION IF EXISTS public.update_crypto_config_updated_at() CASCADE;

-- Recreate function with correct search path
CREATE OR REPLACE FUNCTION public.update_crypto_config_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_crypto_config_timestamp
  BEFORE UPDATE ON public.crypto_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crypto_config_updated_at();