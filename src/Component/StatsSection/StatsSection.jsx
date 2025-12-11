import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Globe, Award, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { icon: GraduationCap, value: '500+', label: 'Scholarships' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Award, value: '10K+', label: 'Students' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' },
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 lg:w-7 lg:h-7 text-black" />
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-black mb-2">{stat.value}</div>
              <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

