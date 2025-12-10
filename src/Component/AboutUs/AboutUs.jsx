import React from 'react';
import { Target, Users, Award, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const AboutUs = () => {
  const sections = [
    {
      icon: Users,
      title: "Who We Are",
      content: "ScholarCore is a comprehensive digital solution designed to streamline the scholarship lifecycle — from application and review to award distribution and monitoring. Built with academic institutions and scholarship providers in mind, our platform eliminates paperwork, reduces manual workload, and increases fairness in selection."
    },
    {
      icon: Target,
      title: "Our Mission",
      content: "To simplify and digitize scholarship management, making educational funding more accessible and equitable for students around the world."
    },
    {
      icon: Award,
      title: "Why Choose Us?",
      content: "We combine cutting-edge technology with user-friendly design to create a platform that serves students, administrators, and scholarship providers alike. Our commitment to transparency, efficiency, and accessibility sets us apart."
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      content: "To become the leading scholarship management platform globally, connecting deserving students with life-changing educational opportunities through innovative technology and seamless user experiences."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Award className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-5xl font-bold text-black mb-4">
            About ScholarCore
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Empowering institutions to manage scholarships efficiently and transparently through smart, scalable technology.
          </p>
        </div>


        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#FEE685] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 leading-relaxed">
                  {section.content}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-[#FEE685]/10 to-[#ffd93d]/10">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold text-black mb-4">Join Our Community</h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
                Be part of a platform that's transforming scholarship management and helping students achieve their educational dreams.
              </p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-black">10K+</p>
                  <p className="text-gray-600">Students</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-black">500+</p>
                  <p className="text-gray-600">Scholarships</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-black">100+</p>
                  <p className="text-gray-600">Universities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
