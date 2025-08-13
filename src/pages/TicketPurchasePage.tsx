import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User, Mail, Phone, MapPin, Ticket, Check, Star, Coffee, Car, Wifi } from 'lucide-react';
import { eventsData } from '../data/events';

interface TicketCategory {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
}

interface PurchaseForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  selectedCategory: string;
  quantity: number;
}

const TicketPurchasePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = eventsData.find(e => e.id === id);

  const [formData, setFormData] = useState<PurchaseForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    selectedCategory: 'general',
    quantity: 1
  });

  const ticketCategories: TicketCategory[] = [
    {
      id: 'general',
      name: 'General Admission',
      price: 45,
      description: 'Standard entry with great views',
      features: ['General standing area', 'Access to main bar', 'Standard restrooms', 'Merchandise booth access'],
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 85,
      description: 'Enhanced experience with better positioning',
      features: ['Priority standing area', 'Express bar service', 'Premium restrooms', 'Complimentary coat check', 'Fast-track entry'],
      color: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: 150,
      description: 'Ultimate luxury experience',
      features: ['VIP lounge access', 'Complimentary drinks', 'Meet & greet opportunity', 'Exclusive merchandise', 'Valet parking', 'Private restrooms', 'Gourmet catering'],
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  if (!event) {
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

  const handleInputChange = (field: keyof PurchaseForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const selectedTicket = ticketCategories.find(cat => cat.id === formData.selectedCategory);
  const totalPrice = selectedTicket ? selectedTicket.price * formData.quantity : 0;

  const handlePurchase = () => {
    // Demo purchase - just show success message
    alert(`Demo Purchase Successful!\n\nEvent: ${event.name}\nTickets: ${formData.quantity}x ${selectedTicket?.name}\nTotal: $${totalPrice}\n\nThank you, ${formData.name}!`);
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('bar') || feature.toLowerCase().includes('drink')) return Coffee;
    if (feature.toLowerCase().includes('parking') || feature.toLowerCase().includes('valet')) return Car;
    if (feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('internet')) return Wifi;
    if (feature.toLowerCase().includes('vip') || feature.toLowerCase().includes('lounge')) return Star;
    return Check;
  };

  return (
    <motion.div
      className="min-h-screen py-8 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate(`/event/${event.id}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 group"
          >
            <ArrowLeft size={20} className="group-hover:text-purple-600 transition-colors" />
            <span className="font-medium">Back to Event</span>
          </button>

          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">{event.name}</h1>
            <p className="text-gray-600">{event.date} • {event.time}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ticket Categories */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <Ticket className="text-purple-600" size={32} />
                <span>Select Your Tickets</span>
              </h2>

              <div className="space-y-6">
                {ticketCategories.map((category, index) => {
                  const IconComponent = getFeatureIcon(category.features[0]);
                  
                  return (
                    <motion.div
                      key={category.id}
                      className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        formData.selectedCategory === category.id
                          ? 'border-purple-500 bg-purple-50/50 shadow-lg'
                          : 'border-gray-200 bg-white/50 hover:border-purple-300 hover:shadow-md'
                      }`}
                      onClick={() => handleInputChange('selectedCategory', category.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {category.popular && (
                        <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full">
                          Most Popular
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                            <IconComponent className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                            <p className="text-gray-600">{category.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">${category.price}</div>
                          <div className="text-sm text-gray-500">per ticket</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-2">
                        {category.features.map((feature, featureIndex) => {
                          const FeatureIcon = getFeatureIcon(feature);
                          return (
                            <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                              <FeatureIcon size={14} className="text-purple-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          );
                        })}
                      </div>

                      {formData.selectedCategory === category.id && (
                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="text-white" size={16} />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Quantity Selector */}
              <div className="mt-8 p-6 bg-gray-50/50 rounded-2xl">
                <label className="block text-lg font-semibold text-gray-800 mb-3">Number of Tickets</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
                    className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-purple-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{formData.quantity}</span>
                  <button
                    onClick={() => handleInputChange('quantity', Math.min(10, formData.quantity + 1))}
                    className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-purple-300 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-gray-600 ml-4">(Maximum 10 tickets per purchase)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Purchase Form */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Order Summary */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Type:</span>
                  <span className="font-semibold">{selectedTicket?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{formData.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per ticket:</span>
                  <span className="font-semibold">${selectedTicket?.price}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <User className="text-purple-600" size={24} />
                <span>Your Information</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-4 text-gray-400" size={18} />
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handlePurchase}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                disabled={!formData.name || !formData.email || !formData.phone}
              >
                <CreditCard size={20} />
                <span>Purchase Tickets - ${totalPrice}</span>
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Demo mode - No actual payment will be processed
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketPurchasePage;
