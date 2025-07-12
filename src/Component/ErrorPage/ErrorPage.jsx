import React from 'react';
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
   
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full"
      >
   
        <motion.div
          className="flex justify-center mb-6 text-yellow-500"
          initial={{ y: -10 }}
          animate={{
            y: [ -10, 10, -10 ],      
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <AlertTriangle size={48} />
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">
          We can't seem to find the page you're looking for.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
