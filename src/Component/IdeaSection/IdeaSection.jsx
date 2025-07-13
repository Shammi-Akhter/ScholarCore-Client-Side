import React from 'react';
// import responsiveImage from '../assets/responsive-devices.png'; // make sure to place your image correctly

const IdeaSection = () => {
    return (
        <section className="container mx-auto px-4 lg:mt-30 md:px-12">
            <div className=' text-center '>
                <p className='water-mark lg:text-[110px] text-4xl lg:p-6 p-2 font-bold bg-gradient-to-b from-gray-400 to-gray-200 bg-clip-text text-transparent' >Follow your passion</p>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">

                <div className="lg:w-1/2 text-center lg:text-left px-10 mt-[-50px]">

                    <h3 className="text-3xl md:text-2xl font-bold text-gray-900 z-10 relative lg:pr-5">
                       Empower Your Journey — Learn What You Love
                    </h3>
                    <p className="text-gray-900 mt-4 z-10 relative lg:pr-10">
                    Discover a world where education meets inspiration. Our Scholar Management System is designed to help you follow your passion, choose the subjects that spark your curiosity, and connect with mentors who fuel your growth. Whether you're a student or a lifelong learner, we provide the tools to turn your ambition into achievement.
                        
                    </p>
                </div>

                <div className="lg:w-1/2 flex justify-center items-center relative h-[400px]">
                    
                    <img
                        src="https://i.postimg.cc/qRVTmFwj/idea3.jpg"
                        alt=""
                        className="absolute top-5 left-10 -translate-x-1/2 w-64 rounded-lg border-4 border-white shadow-lg z-10"
                    />

                    <img
                        src="https://i.postimg.cc/MTz7bPyQ/idea2.webp"
                        alt="Image not found"
                        className="absolute top-30 left-60 -translate-x-1/2 w-64 rounded-lg border-4 border-white shadow-2xl z-20"
                    />

                    
                    <img
                        src="https://i.postimg.cc/xT00DW2Z/idea1.jpg"
                        alt=""
                        className="absolute top-5 left-110 -translate-x-1/2 w-64 rounded-lg border-4 border-white shadow-2xl z-30"
                    />
                </div>

            </div>
        </section>
    );
};

export default IdeaSection;
