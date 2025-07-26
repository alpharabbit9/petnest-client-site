import './Navbar.css'
import logo from '../../assets/images/icons8-cat-footprint-48.png'
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const links = <>

        <NavLink
            to="/"
            className={({ isActive }) =>
                isActive ? 'bg-[#F04336] text-white font-bold rounded px-3 py-1' : ''
            }
        >
            <li><a>Home</a></li>
        </NavLink>

        <NavLink
            to="/about"
            className={({ isActive }) =>
                isActive ? 'bg-[#F04336] text-white font-bold  rounded px-3 py-1' : ''
            }
        >
            <li><a>About</a></li>
        </NavLink>

        <NavLink
            to="/contact"
            className={({ isActive }) =>
                isActive ? 'bg-[#F04336] text-white font-bold rounded px-3 py-1' : ''
            }
        >
            <li><a>Contact</a></li>
        </NavLink>
    </>
    return (
        <div className="relative z-10">
            {/* Navbar */}
            <div className="navbar navBg text-black  md:px-12 md:py-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn logo btn-ghost font-bold text-2xl text-[#F04336]">
                        <img className='w-11' src={logo} alt="" />
                        PETNEST</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>

            {/* Wavy Bottom */}

        </div>
    );
};

export default Navbar;
