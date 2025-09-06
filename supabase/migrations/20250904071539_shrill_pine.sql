/*
  # Fix RLS policies for demo application

  1. Security Changes
    - Update INSERT policy to allow anonymous users to create events
    - Update UPDATE policy to allow anonymous users to edit events
    - Keep SELECT policy as public access (already working)
  
  2. Rationale
    - This is a demo application without authentication
    - Users should be able to create and edit events without signing in
    - Maintains security structure while enabling functionality
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can create events" ON events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON events;

-- Create new policies that allow anonymous access for demo purposes
CREATE POLICY "Anyone can create events"
  ON events
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update events"
  ON events
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Keep the existing SELECT policy (already allows public access)
-- CREATE POLICY "Anyone can view events" ON events FOR SELECT TO public USING (true);