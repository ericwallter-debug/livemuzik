import React from 'react';
import { Calendar, MapPin, Tag, Users } from 'lucide-react';

interface EventCardProps {
  title: string;
  description: string;
  location: string;
  venue: string;
  date: string;
  category: string;
  image: string;
  attendees?: number;
  onViewDetails: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  location,
  venue,
  date,
  category,
  image,
  attendees,
  onViewDetails
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        </div>
        {attendees && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 text-white">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{attendees.toLocaleString()} going</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Event details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-500">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">
              <span className="font-medium text-gray-700">{location}</span> • {venue}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">{date}</span>
          </div>
        </div>

        {/* Action button */}
        <button 
          onClick={onViewDetails}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;