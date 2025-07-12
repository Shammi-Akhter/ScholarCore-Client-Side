import React from 'react';

const features = [
    {
        image: 'https://html.themewant.com/unipix/landing/assets/images/icon/13.svg',
        title: 'Desire Knowledge',
        description:
            'You can check any time our powerful documentation.',
    },
    {
        image: 'https://html.themewant.com/unipix/landing/assets/images/icon/14.svg',
        title: 'Proficient Support',
        description:
            'Enjoy free lifetime reliable updates and six months free support.',
    },
    {
        image: 'https://html.themewant.com/unipix/landing/assets/images/icon/15.svg',
        title: 'Regular Updates',
        description:
            'Enjoy free lifetime reliable updates going with your purchase.',
    },
];

const Feature = () => {
    return (
        <section className="container mx-auto px-6 py-16">
            <div className="grid gap-4 md:grid-cols-3">
                {features.map(({ image, title, description }, idx) => (
                    <div
                        key={idx}
                        className="bg-white flex gap-4 rounded-2xl p-8 shadow-md hover:shadow-xl transform hover:scale-[1.03] transition duration-300 cursor-pointer"
                    >
                        <div className='flex flex-col items-center justify-center'>
                            <img
                                src={image}
                                alt={title}
                                className="w-30 h-16 object-cover rounded-lg mb-5"
                                loading="lazy"
                            />
                            
                        </div>
                        <div>
                        <h3 className="text-2xl font-semibold mb-3 text-yellow-500">{title}</h3>
                        <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    );
};

export default Feature;
