import React, { useState, useEffect } from "react";
import { Heart, Users, Home, Award, ArrowRight, CheckCircle, Star, Dog, Cat, Sparkles, Shield } from "lucide-react";

// Counter Animation Component
const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-2deg); }
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
        
        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
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
        
        .animate-bounce-gentle {
          animation: bounceGentle 2s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement delay={0} className="top-20 left-10 text-orange-200">
            <Heart className="w-8 h-8 opacity-30 fill-current" />
          </FloatingElement>
          <FloatingElement delay={2} className="top-40 right-20 text-blue-200">
            <Dog className="w-10 h-10 opacity-20" />
          </FloatingElement>
          <FloatingElement delay={1} className="bottom-40 left-1/4 text-orange-300">
            <Cat className="w-7 h-7 opacity-25" />
          </FloatingElement>
          <FloatingElement delay={3} className="bottom-20 right-16 text-blue-300">
            <Sparkles className="w-6 h-6 opacity-20" />
          </FloatingElement>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F04336] rounded-full mb-6 shadow-lg animate-bounce-gentle">
                <Heart className="w-10 h-10 text-white fill-current" />
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#0A303A] animate-slide-up">About PawsConnect</h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                Connecting loving families with pets in need since 2020
              </p>

              <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <button className="bg-[#F04336] hover:bg-orange-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg flex items-center mx-auto">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold mb-6 text-[#0A303A]">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At PawsConnect, we believe every pet deserves a loving home and every family deserves the joy of a
                furry companion. Our mission is to bridge the gap between homeless pets and caring families through
                our innovative adoption platform.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We work tirelessly with shelters, rescue organizations, and volunteers to ensure that every pet finds
                their perfect match, creating lasting bonds that enrich lives on both ends of the leash.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F04336]" />
                  <span className="text-gray-700">Verified Shelters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F04336]" />
                  <span className="text-gray-700">Health Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F04336]" />
                  <span className="text-gray-700">Lifetime Support</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=400&fit=crop"
                  alt="Happy family with adopted pets"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 animate-wiggle">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-orange-500">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[#0A303A]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">Our Impact in Numbers</h2>
            <p className="text-xl text-blue-100 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Every number represents a life changed and a family completed
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-center p-6 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={15420} />
                  </div>
                  <div className="text-blue-100 font-medium">Happy Adoptions</div>
                </div>
              </div>

              <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-center p-6 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={350} suffix="+" />
                  </div>
                  <div className="text-blue-100 font-medium">Partner Shelters</div>
                </div>
              </div>

              <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-center p-6 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <div className="text-blue-100 font-medium">Success Rate</div>
                </div>
              </div>

              <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-center p-6 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={50} />
                  </div>
                  <div className="text-blue-100 font-medium">States Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#0A303A] animate-fade-in">How It Works</h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Your journey to finding the perfect companion in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 text-orange-500 hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0A303A]">1. Create Profile</h3>
              <p className="text-gray-600">
                Tell us about your lifestyle and preferences to help us match you with the perfect pet.
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 text-orange-500 hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0A303A]">2. Browse Pets</h3>
              <p className="text-gray-600">Explore our database of loving pets waiting for their forever homes.</p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 text-orange-500 hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0A303A]">3. Meet & Greet</h3>
              <p className="text-gray-600">
                Schedule a meeting with your potential new family member at our partner shelters.
              </p>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4 text-orange-500 hover:scale-110 transition-transform duration-300">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0A303A]">4. Take Home</h3>
              <p className="text-gray-600">Complete the adoption process and welcome your new best friend home!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#0A303A] animate-fade-in">Our Values</h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up p-6"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#0A303A]">Compassion First</h3>
                <p className="text-gray-600">
                  Every decision we make is guided by compassion for both pets and families, ensuring the best
                  outcomes for all.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up p-6"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0A303A]">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#0A303A]">Trust & Transparency</h3>
                <p className="text-gray-600">
                  We maintain complete transparency in our processes and build trust through honest communication.
                </p>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up p-6"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#0A303A]">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every interaction, continuously improving our services and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#0A303A] animate-fade-in">Success Stories</h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Hear from families who found their perfect companions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up p-6"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-orange-500" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "PawsConnect made finding our perfect dog so easy. The process was smooth, and the support team was
                incredible. Max has been the best addition to our family!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b672?w=50&h=50&fit=crop&crop=face" alt="Sarah Johnson" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-[#0A303A]">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Dog Mom to Max</div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up p-6"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-[#F04336]" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "We adopted Luna through PawsConnect and couldn't be happier. The matching process was perfect, and
                Luna fits right into our family like she was always meant to be here."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" alt="Mike Chen" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-[#0A303A]">Mike Chen</div>
                  <div className="text-sm text-gray-500">Cat Dad to Luna</div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-up p-6"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-[#F04336]" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The team at PawsConnect went above and beyond to help us find Buddy. Their follow-up support has
                been amazing, and we feel like part of a caring community."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" alt="Emily Rodriguez" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-[#0A303A]">Emily Rodriguez</div>
                  <div className="text-sm text-gray-500">Dog Mom to Buddy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F04336]">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Find Your Perfect Companion?
          </h2>
          <p className="text-xl text-orange-100 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join thousands of happy families who have found their furry best friends through PawsConnect
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button className="bg-[#0A303A] hover:bg-blue-800 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center">
              Browse Available Pets
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#F04336] px-8 py-4 rounded-full transition-all duration-300 font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}