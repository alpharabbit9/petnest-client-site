import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Heart, 
  Users, 
  Shield,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

// Floating Element Component
const FloatingElement = ({
  children,
  delay = 0,
  className = "",
}) => (
  <div 
    className={`absolute ${className}`} 
    style={{ 
      animationDelay: `${delay}s`,
      animation: 'float 6s ease-in-out infinite'
    }}
  >
    {children}
  </div>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'adoption'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactReason: 'adoption'
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(3deg); }
          66% { transform: translateY(8px) rotate(-3deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-pulse-gentle {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-teal-50 py-20 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #fef2f2 0%, #ffffff 50%, #f0fdfa 100%)'
      }}>
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0} className="top-20 left-10" style={{ color: '#F04336', opacity: 0.1 }}>
            <MessageCircle className="w-12 h-12" />
          </FloatingElement>
          <FloatingElement delay={2} className="top-32 right-20" style={{ color: '#0A303A', opacity: 0.1 }}>
            <Heart className="w-10 h-10 fill-current" />
          </FloatingElement>
          <FloatingElement delay={1} className="bottom-40 left-1/4" style={{ color: '#F04336', opacity: 0.15 }}>
            <Phone className="w-8 h-8" />
          </FloatingElement>
          <FloatingElement delay={3} className="bottom-20 right-16" style={{ color: '#0A303A', opacity: 0.1 }}>
            <Mail className="w-9 h-9" />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg animate-pulse-gentle"
                style={{ backgroundColor: '#F04336' }}
              >
                <MessageCircle className="w-10 h-10 text-white" />
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up" style={{ color: '#0A303A' }}>
                Contact Us
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                We're here to help you find your perfect furry companion
              </p>

              <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                  Have questions about adoption, need support, or want to partner with us? 
                  Our friendly team is ready to assist you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div 
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#F04336' }}
              >
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A303A' }}>Call Us</h3>
              <p className="text-gray-600 mb-2">Mon-Fri: 9AM-7PM</p>
              <p className="font-semibold" style={{ color: '#F04336' }}>1-800-PAWSCONNECT</p>
            </div>

            <div className="text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div 
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#0A303A' }}
              >
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A303A' }}>Email Us</h3>
              <p className="text-gray-600 mb-2">24/7 Support</p>
              <p className="font-semibold" style={{ color: '#F04336' }}>hello@pawsconnect.com</p>
            </div>

            <div className="text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div 
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#F04336' }}
              >
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A303A' }}>Visit Us</h3>
              <p className="text-gray-600 mb-2">Main Office</p>
              <p className="font-semibold" style={{ color: '#F04336' }}>123 Pet Lane, Animal City</p>
            </div>

            <div className="text-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <div 
                className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#0A303A' }}
              >
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0A303A' }}>Hours</h3>
              <p className="text-gray-600 mb-2">Mon-Fri: 9AM-7PM</p>
              <p className="font-semibold" style={{ color: '#F04336' }}>Sat-Sun: 10AM-6PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="animate-slide-in-left">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A303A' }}>Send us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8 animate-scale-in">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: '#F04336' }}
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#0A303A' }}>Message Sent!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A303A' }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                          style={{ focusRingColor: '#F04336' }}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A303A' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A303A' }}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0A303A' }}>
                          I'm interested in
                        </label>
                        <select
                          name="contactReason"
                          value={formData.contactReason}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                        >
                          <option value="adoption">Pet Adoption</option>
                          <option value="support">General Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="volunteer">Volunteering</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#0A303A' }}>
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#0A303A' }}>
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-vertical"
                        placeholder="Tell us more about how we can help you..."
                      ></textarea>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg flex items-center justify-center"
                      style={{ backgroundColor: '#F04336' }}
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="animate-slide-in-right">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6" style={{ color: '#0A303A' }}>Get in Touch</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Whether you're looking to adopt a pet, need support with your furry friend, or want to partner with us, 
                    we're here to help. Our dedicated team is passionate about connecting pets with loving families.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#F04336' }}
                    >
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: '#0A303A' }}>Adoption Support</h3>
                      <p className="text-gray-600">
                        Our adoption specialists are here to guide you through every step of finding your perfect companion.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#0A303A' }}
                    >
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: '#0A303A' }}>Pet Care Resources</h3>
                      <p className="text-gray-600">
                        Get access to training tips, health resources, and ongoing support for your adopted pet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#F04336' }}
                    >
                      <Heart className="w-6 h-6 text-white fill-current" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2" style={{ color: '#0A303A' }}>Community Impact</h3>
                      <p className="text-gray-600">
                        Learn about volunteer opportunities and how you can help make a difference in pets' lives.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="font-bold text-lg mb-4" style={{ color: '#0A303A' }}>Response Times</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email Support</span>
                      <span className="font-semibold" style={{ color: '#F04336' }}>Within 24 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Phone Support</span>
                      <span className="font-semibold" style={{ color: '#F04336' }}>Immediate</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Emergency Support</span>
                      <span className="font-semibold" style={{ color: '#F04336' }}>24/7 Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in" style={{ color: '#0A303A' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="font-semibold text-lg mb-3" style={{ color: '#0A303A' }}>
                How long does the adoption process take?
              </h3>
              <p className="text-gray-600">
                The adoption process typically takes 3-7 days, including application review, meet-and-greet, 
                and home preparation. We want to ensure the perfect match for both you and your new pet.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-semibold text-lg mb-3" style={{ color: '#0A303A' }}>
                What support do you provide after adoption?
              </h3>
              <p className="text-gray-600">
                We provide lifetime support including training resources, health guidance, behavioral tips, 
                and a 24/7 support hotline for any questions or concerns.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="font-semibold text-lg mb-3" style={{ color: '#0A303A' }}>
                Do you work with shelters in my area?
              </h3>
              <p className="text-gray-600">
                We partner with over 350 shelters across 50 states. Contact us with your location, 
                and we'll connect you with local partner shelters and available pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: '#0A303A' }}>
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-teal-100 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Don't wait to find your perfect companion. Browse available pets or get in touch with our team today.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button 
              className="text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center"
              style={{ backgroundColor: '#F04336' }}
            >
              Browse Available Pets
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white px-8 py-4 rounded-full transition-all duration-300 font-semibold"
              style={{ color: 'white' }}
              onMouseOver={(e) => { e.target.style.color = '#0A303A'; }}
              onMouseOut={(e) => { e.target.style.color = 'white'; }}
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}