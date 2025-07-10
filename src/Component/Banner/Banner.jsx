import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerData = [
  {
    title: "Manage Scholars Effortlessly",
    subtitle: "Streamline student data, progress, and performance.",
    image: "https://i.postimg.cc/qBWgKkm8/b1.webp"
  },
  {
    title: "Track Academic Progress",
    subtitle: "Monitor grades, attendance, and reports in one place.",
    image: "https://i.postimg.cc/Yqcq9d9R/b6.webp"
  },
  {
    title: "Empower Educators & Students",
    subtitle: "Give tools that boost teaching and learning efficiency.",
    image: "https://i.postimg.cc/GtxNb3tZ/b5.jpg"
  },
  {
    title: "Empower Educators & Students",
    subtitle: "Give tools that boost teaching and learning efficiency.",
    image: "https://i.postimg.cc/66bnmJM3/b7.webp"
  },
  {
    title: "Empower Educators & Students",
    subtitle: "Give tools that boost teaching and learning efficiency.",
    image: "https://i.postimg.cc/4yY7gyW3/b4.jpg"
  }
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container mx-auto w-full h-[90vh] overflow-hidden ">
      <Slider {...settings}>
        {bannerData.map((slide, idx) => (
          <div key={idx} className="relative w-full h-[70vh] flex items-center justify-center">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-75"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute text-center px-4 md:px-8 text-white"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-2xl">{slide.subtitle}</p>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
