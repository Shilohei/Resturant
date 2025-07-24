import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Phone, Mail, Star } from "lucide-react";
import { toast } from "sonner";

interface TimeSlot {
  time: string;
  available: boolean;
  premium?: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: "5:00 PM", available: true },
  { time: "5:30 PM", available: false },
  { time: "6:00 PM", available: true, premium: true },
  { time: "6:30 PM", available: true },
  { time: "7:00 PM", available: true, premium: true },
  { time: "7:30 PM", available: true },
  { time: "8:00 PM", available: true, premium: true },
  { time: "8:30 PM", available: false },
  { time: "9:00 PM", available: true },
  { time: "9:30 PM", available: true },
];

export const Reservations = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    requests: ""
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

    toast.success("Reservation Confirmed!", {
      description: `Your table for ${formData.guests} on ${formData.date} at ${formData.time} has been reserved.`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      occasion: "",
      requests: ""
    });

    setIsSubmitting(false);
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="reservations" className="py-20 bg-gradient-to-b from-charcoal-light to-charcoal">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-warm-white mb-4">
              Reserve Your <span className="text-luxury">Table</span>
            </h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto mb-8">
              Secure your seat for an unforgettable culinary journey
            </p>
            <div className="flex justify-center items-center space-x-6 text-warm-gray">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Open 5:00 PM - 11:00 PM</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-cormorant text-gold flex items-center">
                  <Calendar className="mr-2" size={24} />
                  Make a Reservation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
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
                    <Label htmlFor="phone" className="text-warm-white">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-charcoal/50 border-gold/30 text-warm-white placeholder:text-warm-gray focus:border-gold"
                    />
                  </div>

                  {/* Date and Party Size */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-warm-white">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        min={minDate}
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                        className="bg-charcoal/50 border-gold/30 text-warm-white focus:border-gold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guests" className="text-warm-white">Party Size *</Label>
                      <select
                        id="guests"
                        value={formData.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-charcoal/50 border border-gold/30 rounded-md text-warm-white focus:border-gold focus:outline-none"
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-warm-white mb-3 block">Preferred Time *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => handleInputChange("time", slot.time)}
                          className={`p-3 rounded-lg border text-sm font-medium transition-all duration-300 ${
                            formData.time === slot.time
                              ? "border-gold bg-gold text-charcoal"
                              : slot.available
                                ? "border-gold/30 text-warm-white hover:border-gold hover:bg-gold/10"
                                : "border-warm-gray/20 text-warm-gray/50 cursor-not-allowed"
                          }`}
                        >
                          {slot.time}
                          {slot.premium && (
                            <Star size={12} className="inline ml-1" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Occasion */}
                  <div>
                    <Label htmlFor="occasion" className="text-warm-white">Special Occasion</Label>
                    <select
                      id="occasion"
                      value={formData.occasion}
                      onChange={(e) => handleInputChange("occasion", e.target.value)}
                      className="w-full px-3 py-2 bg-charcoal/50 border border-gold/30 rounded-md text-warm-white focus:border-gold focus:outline-none"
                    >
                      <option value="">Select occasion (optional)</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="date">Date Night</option>
                      <option value="business">Business Dinner</option>
                      <option value="celebration">Celebration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="requests" className="text-warm-white">Special Requests</Label>
                    <Textarea
                      id="requests"
                      placeholder="Dietary restrictions, seating preferences, etc."
                      value={formData.requests}
                      onChange={(e) => handleInputChange("requests", e.target.value)}
                      className="bg-charcoal/50 border-gold/30 text-warm-white placeholder:text-warm-gray focus:border-gold resize-none"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="luxury" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.date || !formData.time}
                  >
                    {isSubmitting ? "Confirming Reservation..." : "Reserve Table"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Restaurant Information */}
            <div className="space-y-6">
              {/* Private Dining */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold flex items-center">
                    <Users className="mr-2" size={20} />
                    Private Dining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray mb-4">
                    For parties of 9 or more, we offer exclusive private dining experiences with customized menus.
                  </p>
                  <Button variant="ghost-gold" size="sm">
                    Inquire About Private Events
                  </Button>
                </CardContent>
              </Card>

              {/* Dress Code */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold">
                    Dress Code & Policies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-warm-gray">
                    <div>
                      <strong className="text-gold">Dress Code:</strong> Smart casual to formal attire
                    </div>
                    <div>
                      <strong className="text-gold">Cancellation:</strong> 24-hour notice required
                    </div>
                    <div>
                      <strong className="text-gold">Late Arrival:</strong> Tables held for 15 minutes
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-charcoal-light/50 border-gold/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-cormorant text-gold">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-warm-gray">
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gold" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gold" />
                      <span>reservations@otsu.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gold" />
                      <div>
                        <div>Monday - Sunday</div>
                        <div>5:00 PM - 11:00 PM</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};