import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Calendar, Clock, MapPin, Tag, FileText, Building } from 'lucide-react';
import { eventsData } from '../data/events';

const EventEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const originalEvent = eventsData.find(e => e.id === id);

  if (!originalEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Initialize form state with original event data
  const [formData, setFormData] = useState({
    name: originalEvent.name,
    date: originalEvent.date,
    time: originalEvent.time,
    location: originalEvent.location,
    city: originalEvent.city,
    venue: originalEvent.venue,
    category: originalEvent.category,
    description: originalEvent.description,
    image: originalEvent.image
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Demo save - just show success message
    alert('Changes saved successfully! (Demo mode - changes are not persisted)');
    setHasChanges(false);
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmDiscard = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirmDiscard) return;
    }
    navigate('/');
  };

  const categories = ['Rock', 'Jazz', 'Indie', 'Electronic', 'Acoustic', 'Pop', 'Classical', 'Hip-Hop'];

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
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save size={18} />
              <span>Save Changes</span>
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
              <FileText className="text-purple-600" size={32} />
              <span>Edit Event</span>
            </motion.h1>
            <p className="text-gray-600 mt-2">Modify event details below. Changes are for demo purposes only.</p>
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
                    <Tag size={16} className="text-purple-600" />
                    <span>Event Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter event name"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Tag size={16} className="text-purple-600" />
                    <span>Category</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                      <Calendar size={16} className="text-purple-600" />
                      <span>Date</span>
                    </label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="e.g., April 25, 2024"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <Clock size={16} className="text-purple-600" />
                      <span>Time</span>
                    </label>
                    <input
                      type="text"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="e.g., 9:00 PM"
                    />
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <Building size={16} className="text-purple-600" />
                    <span>Venue</span>
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter venue name"
                  />
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
                      <MapPin size={16} className="text-purple-600" />
                      <span>Location</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="e.g., Downtown District"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="text-purple-600" />
                      <span>City</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="e.g., Los Angeles, CA"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <span>Image URL</span>
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={16} className="text-purple-600" />
                    <span>Description</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter event description..."
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
              <h3 className="text-xl font-bold text-gray-800 mb-4">Preview</h3>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{formData.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {formData.category}
                      </span>
                      <span>{formData.date}</span>
                      <span>{formData.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{formData.venue} • {formData.location}, {formData.city}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{formData.description}</p>
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
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventEditPage;
