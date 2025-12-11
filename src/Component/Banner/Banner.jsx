import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Globe, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-br from-[#FEE685]/20 via-white to-[#FEE685]/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#FEE685]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-[#FEE685]/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-[#FEE685]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-[#FEE685] to-[#ffd93d] rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              <span className="text-xs sm:text-sm font-bold text-black">Empower Your Journey</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight"
            >
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-[#FEE685] to-[#ffd93d] bg-clip-text text-transparent">
                Future with
              </span>
              <span className="block">Global Scholarships</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl"
            >
              Discover <span className="font-bold text-black">500+ scholarship opportunities</span> from top universities worldwide. Your dream of studying abroad is just one application away.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start"
            >
              <Button
                onClick={() => navigate('/all-scholarship')}
                size="lg"
                className="bg-gradient-to-r from-[#FEE685] to-[#ffd93d] text-black hover:from-[#ffd93d] hover:to-[#FEE685] font-bold px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group w-full sm:w-auto"
              >
                Explore Scholarships
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/about-us')}
                variant="outline"
                size="lg"
                className="px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base border-2 border-gray-300 hover:border-[#FEE685] hover:bg-[#FEE685]/10 font-semibold transition-all w-full sm:w-auto"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Images - Organized Grid Layout - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full mt-8 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto" style={{ gridTemplateRows: 'auto auto' }}>
              {/* Main Large Image - Spans 2 columns */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="col-span-2 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white group"
              >
                <img
                  src="/images/1.webp"
                  alt="Students learning"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                {/* Badge on Main Image */}
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg border-2 border-[#FEE685]">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold text-black">Top Rated</div>
                      <div className="text-[8px] sm:text-[10px] text-gray-600">Universities</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Small Image 1 - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden rounded-lg sm:rounded-xl shadow-xl border-2 border-white group"
              >
                <img
                  src="/images/2.webp"
                  alt="University campus"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FEE685]/30 to-transparent" />
              </motion.div>

              {/* Small Image 2 - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden rounded-lg sm:rounded-xl shadow-xl border-2 border-white group"
              >
                <img
                  src="https://i.postimg.cc/GtxNb3tZ/b5.jpg"
                  alt="Education success"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[#FEE685]/30 to-transparent" />
                {/* Badge on Small Image */}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg p-1.5 sm:p-2 shadow-lg border-2 border-[#FEE685]">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-lg flex items-center justify-center">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-black leading-tight">50+</div>
                      <div className="text-[7px] sm:text-[8px] text-gray-600 leading-tight">Countries</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Banner;
