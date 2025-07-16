import React from 'react';

const Contact = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
       
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            Contact <span className="text-primary-600">Us</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or need help? Reach out and our team will get back to you shortly.
          </p>
        </div>

        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <form className="grid gap-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>

           
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Your Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              ></textarea>
            </div>

          
            <div className="text-center">
              <button
                type="submit"
                className="bg-amber-300 hover:bg-amber-400 text-black cursor-pointer py-2 px-6 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        
        <div className="text-center mt-12 text-gray-900 dark:text-gray-400">
          <p>Email us at: <a href="mailto:support@scholarcore.com" className="text-primary-600 hover:underline">support@scholarcore.com</a></p>
          <p>Phone: <span className="text-gray-900 dark:text-gray-200">+880 1234-567890</span></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
