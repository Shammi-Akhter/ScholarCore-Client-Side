import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
       
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            About <span className="text-primary-600">ScholarCore</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering institutions to manage scholarships efficiently and transparently through smart, scalable technology.
          </p>
        </div>

       
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image / Illustration */}
          <div>
            <img
              src="https://i.postimg.cc/t7004vNx/b3.jpg" // Replace with your actual image path
              alt="Scholar Management Illustration"
              className="w-full h-auto"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Who We Are?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              ScholarCore is a comprehensive digital solution designed to streamline the scholarship lifecycle — from application and review to award distribution and monitoring. Built with academic institutions and scholarship providers in mind, our platform eliminates paperwork, reduces manual workload, and increases fairness in selection.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To simplify and digitize scholarship management, making educational funding more accessible and equitable for students around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
