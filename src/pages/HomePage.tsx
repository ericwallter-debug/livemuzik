import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { eventsData } from '../data/events';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <section id="events" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Upcoming Events
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid gap-8 max-w-2xl mx-auto">
            {eventsData.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Fancy Footer */}
      <footer className="relative py-16 px-6 overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-100/30 via-transparent to-transparent" />
        
        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-8 left-1/4 w-2 h-2 rounded-full bg-purple-300/40"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-12 right-1/3 w-1 h-1 rounded-full bg-purple-400/50"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h3
            className="text-4xl md:text-6xl relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: 500,
              background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 25%, #C084FC 50%, #DDD6FE 75%, transparent 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 10px rgba(139, 92, 246, 0.15)"
            }}
          >
            The LiveMuzik Project
            
            {/* Glowing effect overlay */}
            <motion.div
              className="absolute inset-0 blur-sm opacity-40"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 500,
                background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 25%, #C084FC 50%, #DDD6FE 75%, transparent 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              The LiveMuzik Project
            </motion.div>
          </motion.h3>

          {/* Subtle decorative line */}
          <motion.div
            className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </div>
      </footer>
    </motion.div>
  );
};

export default HomePage;
