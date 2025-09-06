/*
  # Add status field to events table

  1. Schema Changes
    - Add `status` column to `events` table
    - Set default value to 'ACT' (active)
    - Allow values: 'ACT', 'DEL', 'HID', 'HIS'

  2. Data Migration
    - Update existing events to have 'ACT' status
*/

-- Add status column with default value
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'ACT' NOT NULL;

-- Add check constraint to ensure only valid status values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'events_status_check' 
    AND table_name = 'events'
  ) THEN
    ALTER TABLE events 
    ADD CONSTRAINT events_status_check 
    CHECK (status IN ('ACT', 'DEL', 'HID', 'HIS'));
  END IF;
END $$;

-- Update existing events to have active status
UPDATE events SET status = 'ACT' WHERE status IS NULL;