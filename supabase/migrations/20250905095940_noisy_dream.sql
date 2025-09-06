/*
  # Update existing events to active status

  1. Changes
    - Set all existing events (where status is NULL or not 'ACT') to 'ACT' status
    - This ensures all previously created events are visible again

  2. Notes
    - This migration fixes the issue where existing events disappeared after adding the status field
    - All events will be marked as active by default
*/

-- Update all existing events to have active status
UPDATE events 
SET status = 'ACT' 
WHERE status IS NULL OR status != 'ACT';