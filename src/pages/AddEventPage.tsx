import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Calendar, Clock, MapPin, Tag, FileText, Building, DollarSign, Plus } from 'lucide-react';

interface EventForm {
  name: string;
  date: string;
  time: string;
  location: string;
  city: string;
  venue: string;
  category: string;
  description: string;
  image: string;
  ticketPrice: number;
}

const AddEventPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EventForm>({
    name: '',
    date: '',
    time: '',
    location: '',
    city: '',
    venue: '',
    category: 'Rock',
    description: '',
    image: '',
    ticketPrice: 45
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof EventForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Demo save - just show success message
    alert(`Event "${formData.name}" created successfully!\n\n(Demo mode - event is not persisted)`);
    setHasChanges(false);
    navigate('/');
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmDiscard = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirmDiscard) return;
    }
    navigate('/');
  };

  const categories = ['Rock', 'Jazz', 'Indie', 'Electronic', 'Acoustic', 'Pop', 'Classical', 'Hip-Hop'];

  const isFormValid = formData.name && formData.date && formData.time && formData.location && 
                     formData.city && formData.venue && formData.description;

  return (
    <motion.div
      className="min-h-screen py-8 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 group"
          >
            <ArrowLeft size={20} className="group-hover:text-purple-600 transition-colors" />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="flex items-center space-x-4">
            {hasChanges && (
              <motion.span
                className="text-sm text-orange-600 font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                Unsaved changes
              </motion.span>
            )}
            <motion.button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`flex items-center space-x-2 px-6 py-3 font-semibold rounded-xl shadow-lg transition-all ${
                isFormValid 
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-xl' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={isFormValid ? { scale: 1.02 } : {}}
              whileTap={isFormValid ? { scale: 0.98 } : {}}
            >
              <Save size={18} />
              <span>Create Event</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
          {/* Page Title */}
          <div className="p-8 border-b border-gray-100">
            <motion.h1
              className="text-3xl font-bold text-gray-800 flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Plus className="text-green-600" size={32} />
              <span>Create New Event</span>
            </motion.h1>
            <p className="text-gray-600 mt-2">Fill in the details below to create a new music event. All fields marked with * are required.</p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Event Name */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Tag size={16} className="text-green-600" />
                    <span>Event Name *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter event name"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Tag size={16} className="text-green-600" />
                    <span>Category *</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="text-green-600" />
                      <span>Date *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., April 25, 2024"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clock size={16} className="text-green-600" />
                      <span>Time *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., 9:00 PM"
                    />
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Building size={16} className="text-green-600" />
                    <span>Venue *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter venue name"
                  />
                </div>

                {/* Ticket Price */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign size={16} className="text-green-600" />
                    <span>Standard Ticket Price *</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.ticketPrice}
                      onChange={(e) => handleInputChange('ticketPrice', parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="45.00"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Location & City */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="text-green-600" />
                      <span>Location *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., Downtown District"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="text-green-600" />
                      <span>City *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="e.g., Los Angeles, CA"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <span>Event Image URL</span>
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/image.jpg (optional)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to use a default image</p>
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={16} className="text-green-600" />
                    <span>Event Description *</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe the event, what attendees can expect, featured artists, etc..."
                  />
                </div>
              </motion.div>
            </div>

            {/* Preview Section */}
            <motion.div
              className="mt-8 pt-8 border-t border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Event Preview</h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt={formData.name || 'Event preview'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Plus size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {formData.name || 'Event Name'}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {formData.category}
                      </span>
                      <span>{formData.date || 'Date'}</span>
                      <span>{formData.time || 'Time'}</span>
                      <span className="font-semibold text-green-600">
                        ${formData.ticketPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {formData.venue || 'Venue'} • {formData.location || 'Location'}, {formData.city || 'City'}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {formData.description || 'Event description will appear here...'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex justify-end space-x-4 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                className={`flex items-center space-x-2 px-6 py-3 font-semibold rounded-xl shadow-lg transition-all ${
                  isFormValid 
                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-xl' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={18} />
                <span>Create Event</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddEventPage;