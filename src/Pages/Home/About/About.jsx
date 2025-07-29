import './About.css'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dogs from '../../../assets/images/Category/dog.jpg'
import cats from '../../../assets/images/Category/cats.jpg'
import birds from '../../../assets/images/Category/birds.jpg'
import rabbit from '../../../assets/images/Category/rabbit.jpg'

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

const About = () => {
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const cardsRef = useRef([])

    useEffect(() => {
       

        // GSAP animations with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none" // Only play once, don't reverse
            }
        })

        // Set initial states (important to prevent disappearing)
        gsap.set([titleRef.current, subtitleRef.current], {
            y: 50,
            opacity: 0
        })

        gsap.set(cardsRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.8
        })

        // Animate title and subtitle
        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        })
        .to(subtitleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")

        // Animate cards with stagger effect
        .to(cardsRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.2
        }, "-=0.2")

        // Hover animations for cards
        cardsRef.current.forEach((card, index) => {
            if (card) {
                const img = card.querySelector('img')
                const title = card.querySelector('h4')
                
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.05,
                        y: -10,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    gsap.to(img, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    gsap.to(title, {
                        backgroundColor: "#F04336",
                        duration: 0.3,
                        ease: "power2.out"
                    })
                })

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    gsap.to(img, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    gsap.to(title, {
                        backgroundColor: "#0A303A",
                        duration: 0.3,
                        ease: "power2.out"
                    })
                })
            }
        })

       
    }, [])

    const petCategories = [
        { img: dogs, name: "Dogs" },
        { img: cats, name: "Cats" },
        { img: birds, name: "Birds" },
        { img: rabbit, name: "Rabbit" }
    ]

    return (
        <div 
            ref={containerRef}
            className='min-h-screen flex justify-center items-center p-10 BgAbt'
        >
            <div className='text-center mx-auto'>
                <p 
                    ref={titleRef}
                    className='text-[#F04336] text-xl md:text-2xl font-bold mb-3'
                >
                    Explore Our Pet Categories
                </p>
                
                <h2 
                    ref={subtitleRef}
                    className='text-3xl md:text-5xl font-bold text-[#0A303A]'
                >
                    Discover the perfect pet for <br /> your home and heart
                </h2>
                
                <div className='md:flex gap-3 mt-6 md:mt-12 rounded-2xl'>
                    {petCategories.map((pet, index) => (
                        <div
                            key={pet.name}
                            ref={el => cardsRef.current[index] = el}
                            className='w-72 h-56 shadow-2xl mb-3 cursor-pointer overflow-hidden'
                        >
                            <img 
                                className='h-56 box-content rounded-2xl w-full object-cover'
                                src={pet.img} 
                                alt={pet.name}
                            />
                            <h4 className='text-xl bg-[#0A303A] rounded-3xl mt-3 text-white py-2'>
                                {pet.name}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;