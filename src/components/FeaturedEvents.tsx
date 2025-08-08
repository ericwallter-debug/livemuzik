import React from 'react';
import EventCard from './EventCard';
import EventModal from './EventModal';

const FeaturedEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const events = [
    {
      title: "Monsoon Extravaganza",
      description: "Experience the magic of monsoon with live music! A spectacular outdoor festival featuring the best indie and electronic artists.",
      location: "Mumbai",
      venue: "Bandstand",
      date: "17 Aug, 2025",
      category: "Festival",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 5200
    },
    {
      title: "Monsoon Extravaganza",
      description: "Experience the magic of monsoon with live music! Dance under the stars at this beachside celebration of sound and rhythm.",
      location: "Goa",
      venue: "Charu Beach",
      date: "19 Aug, 2025",
      category: "Festival",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 8500
    },
    {
      title: "Monsoon Extravaganza",
      description: "Experience the magic of monsoon with live music! The biggest celebration of the season with international headliners.",
      location: "Delhi",
      venue: "The Stadium",
      date: "21 Aug, 2025",
      category: "Festival",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 15000
    },
    {
      title: "Jazz Under Stars",
      description: "An intimate evening of soulful jazz music in a cozy outdoor setting. Perfect for music connoisseurs.",
      location: "Bangalore",
      venue: "Cubbon Park",
      date: "25 Aug, 2025",
      category: "Concert",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 800
    },
    {
      title: "Electronic Nights",
      description: "Get ready for an electrifying night of the best electronic music with top DJs from around the world.",
      location: "Pune",
      venue: "Phoenix Marketcity",
      date: "28 Aug, 2025",
      category: "Electronic",
      image: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 12000
    },
    {
      title: "Acoustic Sessions",
      description: "Stripped-down, raw performances by emerging artists. Experience music in its purest form.",
      location: "Chennai",
      venue: "The Music Room",
      date: "30 Aug, 2025",
      category: "Acoustic",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      attendees: 300
    }
  ];

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Featured
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ml-3">
              Events
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these incredible live music experiences happening near you
          </p>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard 
              key={index} 
              {...event} 
              onViewDetails={() => handleViewDetails(event)}
            />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <span>View All Events</span>
          </button>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
        />
      )}
    </section>
  );
};

export default FeaturedEvents;