import { FaBirthdayCake, FaCalendar, FaDollarSign, FaHeart, FaPaw, FaTransgenderAlt } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { useContext, useEffect, useState } from 'react';
import UseAxios from '../../../Hooks/UseAxios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import {
    FiSearch,
    FiFilter,
    FiHeart,
    FiMapPin,
    FiCalendar,
    FiUser,
    FiGrid,
    FiList,
} from "react-icons/fi";
import { MdPets, MdCake, MdMale, MdFemale } from "react-icons/md";
import { Link } from 'react-router-dom';

const DonationDetails = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext)
    const [viewMode, setViewMode] = useState("grid");
    const AxiosSecure = UseAxios();
    const [pet, setPet] = useState([]);
    const [petsCard, setPetsCard] = useState([]);
    const currentDonationId = id;

    useEffect(() => {


        AxiosSecure.get(`/donation/${id}`)
            .then(res => {
                // console.log(res.data)
                setPet(res.data)
            })

    }, [AxiosSecure, id])



    useEffect(() => {

        AxiosSecure.get(`/donation`)
            .then(res => {
                // console.log(res.data)
                setPetsCard(res.data)
            })


    }, [AxiosSecure])


    const recommendedDonations = petsCard
        .filter(card => card.id !== currentDonationId) // exclude current donation
        .sort((a, b) => b.maxDonation - a.maxDonation) // sort by maxDonation (highest first)
        .slice(0, 3); // take top 3

    console.log(recommendedDonations);




    const HandleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const amount = form.amount.value;


        console.log(name, amount)

        const donationData = {

            donation_id: id,
            name,
            amount
        }


        AxiosSecure.post('/donation/amount', donationData)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    toast.success('Donation Successful')
                }
            })




    }


    

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };
    return (
        <div className='min-h-screen -mt-8 p-12 Bg'>


            <div className='text-[#0A303A] flex justify-between px-6'>
                <div>
                    <h2 className="text-3xl font-bold">{pet.petName}</h2>
                    <p>{pet.location}</p>
                </div>
                <div className='flex gap-2'>
                    <FaHeart className='text-3xl'></FaHeart>
                    <IoShareSocialOutline className='text-3xl' />

                </div>
            </div>

            <div className="divider"></div>


            <div className='flex gap-3 mb-6'>
                <div className='md:w-1/2'>
                    <img className='rounded-2xl w-full h-full object-cover' src={pet.petImage} alt="" />
                </div>

                <div className=' border border-gray-400 rounded-2xl flex-1 p-8 '>

                    <div className='p-6'>
                        <div className='flex justify-between p-5'>
                            <div>
                                <p
                                    className='flex gap-2 text-xs'
                                ><FaCalendar className='text-xs text-[#F04336]'></FaCalendar> Last Donation Date</p>
                                <p className='text-lg font-bold'>{pet.lastDate}</p>
                            </div>
                            <div>
                                <p
                                    className='flex gap-2 text-xs'
                                ><FaDollarSign className='text-xs text-[#F04336]'></FaDollarSign>Max Donation Amount</p>
                                <p className='text-lg font-bold'>{pet.maxDonation} $ </p>
                            </div>
                        </div>
                    </div>

                    <div className='p-5'>
                        <p className='text-xl font-bold'>About {pet.name}</p>
                        <p className='text-gray-600'>{pet.longDescription}</p>
                    </div>

                    <form onSubmit={HandleSubmit}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Donator Name</legend>
                            <input name='name' defaultValue={user?.displayName} type="text" className="input w-full rounded-2xl" placeholder="Type here" />
                            <legend className="fieldset-legend">Amount $ </legend>
                            <input name='amount' type="text" className="input rounded-2xl w-full" placeholder="Type here" />
                            <button className='btn mt-3 bg-[#F04336] text-white w-full rounded-2xl'>Donate</button>

                        </fieldset>
                    </form>

                </div>
            </div>


            <div className='py-5 text-[#0A303A]'>
                <h3 className='text-3xl font-bold'>Donation Campaigns you might like </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 mb-4'>
                    {
                        recommendedDonations.map(item =>
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                layout
                                className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ${viewMode === "list" ? "card-side" : ""
                                    }`}
                                whileHover={{ y: -5 }}
                            >
                                <figure className={viewMode === "list" ? "w-48 h-48" : "h-64"}>
                                    <img
                                        src={item.petImage || "/placeholder.svg"}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                    />
                                </figure>

                                <div className="card-body">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="card-title text-xl" style={{ color: "#0A303A" }}>
                                                {item.petName}
                                            </h2>

                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="btn btn-ghost btn-circle"
                                            style={{ color: "#F04336" }}
                                        >
                                            <FiHeart className="text-xl" />
                                        </motion.button>
                                    </div>

                                    <p className="text-sm text-base-content/80 line-clamp-2">{item.shortDescription}</p>

                                    <div className="flex flex-wrap gap-2 my-3">
                                        <div className="badge badge-outline gap-1 bg-[#0A303A] text-white">
                                            <p>Last Date : </p>
                                            {item.lastDate}
                                        </div>
                                        

                                    </div>

                                    <div className="card-actions justify-between items-center">
                                        <div className="flex items-center gap-1 text-xs text-base-content/60">
                                            <FiCalendar />
                                            Added {new Date(pet.dateAdded).toLocaleDateString()}
                                        </div>
                                        <Link to={`/donationDetails/${item._id}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn btn-sm"
                                                style={{
                                                    backgroundColor: "#F04336",
                                                    borderColor: "#F04336",
                                                    color: "white",
                                                }}
                                            >
                                                <FiUser className="mr-1" />
                                                Donate
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default DonationDetails;