import React from 'react';
import { Mail, Send, Phone, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-5xl font-bold text-black mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or need help? Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-[#FEE685] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-sm text-gray-600">support@scholarcore.com</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-[#FEE685] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-sm text-gray-600">+880 1234-567890</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-[#FEE685] rounded-xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold mb-1">Visit Us</h3>
              <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
            </CardContent>
          </Card>
        </div>


        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Send us a message</CardTitle>
            <CardDescription className="text-base">Fill out the form below and we'll respond as soon as possible</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="How can we help you?"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90 font-semibold h-12 shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
