import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', { supabaseUrl, supabaseAnonKey });
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
});

// Database types
export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  city: string;
  venue: string;
  category: string;
  description: string;
  image: string;
  ticket_price: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

// Event operations
export const eventOperations = {
  // Get all events
  async getAll(includeInactive = false): Promise<Event[]> {
    let query = supabase
      .from('events')
      .select('*');
    
    // Filter to only active events unless specifically requested otherwise
    if (!includeInactive) {
      query = query.eq('status', 'ACT');
    }
    
    const { data, error } = await query
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
    
    return data || [];
  },

  // Get single event by ID
  async getById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Event not found
      }
      console.error('Error fetching event:', error);
      throw error;
    }
    
    return data;
  },

  // Create new event
  async create(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Event> {
    console.log('Creating event with data:', eventData);
    
    // Ensure new events are created with active status
    const eventWithStatus = {
      ...eventData,
      status: 'ACT'
    };
    
    const { data, error } = await supabase
      .from('events')
      .insert([eventWithStatus])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error, 'Data:', eventWithStatus);
      throw error;
    }
    
    console.log('Event created successfully:', data);
    return data;
  },

  // Update existing event
  async update(id: string, eventData: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>): Promise<Event> {
    console.log('Updating event:', id, 'with data:', eventData);
    
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating event:', error, 'ID:', id, 'Data:', eventData);
      throw error;
    }
    
    console.log('Event updated successfully:', data);
    return data;
  },

  // Soft delete event (mark as deleted)
  async softDelete(id: string): Promise<Event> {
    console.log('Soft deleting event:', id);
    
    const { data, error } = await supabase
      .from('events')
      .update({ status: 'DEL' })
      .eq('id', id)
      .eq('status', 'ACT')  // Only delete if currently active
      .select()
      .single();
    
    if (error) {
      console.error('Error soft deleting event:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      throw error;
    }
    
    if (!data) {
      console.error('No data returned from soft delete operation');
      throw new Error('Event not found or already deleted');
    }
    
    console.log('Event soft deleted successfully:', data);
    return data;
  },

  // Hard delete event (permanent removal)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};