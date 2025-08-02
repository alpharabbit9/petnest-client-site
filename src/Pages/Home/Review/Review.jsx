import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Heart, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Review = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      pet: "Golden Retriever - Max",
      image: "/api/placeholder/80/80",
      rating: 5,
      review: "Finding Max through this platform was the best decision we ever made! The adoption process was seamless, and the support team was incredibly helpful. Max has brought so much joy to our family. The website made it easy to find the perfect companion for our lifestyle.",
      location: "Portland, OR",
      adoptionDate: "March 2024"
    },
    {
      id: 2,
      name: "Michael Chen",
      pet: "Tabby Cat - Luna",
      image: "/api/placeholder/80/80",
      rating: 5,
      review: "Luna is absolutely perfect! The detailed profiles and honest descriptions helped us choose the right pet. The virtual meet-and-greet feature was fantastic, especially during busy times. The follow-up support after adoption shows they truly care about the animals and families.",
      location: "Seattle, WA",
      adoptionDate: "February 2024"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      pet: "Beagle Mix - Charlie",
      image: "/api/placeholder/80/80",
      rating: 5,
      review: "Charlie has been with us for 8 months now and we couldn't be happier! The adoption process was thorough but not overwhelming. The staff genuinely cared about finding the right match. This platform connects hearts and creates families. Highly recommend!",
      location: "Denver, CO",
      adoptionDate: "August 2023"
    },
    {
      id: 4,
      name: "David Thompson",
      pet: "German Shepherd - Bella",
      image: "/api/placeholder/80/80",
      rating: 5,
      review: "Bella is an amazing addition to our family! The website's filtering system helped us find exactly what we were looking for. The transparency about each pet's background and needs was incredibly helpful. Thank you for making pet adoption so accessible and meaningful.",
      location: "Austin, TX",
      adoptionDate: "January 2024"
    },
    {
      id: 5,
      name: "Lisa Park",
      pet: "Persian Cat - Whiskers",
      image: "/api/placeholder/80/80",
      rating: 5,
      review: "The entire experience exceeded our expectations! From browsing profiles to bringing Whiskers home, everything was professional and caring. The resources provided for new pet parents were invaluable. This platform truly prioritizes the wellbeing of both pets and families.",
      location: "San Francisco, CA",
      adoptionDate: "April 2024"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section 
      className="relative py-20 px-4 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: 'url("bg-img")' }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A303A]/95 via-[#0A303A]/90 to-[#0A303A]/95"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#F04336]/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#F04336]/20 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-5 w-8 h-8 bg-[#F04336]/40 transform rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-[#F04336] fill-[#F04336]" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Happy Tails & Hearts
            </h2>
            <Heart className="w-8 h-8 text-[#F04336] fill-[#F04336]" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real stories from families who found their perfect companions through our platform. 
            Every adoption creates a beautiful bond that lasts a lifetime.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="text-white font-semibold ml-2">
              4.9/5 from {reviews.length * 47}+ happy families
            </span>
          </div>
        </div>

        {/* Reviews Slider Container */}
        <div className="relative">
          {/* Main Review Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
            <div className="text-center">
              {/* Quote Icon */}
              <Quote className="w-16 h-16 text-[#F04336] mx-auto mb-6 opacity-80" />
              
              {/* Review Text */}
              <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8 font-medium">
                "{reviews[currentReview].review}"
              </blockquote>
              
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(reviews[currentReview].rating)}
              </div>
              
              {/* Reviewer Info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={reviews[currentReview].image}
                    alt={reviews[currentReview].name}
                    className="w-16 h-16 rounded-full border-3 border-[#F04336] object-cover"
                  />
                  <div className="text-left">
                    <h4 className="text-white font-bold text-lg">
                      {reviews[currentReview].name}
                    </h4>
                    <p className="text-[#F04336] font-semibold">
                      Adopted: {reviews[currentReview].pet}
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-300">
                    📍 {reviews[currentReview].location}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {reviews[currentReview].adoptionDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#F04336] hover:bg-[#F04336]/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextReview}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#F04336] hover:bg-[#F04336]/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-12 gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentReview
                  ? 'bg-[#F04336] scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Reviews */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              onClick={() => goToReview(index)}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                index === currentReview ? 'ring-2 ring-[#F04336] bg-white/15' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-[#F04336]/50 object-cover"
                />
                <div>
                  <h5 className="text-white font-semibold text-sm">{review.name}</h5>
                  <p className="text-[#F04336] text-xs">{review.pet}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-300 text-sm line-clamp-3">
                "{review.review.substring(0, 100)}..."
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Write Your Own Success Story?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of happy families who found their perfect companion. 
            Start your adoption journey today!
          </p>
          <Link to={'/petList'}>
          <button className="bg-[#F04336] hover:bg-[#F04336]/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Adopting Now 🐾
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Review;