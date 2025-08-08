import React from 'react';
import { X, Calendar, MapPin, Users, Tag, Clock, DollarSign } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    description: string;
    location: string;
    venue: string;
    date: string;
    category: string;
    image: string;
    attendees?: number;
  };
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {event.category}
            </span>
          </div>
          {event.attendees && (
            <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{event.attendees.toLocaleString()} going</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {event.description}
          </p>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-900">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold text-gray-900">8:00 PM - 2:00 AM</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-900">{event.location}</p>
                <p className="text-sm text-gray-600">{event.venue}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold text-gray-900">₹1,500 - ₹5,000</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">What to Expect</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Live performances by top artists</li>
              <li>• Food and beverage stalls</li>
              <li>• Merchandise booths</li>
              <li>• Photo opportunities</li>
              <li>• Safe and secure environment</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Get Tickets
            </button>
            <button className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;