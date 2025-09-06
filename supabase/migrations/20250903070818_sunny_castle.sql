/*
  # Create events table for live music platform

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `name` (text, event name)
      - `date` (text, event date)
      - `time` (text, event time)
      - `location` (text, event location)
      - `city` (text, event city)
      - `venue` (text, event venue)
      - `category` (text, music category/genre)
      - `description` (text, event description)
      - `image` (text, image URL)
      - `ticket_price` (decimal, standard ticket price)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `events` table
    - Add policy for public read access (anyone can view events)
    - Add policy for authenticated users to create/update events

  3. Sample Data
    - Insert demo events to populate the table
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  city text NOT NULL,
  venue text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  ticket_price decimal(10,2) NOT NULL DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Create policies for authenticated users to insert/update
CREATE POLICY "Authenticated users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample events data
INSERT INTO events (name, date, time, location, city, venue, category, description, image, ticket_price) VALUES
(
  'Electric Nights Festival',
  '2024-03-15',
  '19:00',
  'Downtown District',
  'Los Angeles',
  'The Grand Arena',
  'Electronic',
  'An electrifying night of electronic music featuring top DJs from around the world. Experience cutting-edge sound systems and mesmerizing light shows.',
  'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
  89.99
),
(
  'Jazz Under the Stars',
  '2024-03-22',
  '20:30',
  'Riverside Park',
  'New York',
  'Central Pavilion',
  'Jazz',
  'A sophisticated evening of smooth jazz under the open sky. Featuring renowned jazz musicians in an intimate outdoor setting.',
  'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  65.00
),
(
  'Rock Revolution',
  '2024-04-05',
  '18:00',
  'Industrial Quarter',
  'Chicago',
  'Steel Factory',
  'Rock',
  'Raw energy and powerful performances from emerging and established rock bands. A night that will shake the foundations.',
  'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
  75.50
),
(
  'Classical Harmony',
  '2024-04-12',
  '19:30',
  'Arts District',
  'Boston',
  'Symphony Hall',
  'Classical',
  'An evening of timeless classical compositions performed by world-class musicians. Experience the beauty of orchestral music.',
  'https://images.pexels.com/photos/33597/guitar-classical-guitar-acoustic-guitar-electric-guitar.jpg',
  95.00
),
(
  'Hip-Hop Block Party',
  '2024-04-20',
  '17:00',
  'Urban Center',
  'Atlanta',
  'Street Plaza',
  'Hip-Hop',
  'Street culture comes alive with beats, rhymes, and community spirit. Featuring local and national hip-hop artists.',
  'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
  45.00
);