import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';

import { Event } from '../lib/supabase';

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'rock':
        return 'from-orange-500 to-red-500';
      case 'jazz':
        return 'from-blue-600 to-indigo-600';
      case 'indie':
        return 'from-purple-600 to-pink-600';
      case 'electronic':
        return 'from-cyan-500 to-blue-500';
      default:
        return 'from-purple-600 to-pink-600';
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/event/${event.id}`)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(event.category)}/60 to-transparent opacity-80`} />
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          >
            {event.category}
          </motion.div>
        </div>

        <div className="p-6">
          <motion.h3
            className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          >
            {event.name}
          </motion.h3>

          <div className="space-y-2 text-gray-600">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
            >
              <Calendar size={16} className="text-purple-500" />
              <span className="font-medium">{event.date}</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
            >
              <Clock size={16} className="text-purple-500" />
              <span>{event.time}</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
            >
              <MapPin size={16} className="text-purple-500" />
              <span>{event.city}</span>
            </motion.div>
          </div>

          <motion.div
            className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="h-px bg-gradient-to-r from-purple-200 to-pink-200 mb-3" />
            <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;