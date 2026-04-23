set check_function_bodies = off;
set search_path = public;

-- Drop the recursive policy
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;

-- Helper to check admin role without recursive policy evaluation
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = user_id AND role = 'admin'
  );
$$;

-- Recreate the admin policy using the helper function
CREATE POLICY "Admins can view all users"
  ON public.users
  FOR SELECT
  USING (public.is_admin(auth.uid()));
