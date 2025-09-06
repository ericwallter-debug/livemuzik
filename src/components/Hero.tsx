import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-8 h-8 rotate-45 bg-gradient-to-br from-yellow-400 to-yellow-300"
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-32 right-16 w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="block bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400 bg-clip-text text-transparent relative">
            Live
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-60"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Live
            </motion.div>
          </span>
          <span className="block bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400 bg-clip-text text-transparent relative mt-2">
            Music!
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-60"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              Music!
            </motion.div>
          </span>
        </motion.h1>

        <motion.button
          onClick={() => navigate('/#events')}
          className="relative px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-lg font-semibold rounded-full shadow-lg overflow-hidden group"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="relative z-10">Join the music</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            style={{ width: '50%' }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;