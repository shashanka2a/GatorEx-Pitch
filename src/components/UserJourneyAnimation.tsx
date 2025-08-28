'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Search, MessageCircle, MapPin, Star } from 'lucide-react';

export const UserJourneyAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Sign Up with UF Email',
      description: 'Instant verification & account creation',
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      visual: <EmailVerificationVisual />
    },
    {
      id: 2,
      title: 'Browse or List Items',
      description: 'Easy navigation by category',
      icon: Search,
      color: 'from-green-500 to-green-600',
      visual: <BrowseItemsVisual />
    },
    {
      id: 3,
      title: 'Connect & Negotiate',
      description: 'Secure in-app messaging',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
      visual: <MessagingVisual />
    },
    {
      id: 4,
      title: 'Meet & Transact',
      description: 'Safe campus locations',
      icon: MapPin,
      color: 'from-orange-500 to-orange-600',
      visual: <MeetupVisual />
    },
    {
      id: 5,
      title: 'Rate & Review',
      description: 'Build community trust',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      visual: <ReviewVisual />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full max-h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 relative overflow-hidden">
      <h3 className="text-base font-semibold text-gray-800 mb-4 text-center">User Journey</h3>
      
      {/* Step indicators */}
      <div className="flex justify-center space-x-2 mb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                index === currentStep 
                  ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-110` 
                  : 'bg-white text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setCurrentStep(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-3 h-3" />
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
        <motion.div
          className="bg-gradient-to-r from-[#FA4616] to-[#0021A5] h-1.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Current step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-1">
            {steps[currentStep].title}
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            {steps[currentStep].description}
          </p>
          
          {/* Visual representation */}
          <div className="flex justify-center">
            {steps[currentStep].visual}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Individual step visuals
const EmailVerificationVisual: React.FC = () => (
  <motion.div 
    className="flex items-center space-x-2"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-10 h-8 bg-white border border-blue-300 rounded flex items-center justify-center">
      <Mail className="w-3 h-3 text-blue-500" />
    </div>
    <motion.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-green-500 text-sm"
    >
      ✓
    </motion.div>
    <div className="w-10 h-8 bg-green-50 border border-green-300 rounded flex items-center justify-center">
      <User className="w-3 h-3 text-green-500" />
    </div>
  </motion.div>
);

const BrowseItemsVisual: React.FC = () => (
  <motion.div 
    className="grid grid-cols-2 gap-1"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {['📚', '💻', '🪑', '📱'].map((emoji, index) => (
      <motion.div
        key={index}
        className="w-8 h-8 bg-white rounded border border-green-300 flex items-center justify-center text-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        {emoji}
      </motion.div>
    ))}
  </motion.div>
);

const MessagingVisual: React.FC = () => (
  <motion.div 
    className="space-y-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {[
      { text: "Hi! Is this available?", sender: "buyer", delay: 0 },
      { text: "Yes! Interested?", sender: "seller", delay: 0.5 },
      { text: "Meet at library?", sender: "buyer", delay: 1 }
    ].map((message, index) => (
      <motion.div
        key={index}
        className={`p-1.5 rounded text-xs max-w-24 ${
          message.sender === 'buyer' 
            ? 'bg-purple-100 border-purple-300 ml-2' 
            : 'bg-gray-100 border-gray-300 mr-2'
        } border`}
        initial={{ x: message.sender === 'buyer' ? 20 : -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: message.delay, duration: 0.3 }}
      >
        {message.text}
      </motion.div>
    ))}
  </motion.div>
);

const MeetupVisual: React.FC = () => (
  <motion.div 
    className="relative w-16 h-12 bg-orange-100 border border-orange-300 rounded flex items-center justify-center"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <MapPin className="w-4 h-4 text-orange-500" />
    <motion.div
      className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <span className="text-white text-xs">✓</span>
    </motion.div>
  </motion.div>
);

const ReviewVisual: React.FC = () => (
  <motion.div 
    className="flex items-center space-x-0.5"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.div
        key={star}
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: star * 0.1, duration: 0.3 }}
      >
        <Star className="w-3 h-3 text-yellow-400 fill-current" />
      </motion.div>
    ))}
  </motion.div>
);