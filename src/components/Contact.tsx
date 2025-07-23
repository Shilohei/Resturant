import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, Star, Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Message Sent!", {
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-charcoal-light to-charcoal">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white mb-4">
              Get In <span className="text-luxury">Touch</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for reservations, inquiries, or just to say hello.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-cormorant text-gold flex items-center">
                  <Mail className="mr-2" size={24} />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-warm-white">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-charcoal/50 border-gold/30 text-warm-white placeholder:text-warm-gray focus:border-gold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-warm-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-charcoal/50 border-gold/30 text-warm-white placeholder:text-warm-gray focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-warm-white">Subject</Label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="w-full px-3 py-2 bg-charcoal/50 border border-gold/30 rounded-md text-warm-white focus:border-gold focus:outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="private-dining">Private Dining</option>
                      <option value="catering">Catering Services</option>
                      <option value="feedback">Feedback</option>
                      <option value="career">Career Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-warm-white">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      className="bg-charcoal/50 border-gold/30 text-warm-white placeholder:text-warm-gray focus:border-gold resize-none"
                      rows={5}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Location & Hours */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold flex items-center">
                    <MapPin className="mr-2" size={20} />
                    Visit Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gold mb-2">Address</h4>
                      <p className="text-warm-gray">
                        Lazimpat
                        <br />
                        Kathmandu City
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gold mb-2">Hours</h4>
                      <div className="text-warm-gray space-y-1">
                        <div className="flex justify-between">
                          <span>Monday - Thursday</span>
                          <span>5:00 PM - 10:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Friday - Saturday</span>
                          <span>5:00 PM - 11:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>5:00 PM - 9:30 PM</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost-gold" size="sm" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Details */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold">
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone size={20} className="text-gold" />
                      <div>
                        <p className="text-warm-white font-medium">(555) 123-4567</p>
                        <p className="text-warm-gray text-sm">Reservations & General Inquiries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-gold" />
                      <div>
                        <p className="text-warm-white font-medium">info@bistroluxe.com</p>
                        <p className="text-warm-gray text-sm">General Information</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail size={20} className="text-gold" />
                      <div>
                        <p className="text-warm-white font-medium">events@bistroluxe.com</p>
                        <p className="text-warm-gray text-sm">Private Events & Catering</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media & Reviews */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold">
                    Follow Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-warm-gray">Stay connected</span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-gold fill-gold" size={16} />
                        <span className="text-gold font-semibold">4.9</span>
                        <span className="text-warm-gray">(2,847 reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button variant="ghost-gold" size="sm" className="flex-1">
                        <Instagram size={16} className="mr-2" />
                        Instagram
                      </Button>
                      <Button variant="ghost-gold" size="sm" className="flex-1">
                        <Facebook size={16} className="mr-2" />
                        Facebook
                      </Button>
                    </div>

                    <Button variant="ghost-gold" size="sm" className="w-full">
                      <Twitter size={16} className="mr-2" />
                      Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 border-t border-gold/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center">
                <span className="text-charcoal font-bold">B</span>
              </div>
              <h3 className="text-2xl font-cormorant font-bold text-gold">Bistro Luxe</h3>
            </div>
            
            <p className="text-warm-gray mb-6 max-w-md mx-auto">
              Creating unforgettable culinary experiences since 2009. 
              Where passion meets perfection on every plate.
            </p>

            <div className="flex justify-center space-x-6 text-warm-gray text-sm">
              <span>© 2024 Bistro Luxe</span>
              <span>•</span>
              <button className="hover:text-gold transition-colors">Privacy Policy</button>
              <span>•</span>
              <button className="hover:text-gold transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};