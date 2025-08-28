'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, TrendingUp, Smartphone, Star, Shield, Search, MessageCircle, MapPin } from 'lucide-react';

// Animated marketplace visualization
export const MarketplaceAnimation: React.FC = () => {
  const items = [
    { icon: '📚', name: 'Textbooks', x: 20, y: 30, delay: 0 },
    { icon: '💻', name: 'Laptop', x: 70, y: 20, delay: 0.2 },
    { icon: '🪑', name: 'Chair', x: 40, y: 60, delay: 0.4 },
    { icon: '📱', name: 'Phone', x: 80, y: 70, delay: 0.6 },
    { icon: '🎒', name: 'Backpack', x: 15, y: 80, delay: 0.8 },
  ];

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FA4616" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating items */}
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center text-xl"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1
          }}
          transition={{ 
            delay: item.delay,
            duration: 0.4
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Central UF logo area */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#0021A5]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="text-center">
          <div className="text-[#0021A5] font-black text-xl leading-none">UF</div>
          <div className="text-[#FA4616] font-bold text-xs leading-none">Gators</div>
        </div>
      </motion.div>


    </div>
  );
};

// App interface mockup animation
export const AppMockupAnimation: React.FC = () => {
  const screens = [
    { title: 'Browse', color: 'from-blue-500 to-blue-600' },
    { title: 'Chat', color: 'from-green-500 to-green-600' },
    { title: 'Profile', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="relative w-full h-80 flex items-center justify-center">
      {/* Phone frame */}
      <motion.div
        className="relative w-48 h-80 bg-gray-800 rounded-3xl p-2 shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
          {/* Status bar */}
          <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-xs">
            <span>9:41</span>
            <span>100%</span>
          </div>

          {/* App header */}
          <motion.div
            className="h-16 bg-gradient-to-r from-[#FA4616] to-[#0021A5] flex items-center justify-center"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-white font-bold text-lg">GatorEx</span>
          </motion.div>

          {/* Content area with animated screens */}
          <div className="flex-1 relative">
            {screens.map((screen, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 bg-gradient-to-br ${screen.color} flex items-center justify-center`}
                initial={{ x: '100%' }}
                animate={{ x: index === 0 ? '0%' : '100%' }}
                transition={{ 
                  delay: 1 + index * 2,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-4">{screen.title}</h3>
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="w-32 h-8 bg-white/30 rounded"></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom navigation */}
          <motion.div
            className="h-16 bg-gray-50 flex items-center justify-around"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[Search, MessageCircle, ShoppingBag, Users].map((Icon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6 text-gray-600" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating feature icons */}
      {[Shield, Star, TrendingUp, MapPin].map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute w-12 h-12 bg-[#FA4616] rounded-full flex items-center justify-center shadow-lg"
          style={{
            top: `${20 + index * 20}%`,
            [index % 2 === 0 ? 'left' : 'right']: '10%',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [0, 360]
          }}
          transition={{ 
            delay: 1.5 + index * 0.3,
            duration: 0.6,
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      ))}
    </div>
  );
};

// Growth chart animation
export const GrowthChartAnimation: React.FC = () => {
  const data = [
    { month: 'Sep 25', users: 100, revenue: 500 },
    { month: 'Oct 25', users: 500, revenue: 2500 },
    { month: 'Nov 25', users: 1200, revenue: 6000 },
    { month: 'Dec 25', users: 2500, revenue: 12500 },
  ];

  return (
    <div className="w-full max-h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
      <h3 className="text-base font-bold text-gray-800 mb-3">Growth Trajectory</h3>
      
      {/* Chart container */}
      <div className="relative h-32 flex items-end justify-between space-x-2">
        {data.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {/* Bar */}
            <motion.div
              className="w-full bg-gradient-to-t from-[#FA4616] to-[#0021A5] rounded-t-lg relative"
              initial={{ height: 0 }}
              animate={{ height: `${(point.users / 2500) * 100}%` }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
            >
              {/* Value label */}
              <motion.div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-1 py-0.5 rounded shadow text-xs font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
              >
                {point.users}
              </motion.div>
            </motion.div>
            
            {/* Month label */}
            <div className="mt-1 text-xs font-medium text-gray-600">
              {point.month}
            </div>
          </div>
        ))}
      </div>

      {/* Growth indicators */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <motion.div
          className="bg-white p-2 rounded-lg text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="text-lg font-bold text-green-600">↗ 25x</div>
          <div className="text-xs text-gray-600">User Growth</div>
        </motion.div>
        <motion.div
          className="bg-white p-2 rounded-lg text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          <div className="text-lg font-bold text-blue-600">↗ $12.5K</div>
          <div className="text-xs text-gray-600">Monthly GMV</div>
        </motion.div>
      </div>
    </div>
  );
};

// Team collaboration animation
export const TeamAnimation: React.FC = () => {
  const teamMembers = [
    { name: 'Alex', color: 'bg-blue-500', role: 'CEO' },
    { name: 'Sarah', color: 'bg-orange-500', role: 'CTO' },
    { name: 'Mike', color: 'bg-green-500', role: 'Product' },
    { name: 'Lisa', color: 'bg-purple-500', role: 'Marketing' },
  ];

  return (
    <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="teamGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="2" fill="#0021A5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#teamGrid)" />
        </svg>
      </div>

      {/* Central collaboration hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-[#FA4616] to-[#0021A5] rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1 }}
      >
        <Smartphone className="w-8 h-8 text-white" />
      </motion.div>

      {/* Team members positioned around the hub */}
      {teamMembers.map((member, index) => {
        const angle = (index * 90) - 45; // Position around circle
        const radius = 80;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
          >
            <div className={`w-12 h-12 ${member.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
              {member.name[0]}
            </div>
            <div className="text-xs text-center mt-1 font-medium">{member.role}</div>
            
            {/* Connection line to center */}
            <svg 
              className="absolute top-6 left-6 w-1 h-1 pointer-events-none"
              style={{
                width: `${Math.abs(x)}px`,
                height: `${Math.abs(y)}px`,
                transform: `translate(${x < 0 ? x : 0}px, ${y < 0 ? y : 0}px)`
              }}
            >
              <motion.line
                x1={x < 0 ? Math.abs(x) : 0}
                y1={y < 0 ? Math.abs(y) : 0}
                x2={x < 0 ? 0 : x}
                y2={y < 0 ? 0 : y}
                stroke="#FA4616"
                strokeWidth="2"
                strokeDasharray="3,3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
              />
            </svg>
          </motion.div>
        );
      })}

      {/* Floating ideas/features */}
      {['💡', '🚀', '⭐', '🔥'].map((icon, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
          style={{
            left: `${20 + index * 15}%`,
            top: `${10 + (index % 2) * 70}%`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5
          }}
        >
          <span className="text-sm">{icon}</span>
        </motion.div>
      ))}
    </div>
  );
};