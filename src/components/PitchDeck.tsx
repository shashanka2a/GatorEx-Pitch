'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe, Instagram, Mail, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MarketplaceAnimation, AppMockupAnimation, GrowthChartAnimation, TeamAnimation } from './DynamicVisuals';
import { UserJourneyAnimation } from './UserJourneyAnimation';

interface Slide {
  id: number;
  title: string;
  component: React.ReactNode;
}

const PitchDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    { id: 0, title: "Welcome", component: <IntroSlide /> },
    { id: 1, title: "Problem", component: <ProblemSlide /> },
    { id: 2, title: "Solution", component: <SolutionSlide /> },
    { id: 3, title: "Market", component: <MarketSlide /> },
    { id: 4, title: "Product Demo", component: <ProductDemoSlide /> },
    { id: 5, title: "Traction", component: <TractionSlide /> },
    { id: 6, title: "Business Model", component: <BusinessModelSlide /> },
    { id: 7, title: "Go-to-Market", component: <GTMSlide /> },
    { id: 8, title: "Competition", component: <CompetitionSlide /> },
    { id: 9, title: "Team", component: <TeamSlide /> },
    { id: 10, title: "Ask", component: <AskSlide /> },
    { id: 11, title: "Thank You", component: <ThankYouSlide /> },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(slides.length - 1);
          break;
        default:
          // Check for number keys (1-9, 0)
          const slideNumber = parseInt(event.key);
          if (!isNaN(slideNumber) && slideNumber >= 1 && slideNumber <= slides.length) {
            event.preventDefault();
            goToSlide(slideNumber - 1);
          }
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [slides.length]); // Dependencies

  return (
    <div className="h-screen bg-gradient-to-br from-[#0021A5] via-[#4A5FBF] to-[#FA4616] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRoNHYyaC00YzAgMC0yIDItMiAydjJoLTJjMC0yIDAtMiAwLTJ6bTAtNGMwLTIgMi00IDQtNGg0djJoLTRjMCAwLTIgMi0yIDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.svg" 
              alt="GatorEx Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-white text-2xl font-bold">GatorEx</h1>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              UF Student Marketplace
            </Badge>
          </div>
          {currentSlide > 0 && currentSlide < slides.length - 1 && (
            <div className="text-white/80 font-medium">
              {currentSlide} / {slides.length - 2}
            </div>
          )}
        </div>

        {/* Slide Content */}
        <div className="flex-1 px-6 pb-6 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full max-h-full overflow-hidden"
            >
              {slides[currentSlide].component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="p-6 flex items-center justify-between shrink-0">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-white scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <div className="text-white/60 text-xs flex items-center space-x-2">
              <span>Use</span>
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">←</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">→</kbd>
              <span>or</span>
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">Space</kbd>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Slide Components
const IntroSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-8 flex flex-col justify-center items-center text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="space-y-8"
    >
      {/* Logo and title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          <img 
            src="/logo.svg" 
            alt="GatorEx Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        <h1 className="text-6xl font-bold uf-gradient-text mb-4">GatorEx</h1>
        <p className="text-2xl text-gray-600 font-medium">The Future of Student Commerce</p>
      </motion.div>

      {/* Tagline */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-4"
      >
        <p className="text-lg text-gray-700 max-w-2xl">
          Connecting University of Florida students through a secure, verified marketplace 
          designed exclusively for the Gator community.
        </p>
        <p className="text-sm text-gray-500 mt-4 italic">
          *Currently branded GatorEx at UF pilot, transitioning to CampusEx for expansion
        </p>
        <div className="flex items-center justify-center space-x-6">
          <Badge className="bg-[#FA4616] text-white px-4 py-2 text-sm">
            🐊 UF Verified
          </Badge>
          <Badge className="bg-[#0021A5] text-white px-4 py-2 text-sm">
            🔒 Safe & Secure
          </Badge>
          <Badge className="bg-gradient-to-r from-[#FA4616] to-[#0021A5] text-white px-4 py-2 text-sm">
            📱 Mobile First
          </Badge>
        </div>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FA4616] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  </Card>
);

const ProblemSlide: React.FC = () => (
  <Card className="h-full bg-white border-0 shadow-2xl p-8 flex flex-col">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-5xl font-black text-gray-900 mb-8">The Problem</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-400">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">📚</div>
              <h3 className="text-xl font-semibold text-red-800">Limited Marketplace Options</h3>
            </div>
            <p className="text-red-700">Students struggle to find affordable textbooks, furniture, and essentials within their university community.</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-400">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">🔒</div>
              <h3 className="text-xl font-semibold text-orange-800">Trust & Safety Concerns</h3>
            </div>
            <p className="text-orange-700">70% of UF students rely on Facebook groups, but 60% cite safety/trust issues with unverified sellers.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">😞</div>
              <h3 className="text-xl font-semibold text-yellow-800">Poor User Experience</h3>
            </div>
            <p className="text-yellow-700">Current solutions are fragmented, hard to navigate, and not tailored to student needs.</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Student Survey Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Use Facebook Groups</span>
                <span className="font-bold text-red-600">70%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Safety Concerns</span>
                <span className="font-bold text-orange-600">60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Want UF-Only Platform</span>
                <span className="font-bold text-green-600">85%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  </Card>
);

const SolutionSlide: React.FC = () => (
  <Card className="h-full bg-white border-0 shadow-2xl p-8 flex flex-col">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-5xl font-black text-gray-900 mb-8">Our Solution</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#FA4616] to-[#FF6B47] p-6 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-4">GatorEx</h3>
            <p className="text-lg">A secure, university-verified marketplace exclusively for UF students to buy, sell, and trade items safely within their campus community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">✅ UF.edu Verification</h4>
              <p className="text-sm text-blue-700">Green verified badges for all UF students</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">🔥 Trending System</h4>
              <p className="text-sm text-green-700">Hot deals and popular items highlighted</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">🏠 Sublease Feature</h4>
              <p className="text-sm text-purple-700">Coming Spring 2026 - housing marketplace</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">💰 Price Tracking</h4>
              <p className="text-sm text-orange-700">Original prices and savings displayed</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-64 h-96 bg-gray-800 rounded-3xl p-2 shadow-2xl">
            {/* Phone screen */}
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
              {/* Status bar */}
              <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-xs">
                <span>9:41</span>
                <span>100%</span>
              </div>

              {/* App header with gradient */}
              <div className="h-16 bg-gradient-to-r from-[#FA4616] to-[#0021A5] flex items-center justify-between px-4">
                <span className="text-white font-bold text-lg">GatorEx</span>
                <div className="text-white text-sm">Browse</div>
              </div>

              {/* Stats section */}
              <div className="bg-gradient-to-r from-[#FA4616] to-[#0021A5] px-4 pb-4">
                <div className="grid grid-cols-3 gap-2 text-center text-white">
                  <div>
                    <div className="font-bold">150+</div>
                    <div className="text-xs">Verified Users</div>
                  </div>
                  <div>
                    <div className="font-bold">2500+</div>
                    <div className="text-xs">Total Impressions</div>
                  </div>
                  <div>
                    <div className="font-bold">24H</div>
                    <div className="text-xs">Since Launch</div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="p-3">
                <div className="text-sm font-semibold mb-2">Browse Categories</div>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { icon: '📚', name: 'Books', color: 'bg-blue-100' },
                    { icon: '💻', name: 'Tech', color: 'bg-green-100' },
                    { icon: '🪑', name: 'Dorm', color: 'bg-purple-100' },
                    { icon: '👕', name: 'Style', color: 'bg-pink-100' },
                  ].map((cat, i) => (
                    <div key={i} className={`${cat.color} p-1.5 rounded-lg text-center min-h-[60px] flex flex-col justify-center`}>
                      <div className="text-base mb-1">{cat.icon}</div>
                      <div className="text-xs font-medium leading-tight">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending items */}
              <div className="px-3">
                <div className="text-sm font-semibold mb-2">🔥 Trending Now</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                    <div className="w-8 h-8 bg-orange-200 rounded flex items-center justify-center text-xs">📖</div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">Calculus Textbook</div>
                      <div className="text-xs text-green-600">$85 • ✓ Verified</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                    <div className="w-8 h-8 bg-blue-200 rounded flex items-center justify-center text-xs">📱</div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">iPhone 13 Pro</div>
                      <div className="text-xs text-green-600">$650 • ✓ Verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </Card>
);

const MarketSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-8 flex flex-col">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Market Opportunity</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h3 className="text-3xl font-bold text-blue-800">52,000+</h3>
              <p className="text-blue-700 font-medium">UF Students</p>
              <p className="text-sm text-blue-600 mt-2">Total addressable market on campus</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h3 className="text-3xl font-bold text-green-800">$10M</h3>
              <p className="text-green-700 font-medium">UF Resale Market</p>
              <p className="text-sm text-green-600 mt-2">Total UF student resale market per year</p>
              <p className="text-xs text-green-500 mt-1">*Based on $200/student avg. annual resale spend</p>
            </Card>
          </div>
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <h3 className="text-xl font-semibold text-orange-800 mb-4">Key Market Segments</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-orange-700">📚 Textbooks & Materials</span>
                <span className="font-semibold text-orange-800">$3.5M/year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-700">🪑 Furniture & Dorm Items</span>
                <span className="font-semibold text-orange-800">$3M/year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-700">💻 Electronics & Tech</span>
                <span className="font-semibold text-orange-800">$2.5M/year</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-700">👕 Clothing & Other</span>
                <span className="font-semibold text-orange-800">$1M/year</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Growth Potential</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800">15%</div>
                <div className="text-sm text-purple-600">Annual student population growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800">85%</div>
                <div className="text-sm text-purple-600">Students prefer peer-to-peer buying</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">Expansion</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span>🎯 Phase 1: University of Florida</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>🏠 Phase 2: Sublease Feature (Spring 2026)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>🏫 Phase 3: SEC Universities</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-yellow-700">
                <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                <span>🌍 Phase 4: National Expansion</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  </Card>
);

const ProductDemoSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-6 flex flex-col overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Product Demo</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="space-y-4 flex flex-col">
          <div className="bg-gradient-to-r from-[#0021A5] to-[#1B4DB8] p-6 rounded-xl text-white flex-1">
            <div className="bg-gradient-to-r from-white/20 to-white/10 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-bold text-center mb-2">🔒 UF-Only Verified Marketplace</h4>
              <p className="text-sm text-center text-blue-100">Our unique edge: Students only buy/sell with verified Gators</p>
            </div>
            <h3 className="text-xl font-bold mb-4">Core Features</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="text-lg">🤖</div>
                <span className="text-sm">AI-powered listing creation in under 2 minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-lg">🎯</div>
                <span className="text-sm">Category-based shopping (Books, Furniture, Electronics)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-lg">🔥</div>
                <span className="text-sm">Hot listings and trending items</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-lg">⚡</div>
                <span className="text-sm">Simple buy/sell interface with instant posting</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-lg">✅</div>
                <span className="text-sm">UF student verification and secure transactions</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 text-base">Quick Listing</h4>
              <p className="text-sm text-green-700">Post items in under 2 minutes</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 text-base">Smart Search</h4>
              <p className="text-sm text-blue-700">AI-powered item discovery</p>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <UserJourneyAnimation />
        </div>
      </div>
    </motion.div>
  </Card>
);

const TractionSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-4 flex flex-col overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Early Validation & Projections</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="space-y-3 flex flex-col">
          {/* Current Status */}
          <Card className="p-3 bg-gradient-to-r from-[#0021A5] to-[#1B4DB8] text-white">
            <h3 className="text-base font-semibold mb-2">✅ Current Status</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold">150+</div>
                <div className="text-blue-100">Verified Users</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">2500+</div>
                <div className="text-blue-100">Total Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">24H</div>
                <div className="text-blue-100">Since Launch</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">Live</div>
                <div className="text-blue-100">Beta Platform</div>
              </div>
            </div>
          </Card>

          {/* 6-Month Projections */}
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-2 bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-center">
              <h4 className="text-sm font-bold text-green-800">1,000+</h4>
              <p className="text-green-700 font-medium text-xs">Users (6mo)</p>
              <p className="text-xs text-green-600">20% weekly growth</p>
            </Card>
            <Card className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-center">
              <h4 className="text-sm font-bold text-blue-800">500+</h4>
              <p className="text-blue-700 font-medium text-xs">Items/Month</p>
              <p className="text-xs text-blue-600">2 posts/user avg</p>
            </Card>
            <Card className="p-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-center">
              <h4 className="text-sm font-bold text-purple-800">1,000+</h4>
              <p className="text-purple-700 font-medium text-xs">Transactions</p>
              <p className="text-xs text-purple-600">Projected</p>
            </Card>
            <Card className="p-2 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-center">
              <h4 className="text-sm font-bold text-orange-800">5%</h4>
              <p className="text-orange-700 font-medium text-xs">Market Share</p>
              <p className="text-xs text-orange-600">UF Campus (Year 1)</p>
            </Card>
          </div>

          {/* Roadmap & Milestones */}
          <Card className="p-3 bg-gradient-to-r from-[#FA4616] to-[#FF6B47] text-white">
            <h3 className="text-base font-semibold mb-2">Roadmap & Milestones</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>🎯 MVP Launch</span>
                <span className="font-medium">Sep 2025</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>🎯 1K Users</span>
                <span className="font-medium">Q4 2025</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>🏠 Sublease Feature</span>
                <span className="font-medium">Spring 2026</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>🎯 Revenue Model</span>
                <span className="font-medium">Q3 2026</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <GrowthChartAnimation />
        </div>
      </div>
    </motion.div>
  </Card>
);

const BusinessModelSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-12 flex flex-col">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-5xl font-bold text-gray-900 mb-16 text-center">Business Model Strategy</h2>
      
      {/* 4 Most Relevant Sections in 2x2 Grid */}
      <div className="grid grid-cols-2 gap-12 flex-1">
        
        {/* 1. Current Free Model Strategy */}
        <Card className="p-8 bg-gradient-to-br from-[#0021A5] to-[#1B4DB8] text-white shadow-xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🆓</div>
            <h3 className="text-2xl font-bold">Phase 1: Free Model</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">100% Free Platform</h4>
              <p className="text-blue-100">No fees for buyers or sellers</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Focus on Growth</h4>
              <p className="text-blue-100">Build user base and engagement</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg mb-2">Market Validation</h4>
              <p className="text-blue-100">Prove product-market fit first</p>
            </div>
          </div>
        </Card>

        {/* 2. Future Revenue Streams */}
        <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-green-800">Phase 2: Monetization (2026+)</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xl">📢</span>
                <h4 className="font-semibold text-green-800">Seller Ads & Promotions</h4>
              </div>
              <p className="text-green-700 text-sm">$10-20/post boost, featured listings</p>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xl">🏫</span>
                <h4 className="font-semibold text-green-800">Campus Partnerships</h4>
              </div>
              <p className="text-green-700 text-sm">$2-5K/semester bookstore integrations</p>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-xl">⭐</span>
                <h4 className="font-semibold text-green-800">Premium Features</h4>
              </div>
              <p className="text-green-700 text-sm">$5-10/month analytics, bulk tools</p>
            </div>
          </div>
        </Card>

        {/* 3. Revenue Potential */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-purple-800">Revenue Potential</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-800">$10M</div>
              <div className="text-purple-700 font-medium">UF P2P Market</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-800">~10%</div>
              <div className="text-purple-700 font-medium">Target Market Share</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg">
              <div className="text-3xl font-bold">$500K+</div>
              <div className="font-medium">Revenue Target (2027)</div>
            </div>
          </div>
        </Card>

        {/* 4. Strategic Timeline */}
        <Card className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-4">🗓️</div>
            <h3 className="text-2xl font-bold text-orange-800">Monetization Timeline</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="font-bold text-orange-800">2025-2026: Free Growth</div>
              <div className="text-orange-700 text-sm">Build to 5K+ active users</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="font-bold text-orange-800">Spring 2026: Sublease Launch</div>
              <div className="text-orange-700 text-sm">New revenue opportunity</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="font-bold text-orange-800">2027: Scale Revenue</div>
              <div className="text-orange-700 text-sm">Multiple monetization streams</div>
            </div>
          </div>
        </Card>

      </div>
    </motion.div>
  </Card>
);

const GTMSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-8 flex flex-col">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Go-to-Market Strategy</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-[#FA4616] to-[#FF6B47] text-white">
            <h3 className="text-xl font-bold mb-4">Phase 1: Campus Domination</h3>
            <div className="space-y-3 text-sm">
              <div>🎯 Student organization partnerships</div>
              <div>📱 Social media campaigns</div>
              <div>🎉 Campus events & demos</div>
              <div>📚 Textbook season launches</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Target Segments</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div>• Freshmen (dorm essentials)</div>
              <div>• Seniors (graduation sales)</div>
              <div>• Graduate students</div>
              <div>• International students</div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-[#0021A5] to-[#1B4DB8] text-white">
            <h3 className="text-xl font-bold mb-4">Phase 2: Regional Expansion</h3>
            <div className="space-y-3 text-sm">
              <div>🏫 SEC university rollout</div>
              <div>🤝 University partnerships</div>
              <div>📈 Proven model replication</div>
              <div>💡 Feature optimization</div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Marketing Channels</h3>
            <div className="space-y-2 text-sm text-green-700">
              <div>• Instagram & TikTok ads</div>
              <div>• Campus influencers</div>
              <div>• Student newspaper features</div>
              <div>• Word-of-mouth referrals</div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Launch Timeline</h3>
            <div className="space-y-3 text-sm text-purple-700">
              <div className="flex justify-between">
                <span>Spring 2026</span>
                <span className="font-medium">UF Launch</span>
              </div>
              <div className="flex justify-between">
                <span>Q4 2026</span>
                <span className="font-medium">FSU & UCF</span>
              </div>
              <div className="flex justify-between">
                <span>Q2 2027</span>
                <span className="font-medium">SEC Schools</span>
              </div>
              <div className="flex justify-between">
                <span>Q4 2027</span>
                <span className="font-medium">National</span>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">Success Metrics</h3>
            <div className="space-y-2 text-sm text-yellow-700">
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>10% campus penetration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💰</span>
                <span>50+ daily transactions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭐</span>
                <span>4.5+ app store rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔄</span>
                <span>80% user retention</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  </Card>
);

const CompetitionSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-8 flex flex-col">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Competitive Landscape</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
            <h3 className="text-xl font-semibold text-red-800 mb-4">Current Solutions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 pl-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📘</span>
                  <h4 className="font-semibold text-red-800">Facebook Marketplace</h4>
                </div>
                <p className="text-sm text-red-600">Generic, unsafe, no student verification</p>
              </div>
              <div className="border-l-4 border-red-400 pl-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📋</span>
                  <h4 className="font-semibold text-red-800">Craigslist</h4>
                </div>
                <p className="text-sm text-red-600">Outdated interface, security concerns</p>
              </div>
              <div className="border-l-4 border-red-400 pl-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">📱</span>
                  <h4 className="font-semibold text-red-800">OfferUp</h4>
                </div>
                <p className="text-sm text-red-600">Not campus-focused, poor UX for students</p>
              </div>
              <div className="border-l-4 border-red-400 pl-4">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-lg">🏪</span>
                  <h4 className="font-semibold text-red-800">University Bookstores</h4>
                </div>
                <p className="text-sm text-red-600">Expensive, limited selection</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-[#FA4616] to-[#FF6B47] text-white">
            <h3 className="text-xl font-bold mb-4">Our Competitive Advantages</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-white pl-4">
                <h4 className="font-semibold">🔒 University Verification</h4>
                <p className="text-orange-100">Only verified UF students - our biggest advantage</p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <h4 className="font-semibold">⚡ Speed & Simplicity</h4>
                <p className="text-orange-100">List in &lt;2 min vs. 20+ min on Facebook</p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <h4 className="font-semibold">🎯 Student-Centric Design</h4>
                <p className="text-orange-100">Built specifically for college needs</p>
              </div>
              <div className="border-l-4 border-white pl-4">
                <h4 className="font-semibold">🏫 Campus Integration</h4>
                <p className="text-orange-100">Safe meeting spots, local partnerships</p>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-center">
              <h4 className="text-xl font-bold text-green-800">85%</h4>
              <p className="text-sm text-green-700">Students prefer verified platforms*</p>
              <p className="text-xs text-green-600">*UF student survey, n=50+</p>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-center">
              <h4 className="text-xl font-bold text-blue-800">12x</h4>
              <p className="text-sm text-blue-700">Faster than current solutions</p>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  </Card>
);

const TeamSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-6 flex flex-col overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-5xl font-black text-gray-900 mb-8">Builder & Team</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="space-y-4">
          {/* Main founder card */}
          <Card className="p-4 bg-gradient-to-br from-[#0021A5] to-[#1B4DB8] text-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0021A5] text-xl font-bold">
                SJ
              </div>
              <div>
                <h3 className="text-lg font-bold">Shashank Jagannatham</h3>
                <p className="text-blue-100 text-sm">Product Builder</p>
                <p className="text-xs text-blue-200">Solo Builder Wearing Multiple Hats</p>
              </div>
            </div>
            <p className="text-blue-100 text-xs mb-3">
              UF Student who built the solution after experiencing the problem. Leading product, engineering & business.
            </p>
            <div className="flex space-x-1">
              <a 
                href="https://www.linkedin.com/in/shashank-jagannatham/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Badge className="bg-white/20 text-white border-white/30 text-xs hover:bg-white/30 transition-colors cursor-pointer flex items-center space-x-1">
                  <span>LinkedIn</span>
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 00-1.5 0v3.25H5.75V7.5H9a.75.75 0 000-1.5H4.25zM6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  </svg>
                </Badge>
              </a>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">Full-Stack</Badge>
              <Badge className="bg-white/20 text-white border-white/30 text-xs">Product</Badge>
            </div>
          </Card>

          {/* Multiple hats visualization */}
          <div className="grid grid-cols-2 gap-2">
            <Card className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <div className="text-xl mb-1">💻</div>
              <h4 className="font-semibold text-orange-800 text-xs">Engineering</h4>
              <p className="text-xs text-orange-700">Full-stack development</p>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="text-xl mb-1">📊</div>
              <h4 className="font-semibold text-green-800 text-xs">Product</h4>
              <p className="text-xs text-green-700">UX/UI design</p>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="text-xl mb-1">📈</div>
              <h4 className="font-semibold text-purple-800 text-xs">Business</h4>
              <p className="text-xs text-purple-700">Strategy & validation</p>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="text-xl mb-1">🎯</div>
              <h4 className="font-semibold text-blue-800 text-xs">Marketing</h4>
              <p className="text-xs text-blue-700">Growth & community</p>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          {/* Why solo founder works */}
          <Card className="p-6 bg-gradient-to-r from-[#FA4616] to-[#FF6B47] text-white">
            <h3 className="text-xl font-bold mb-4">Why Solo Builder Works</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Deep understanding of UF student needs</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Rapid iteration and decision making</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>100% equity alignment with success</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Lean operations and cost efficiency</span>
              </div>
            </div>
          </Card>

          {/* Growth plan */}
          <Card className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Team Growth Plan</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>📈 Marketing Manager</span>
                <span className="text-green-600 font-medium">Q3 2026</span>
              </div>
              <div className="flex justify-between">
                <span>🤝 Campus Ambassador</span>
                <span className="text-blue-600 font-medium">Q4 2026</span>
              </div>
              <div className="flex justify-between">
                <span>💼 Business Development</span>
                <span className="text-purple-600 font-medium">Q2 2027</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2 italic">Development handled in-house</p>
          </Card>

          {/* Advisors */}
          <Card className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">Advisory Support</h3>
            <div className="space-y-1 text-xs text-yellow-700">
              <div>• UF Innovation Hub - Startup mentorship</div>
              <div>• Student Government - Campus partnerships</div>
              <div>• Alumni Network - Industry connections</div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  </Card>
);


const AskSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-6 flex flex-col overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Investment Ask</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Left Column - Ask & Use of Funds */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-r from-[#FA4616] to-[#FF6B47] text-white text-center">
            <h3 className="text-5xl font-bold mb-3">$200K</h3>
            <p className="text-xl font-medium">Seed Round</p>
            <p className="text-orange-100 text-base">12-15% equity</p>
          </Card>
          <Card className="p-6 bg-gradient-to-r from-[#0021A5] to-[#1B4DB8] text-white">
            <h3 className="text-xl font-bold mb-4 text-center">Use of Funds</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">50%</span>
                </div>
                <p className="text-sm">Product Development</p>
                <p className="text-xs text-blue-200">$100K</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">30%</span>
                </div>
                <p className="text-sm">Marketing & Growth</p>
                <p className="text-xs text-blue-200">$60K</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">15%</span>
                </div>
                <p className="text-sm">Operations</p>
                <p className="text-xs text-blue-200">$30K</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">5%</span>
                </div>
                <p className="text-sm">Runway</p>
                <p className="text-xs text-blue-200">$10K</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Milestones & Why Invest */}
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Key Milestones (12 months)</h3>
            <div className="space-y-3 text-sm text-green-700">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Scale to 10,000+ UF users</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Launch mobile app (iOS/Android)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Process $500K+ in transactions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Achieve unit economics profitability</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Close Series A round</span>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">Why Invest Now?</h3>
            <div className="space-y-3 text-sm text-purple-700">
              <div>🎯 <strong>Early validation</strong> with 150+ verified users in 24H</div>
              <div>🚀 <strong>Experienced team</strong> with domain expertise</div>
              <div>💰 <strong>Clear monetization</strong> path with strong unit economics</div>
              <div>🏫 <strong>Defensible moat</strong> through university partnerships</div>
              <div>📈 <strong>Massive market opportunity</strong> in student commerce</div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  </Card>
);

const ThankYouSlide: React.FC = () => (
  <Card className="h-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl p-8 flex flex-col justify-center items-center text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="space-y-8"
    >
      {/* Thank you message */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold uf-gradient-text mb-6">Thank You!</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Ready to revolutionize student commerce at the University of Florida and beyond.
        </p>
      </motion.div>

      {/* Contact information */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {/* Website */}
          <Card className="p-6 bg-gradient-to-r from-[#FA4616] to-[#FF6B47] text-white hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Globe className="w-6 h-6" />
              <h3 className="font-semibold">Visit Our Website</h3>
            </div>
            <a 
              href="https://gatorex.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-orange-100 hover:text-white transition-colors"
            >
              <span>gatorex.shop</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Card>

          {/* Instagram */}
          <Card className="p-6 bg-gradient-to-r from-[#0021A5] to-[#1B4DB8] text-white hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <Instagram className="w-6 h-6" />
              <h3 className="font-semibold">Follow Us</h3>
            </div>
            <a 
              href="https://instagram.com/gatorex.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <span>@gatorex.shop</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Card>
        </div>

        {/* Email contact */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <Mail className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-medium">team@gatorex.shop</span>
          </div>
        </Card>

        {/* Call to action */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="space-y-4"
        >
          <p className="text-lg font-semibold text-gray-800">
            Let&apos;s build the future of student commerce together!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-[#FA4616] text-white px-6 py-2">
              🚀 Ready to Scale
            </Badge>
            <Badge className="bg-[#0021A5] text-white px-6 py-2">
              💰 Seeking Investment
            </Badge>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🐊', '🎓', '📚', '💻', '🎯', '⭐'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </Card>
);

export default PitchDeck;