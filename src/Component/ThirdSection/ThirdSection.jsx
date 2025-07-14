import React from 'react';

const ThirdSection = () => {
  return (
    <section className="px-4 bg-gray-50">
      <div className="container mx-auto text-center md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Explore Our Scholarship Advantages
        </h2>
        <p className="text-gray-600 mb-10 text-base md:text-lg ">
        Discover the unique features and benefits of our scholarship programs that support your academic and career goals.
        </p>

        <div className="flex gap-6 justify-center">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://i.postimg.cc/zXPjnJNd/t1.avif"
              alt="University Feature 1"
              className="w-[250] h-[250px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://i.postimg.cc/HkqF90mP/t2.jpg"
              alt="University Feature 2"
              className="w-[650px] h-[250px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
