import './Navbar.css'
import logo from '../../assets/images/icons8-cat-footprint-48.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, userLogOut } = useContext(AuthContext);
    const navigate = useNavigate()

    // GSAP animations on mount
    useEffect(() => {
        const tl = gsap.timeline();

        // Navbar slide down animation
        tl.fromTo(navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
            // Logo bounce in
            .fromTo(logoRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
                "-=0.4"
            )
            // Stagger links animation
            .fromTo(linksRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
                "-=0.3"
            );

        // Floating animation for logo
        gsap.to(logoRef.current, {
            y: -5,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
    }, []);

    const linkVariants = {
        initial: {
            scale: 1,
            y: 0
        },
        hover: {
            scale: 1.05,
            y: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.95
        }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            scale: 0.95
        },
        open: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    };

    const hamburgerVariants = {
        closed: {
            rotate: 0
        },
        open: {
            rotate: 180,
            transition: {
                duration: 0.3
            }
        }
    };

    const NavLinkComponent = ({ to, children, index }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? 'bg-[#F04336] text-white font-bold rounded-bl-box rounded-tr-box px-3 py-1' : ''
            }
        >
            <motion.li
                ref={el => linksRef.current[index] = el}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="relative cursor-pointer"
            >
                <motion.a
                    className="relative overflow-hidden block"
                    whileHover={{
                        color: "#F04336"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                    {/* Underline animation */}
                    <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-[#F04336]"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.a>
            </motion.li>
        </NavLink>
    );

    const links = (
        <>
            <NavLinkComponent to="/" index={0}>Home</NavLinkComponent>
            <NavLinkComponent to="/about" index={1}>About</NavLinkComponent>
            <NavLinkComponent to="/contact" index={2}>Contact</NavLinkComponent>
            <NavLinkComponent to="/petlist" index={2}>Pet List</NavLinkComponent>
        </>
    );

    return (
        <div className="relative z-50">
            {/* Navbar */}
            <motion.div
                ref={navbarRef}
                className="navbar fixed top-0   z-50 navBg text-[#0A303A] font-semibold  md:py-8 py-4 w-full "
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="navbar-start">
                    <div className="dropdown">
                        <motion.div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                            variants={hamburgerVariants}
                            animate={isMenuOpen ? "open" : "closed"}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </motion.div>

                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
                                    variants={mobileMenuVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                >
                                    {links}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.a
                        className="btn logo btn-ghost font-bold text-lg md:text-2xl text-[#F04336] overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.img
                            ref={logoRef}
                            className="w-11"
                            src={logo}
                            alt="PetNest Logo"
                            whileHover={{
                                rotate: 360,
                                transition: { duration: 0.6 }
                            }}
                        />
                        <motion.span
                            className="font-bold"
                            whileHover={{
                                backgroundImage: "linear-gradient(45deg, #F04336, #ff6b5b)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            PawsConnect
                        </motion.span>
                    </motion.a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <motion.ul
                        className="menu menu-horizontal px-1 gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, stagger: 0.1 }}
                    >
                        {links}
                    </motion.ul>
                </div>

                <div className="navbar-end">
                    {user && user?.email ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-13 rounded-full">
                                    <img alt="user" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">Profile <span className="badge">New</span></a>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={() => {
                                    userLogOut();
                                    navigate('/');
                                    toast.success('Logged out successfully')
                                }}><a>Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to={'/login'}>
                            <motion.button
                                className="relative overflow-hidden bg-[#F04336] rounded-2xl px-4 md:px-6 py-2 md:py-3 font-semibold shadow-lg"
                                whileHover="hover"
                                whileTap="tap"
                                initial="initial"
                                variants={{
                                    initial: {
                                        scale: 1,
                                        rotate: 0,
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                                    },
                                    hover: {
                                        scale: 1.05,
                                        rotate: -1,
                                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)"
                                    },
                                    tap: {
                                        scale: 0.95,
                                        rotate: 0
                                    }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17
                                }}
                            >
                                <motion.span
                                    className="relative z-10 text-white"
                                    variants={{
                                        initial: { color: "#ffffff" },
                                        hover: { color: "#ffffff" }
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    Login
                                </motion.span>
                                <motion.span
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0A303A] to-[#1a4a5a]"
                                    variants={{
                                        initial: { width: "0%" },
                                        hover: { width: "100%" }
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    style={{ zIndex: 0 }}
                                />
                                <motion.span
                                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                                    variants={{
                                        initial: { x: "-100%" },
                                        hover: { x: "100%" }
                                    }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    style={{ zIndex: 1 }}
                                />
                            </motion.button>
                        </Link>
                    )}
                </div>
            </motion.div>
        </div>

    );
};

export default Navbar;