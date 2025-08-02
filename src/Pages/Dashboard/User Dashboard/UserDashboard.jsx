import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuHandHelping } from "react-icons/lu";
import { FaPaw , FaHandsHelping } from "react-icons/fa";
import { GiPawHeart } from "react-icons/gi";
import { GiCash } from "react-icons/gi";
import AddPet from './AddPet';
import MyAddedPets from './MyAddedPets';
import CreateDonation from './CreateDonation';
import MyDonationCampaigns from './MyDonationCampaigns';
import MyDonations from './MyDonations';
import {
  User,
  TrendingUp,
  ClipboardList,
  Settings,
  LogOut,
  Download,
  Calendar,
  Trophy,
  GraduationCap,
  Clock,
  Book,
  Home
} from 'lucide-react';


const UserDashboard = () => {

    const [activeRoute, setActiveRoute] = useState('results');
    const { user , userLogOut } = useContext(AuthContext);
    const [currentStudent, setCurrentStudent] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [cgpa, setCgpa] = useState(null);

    const handleRouteChange = (route) => {
        setActiveRoute(route);
        setSidebarOpen(false);
    };

    const sidebarItemVariants = {
        hover: { x: 5, transition: { duration: 0.2 } },
        tap: { scale: 0.98 }
    };


    const renderContent = () => {
        switch (activeRoute) {
            case 'addPet':
                return <AddPet></AddPet>;
            case 'myAddedPet':
                return <MyAddedPets></MyAddedPets>;
            case 'createDonation':
                return <CreateDonation></CreateDonation>;
            case 'myDonationCampaign':
                return <MyDonationCampaigns></MyDonationCampaigns>; // Replace with actual component
            
            default:
                return <AddPet></AddPet>;
        }
    };





    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.div
                className={`bg-[#0A303A] text-white min-h-screen shadow-lg z-40 fixed top-0 left-0 w-64 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative`}
            >
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold flex gap-2  items-center ">
                        <FaPaw className='text-[#F04336]'></FaPaw>
                        Paw Connect</h1>
                    <p className='text-xs'>Dashboard</p>
                </div>

                <motion.div
                    className="p-6 border-b "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-11 rounded-full flex items-center justify-center">
                            <img className='rounded-full' src={user?.photoURL} alt="" />
                        </div>
                        <div>
                            <p className="font-medium">{user?.displayName}</p>
                            <p className="text-sm ">{user?.email}</p>
                        </div>
                    </div>
                </motion.div>

                <nav className="p-4 space-y-1">
                    {[
                        { icon: <FaPaw />, label: 'Add Pet', key: 'addPet' },
                        { icon: <GiPawHeart />, label: 'My Added Pet', key: 'myAddedPet' },
                        { icon: <FaHandsHelping />, label: 'Create Donation', key: 'createDonation' },
                        { icon: <LuHandHelping />, label: 'Donation Campaign', key: 'myDonationCampaign' },
                       
                    ].map(item => (
                        <motion.button
                            key={item.key}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeRoute === item.key
                                ? 'bg-[#2a778d] border-l-4 '
                                : 'hover:bg-[#0A303A]'}`}
                            variants={sidebarItemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => handleRouteChange(item.key)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </motion.button>
                    ))}

                    <motion.button
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F04336] transition-colors"
                        variants={sidebarItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => navigate('/')}
                    >
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                    </motion.button>

                    <motion.button
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F04336] transition-colors"
                        variants={sidebarItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() =>{
                            userLogOut()
                            navigate('/')
                        }}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </motion.button>
                </nav>
            </motion.div>

            {/* Content */}
            <div className="flex-1">
                <div className="lg:hidden p-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-emerald-800 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <div className="">
                    <AnimatePresence mode="wait">
                        <div key={activeRoute}>
                            {renderContent()}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;