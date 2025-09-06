import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, LogIn } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Sign in', path: '/signin', icon: LogIn },
  ];

  return (
    <motion.nav
      className="relative z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-white/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to="/">
        <motion.div
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ShowGoEW1
        </motion.div>
      </Link>

      <div className="flex items-center space-x-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.name} to={item.path}>
              <motion.div
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-600 rounded-full"
                    layoutId="activeIndicator"
                    style={{ x: '-50%' }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;