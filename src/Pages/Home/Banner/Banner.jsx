import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../../assets/images/slider_bg01.jpg';
import img2 from '../../../assets/images/slider_bg02.jpg';
import './Banner.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const swiperRef = useRef(null);
    const contentRef = useRef([]);
    const overlayRef = useRef(null);

    // Slide content data for better organization
    const slideData = [
        {
            image: img1,
            title: "Best Friend with Happy Time",
            description: "Discover the joy of companionship with your furry friends. Create unforgettable memories and build lasting bonds that will warm your heart forever.",
            highlight: "with"
        },
        {
            image: img2,
            title: "Love & Care for Every Pet",
            description: "Providing the best care and attention your pets deserve. From daily walks to special treats, every moment is filled with love and happiness.",
            highlight: "Care"
        }
    ];

    // GSAP entrance animations
    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });
        
        // Animate overlay fade in
        tl.fromTo(overlayRef.current, 
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Initial content animation
        animateSlideContent(0);
    }, []);

    // Function to animate slide content
    const animateSlideContent = (slideIndex) => {
        const content = contentRef.current[slideIndex];
        if (!content) return;

        const title = content.querySelector('.slide-title');
        const description = content.querySelector('.slide-description');
        const button = content.querySelector('.slide-button');
        const highlight = content.querySelector('.highlight-text');
        const particles = content.querySelectorAll('.particle');

        const tl = gsap.timeline();

        // Reset positions
        gsap.set([title, description, button], { y: 50, opacity: 0 });
        gsap.set(highlight, { scale: 0, rotation: -10 });
        gsap.set(particles, { scale: 0, opacity: 0 });

        // Animate in sequence
        tl.to(title, { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            stagger: 0.1
        })
        .to(highlight, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .to(description, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .to(button, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2")
        .to(particles, {
            scale: 1,
            opacity: 0.7,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.3");

        // Floating animation for particles
        particles.forEach((particle, index) => {
            gsap.to(particle, {
                y: -20,
                duration: 2 + index * 0.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1,
                delay: index * 0.2
            });
        });
    };

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.activeIndex);
        animateSlideContent(swiper.activeIndex);
    };

    // Button animation variants
    const buttonVariants = {
        initial: { 
            scale: 1,
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
        },
        hover: { 
            scale: 1.05,
            y: -2,
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)"
        },
        tap: { 
            scale: 0.95,
            y: 0
        }
    };

    const titleVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { 
            y: 0, 
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const SlideContent = ({ slide, index }) => (
        <div 
            ref={el => contentRef.current[index] = el}
            className="absolute inset-0  bg-opacity-50 flex flex-col justify-center text-white px-7 md:px-16"
        >
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle absolute w-2 h-2 bg-white bg-opacity-20 rounded-full"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                    />
                ))}
            </div>

            <motion.div className="relative z-10 max-w-4xl">
                <motion.h2 
                    className="slide-title text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                    variants={titleVariants}
                >
                    <span className="inline-block">Best Friend </span>
                    <motion.span 
                        className="highlight-text inline-block px-4 py-2 bg-[#F04336] rounded-2xl mx-2"
                        whileHover={{
                            rotate: [0, -5, 5, 0],
                            scale: 1.1,
                            transition: { duration: 0.5 }
                        }}
                    >
                        {slide.highlight}
                    </motion.span>
                    <br />
                    <span className="inline-block">Happy Time</span>
                </motion.h2>

                <motion.p 
                    className="slide-description text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed text-gray-100 max-w-2xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    {slide.description}
                </motion.p>

                <motion.div 
                    className="slide-button"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.button
                        className="relative overflow-hidden bg-[#F04336] rounded-2xl px-8 py-4 font-semibold text-lg group"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial="initial"
                    >
                        <motion.span
                            className="relative z-10 text-white flex items-center gap-2"
                            variants={{
                                initial: { color: "#ffffff" },
                                hover: { color: "#ffffff" },
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            View More
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                variants={{
                                    initial: { x: 0 },
                                    hover: { x: 5 }
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </motion.span>

                        {/* Animated background wipe with gradient */}
                        <motion.span
                            className="absolute top-0 left-0 h-full "
                            variants={{
                                initial: { width: "0%" },
                                hover: { width: "100%" },
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ zIndex: 0 }}
                        />

                        {/* Pulse effect */}
                        <motion.span
                            className="absolute inset-0 bg-white opacity-20 rounded-2xl"
                            variants={{
                                initial: { scale: 0, opacity: 0 },
                                hover: { scale: 1.1, opacity: 0.1 }
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );

    return (
        <div className="-mt-7 min-h-screen relative overflow-hidden">
            {/* Background overlay */}
            <div 
                ref={overlayRef}
                className="absolute   z-10 pointer-events-none"
            />

            <Swiper
                ref={swiperRef}
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
                onSlideChange={handleSlideChange}
                speed={1000}
                effect="fade"
            >
                {slideData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-screen">
                            {/* Image with ken burns effect */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 8, ease: "linear" }}
                            >
                                <img 
                                    src={slide.image} 
                                    alt={`Slide ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Slide content */}
                            <AnimatePresence mode="wait">
                                {activeSlide === index && (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <SlideContent slide={slide} index={index} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom slide indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                {slideData.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                            activeSlide === index ? 'bg-[#F04336] scale-125' : 'bg-white bg-opacity-50'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => swiperRef.current?.swiper.slideTo(index)}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 right-8 z-20 text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-light">Scroll</span>
                    <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                </div>
            </motion.div>
        </div>
    );
};

export default Banner;