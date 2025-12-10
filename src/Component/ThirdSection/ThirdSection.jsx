import React from 'react';
import { BookMarked, Users, Award } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const ThirdSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Explore Our Scholarship Advantages
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover the unique features and benefits of our scholarship programs that support your academic and career goals.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="overflow-hidden rounded-2xl shadow-xl group">
            <img
              src="https://i.postimg.cc/zXPjnJNd/t1.avif"
              alt="Scholarship Advantage 1"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl group">
            <img
              src="https://i.postimg.cc/HkqF90mP/t2.jpg"
              alt="Scholarship Advantage 2"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <BookMarked className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Desire Knowledge</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                You can check any time our powerful documentation and access comprehensive learning resources.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Proficient Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enjoy free lifetime reliable updates and six months free support from our dedicated team.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Regular Updates</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Enjoy free lifetime reliable updates going with your purchase and stay current always.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
