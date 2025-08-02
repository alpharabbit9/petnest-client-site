import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Heart, Shield, Clock, Users } from 'lucide-react';
import img from '../../../assets/images/Category/The-personalities-of-animal-owners-are-reflected-in-their-pets.jpg'

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "How do I start the pet adoption process?",
      answer: "Getting started is easy! Browse our available pets, create your profile, and submit an adoption application for the pet you're interested in. Our team will review your application and contact you within 24-48 hours to discuss the next steps, including a meet-and-greet session.",
      icon: <Users className="w-5 h-5 text-[#F04336]" />
    },
    {
      id: 2,
      question: "What are the adoption fees and what do they cover?",
      answer: "Adoption fees vary by pet type and age, typically ranging from $50-$300. These fees cover spaying/neutering, vaccinations, microchipping, health examinations, and basic training. We believe in transparent pricing with no hidden costs - everything is included to ensure your new companion is healthy and ready for their forever home.",
      icon: <Shield className="w-5 h-5 text-[#F04336]" />
    },
    {
      id: 3,
      question: "How long does the adoption process take?",
      answer: "The entire process typically takes 3-7 days from application to taking your pet home. This includes application review (1-2 days), meet-and-greet scheduling (1-2 days), home visit if required (1-2 days), and final paperwork completion. We prioritize finding the right match over speed.",
      icon: <Clock className="w-5 h-5 text-[#F04336]" />
    },
   
    {
      id: 5,
      question: "What if my current pets don't get along with the new adoption?",
      answer: "We offer a 14-day compatibility period where you can return the pet if there are serious compatibility issues with existing pets or family members. We also provide free behavioral consultation during this period to help with the transition. Pet compatibility meetings are highly recommended before finalizing adoption.",
      icon: <Shield className="w-5 h-5 text-[#F04336]" />
    },
   
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-[#F04336]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A303A]">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about adopting your perfect companion. 
            Can't find your answer? We're here to help!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={img}
                  alt="Happy family with adopted pets"
                  className="w-full h-[500px] lg:h-[700px] object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A303A]/60 via-transparent to-transparent"></div>
                
                {/* Floating Stats Cards */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#F04336]">5000+</div>
                      <div className="text-sm text-[#0A303A] font-medium">Happy Adoptions</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#F04336]">98%</div>
                      <div className="text-sm text-[#0A303A] font-medium">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F04336]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0A303A]/10 rounded-full blur-2xl"></div>
              
              {/* Floating Heart */}
              <div className="absolute top-8 right-8 animate-bounce">
                <Heart className="w-8 h-8 text-[#F04336] fill-[#F04336]" />
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#F04336]" />
                  <h4 className="font-bold text-[#0A303A]">Quick Process</h4>
                </div>
                <p className="text-gray-600 text-sm">Most adoptions completed within a week</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-[#F04336]" />
                  <h4 className="font-bold text-[#0A303A]">Full Support</h4>
                </div>
                <p className="text-gray-600 text-sm">Lifetime guidance and assistance</p>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ */}
          <div className="order-1 lg:order-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 ${
                    openFAQ === index
                      ? 'border-[#F04336] shadow-xl'
                      : 'border-gray-200 hover:border-[#F04336]/50 hover:shadow-xl'
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {faq.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-[#0A303A] pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-6 h-6 text-[#F04336]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <div className="pl-9 border-l-3 border-[#F04336]/20">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-gradient-to-r from-[#0A303A]  to-[#0A303A]/90 rounded-3xl p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-gray-300 mb-6">
                  Our adoption specialists are here to help you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#F04336] hover:bg-[#F04336]/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                    Contact Us
                  </button>
                  <button className="border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                    Schedule a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;