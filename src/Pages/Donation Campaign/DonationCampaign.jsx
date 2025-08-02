import { useState, useMemo, useEffect } from 'react';
import img from '../../assets/images/breadcrumb_bg.jpg'
import SectionCover from '../../Components/SectionCover/SectionCover';
import UseAxios from '../../Hooks/UseAxios';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
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

const DonationCampaign = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [pets, setPets] = useState([]);
    const AxiosSecure = UseAxios();


    useEffect(() => {

        AxiosSecure.get('/donations')
            .then(res => {
                console.log(res.data)
                setPets(res.data)
            })
    }, [AxiosSecure])


    const filteredPets = useMemo(() => {
        return pets.filter((pet) => {
            const name = pet.petName?.toLowerCase() || "";
            const breed = pet.breed?.toLowerCase() || "";
            const matchesSearch =
                name.includes(searchTerm.toLowerCase()) ||
                breed.includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" || pet.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, pets]);


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

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
        <div className='min-h-screen -mt-8'>

            <SectionCover title={'Donation'} image={img} ></SectionCover>

            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm border-b border-base-200 "
            >
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Title */}
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full" style={{ backgroundColor: "#F04336" }}>
                                <MdPets className="text-2xl text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: "#0A303A" }}>
                                    Support Our Furry Friends
                                </h1>
                                <p className="text-base-content/70">
                                    {filteredPets.length} adorable pets waiting for better life
                                </p>
                            </div>
                        </div>

                        {/* Search + View Mode + Filters */}
                        <div className="flex items-center gap-4">


                            <div className="join">
                                <button
                                    className={`btn join-item ${viewMode === "grid" ? "btn-active" : ""}`}
                                    onClick={() => setViewMode("grid")}
                                    style={{
                                        backgroundColor: viewMode === "grid" ? "#F04336" : "transparent",
                                        borderColor: "#F04336",
                                        color: viewMode === "grid" ? "white" : "#F04336",
                                    }}
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    className={`btn join-item ${viewMode === "list" ? "btn-active" : ""}`}
                                    onClick={() => setViewMode("list")}
                                    style={{
                                        backgroundColor: viewMode === "list" ? "#F04336" : "transparent",
                                        borderColor: "#F04336",
                                        color: viewMode === "list" ? "white" : "#F04336",
                                    }}
                                >
                                    <FiList />
                                </button>
                            </div>


                        </div>
                    </div>


                </div>
            </motion.div>

            <div className="container mx-auto px-8 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={
                        viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            : "space-y-4"
                    }
                >
                    <AnimatePresence>
                        {filteredPets.map((pet) => (
                            <motion.div
                                key={pet.id}
                                variants={itemVariants}
                                layout
                                className={`card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 ${viewMode === "list" ? "card-side" : ""
                                    }`}
                                whileHover={{ y: -5 }}
                            >
                                <figure className={viewMode === "list" ? "w-48 h-48" : "h-64"}>
                                    <img
                                        src={pet.petImage || "/placeholder.svg"}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                    />
                                </figure>

                                <div className="card-body">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="card-title text-xl" style={{ color: "#0A303A" }}>
                                                {pet.petName}
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

                                    <p className="text-sm text-base-content/80 line-clamp-2">{pet.shortDescription}</p>

                                    <div className="flex flex-wrap gap-2 my-3">
                                        <div className="badge badge-outline gap-1 bg-[#0A303A] text-white">
                                            <p>Last Date : </p>
                                            {pet.lastDate}
                                        </div>
                                        <div className="badge badge-outline gap-1">
                                            {pet.gender === "Male" ? <MdMale /> : <MdFemale />}
                                            {pet.gender}
                                        </div>
                                       
                                    </div>

                                    <div className="card-actions justify-between items-center">
                                        <div className="flex items-center gap-1 text-xs text-base-content/60">
                                            <FiCalendar />
                                            Added {new Date(pet.dateAdded).toLocaleDateString()}
                                        </div>
                                        <Link to={`/donationDetails/${pet._id}`}>
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
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* No Results */}
                {filteredPets.length === 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                        <div className="p-8 rounded-full mx-auto w-fit mb-4" style={{ backgroundColor: "#F04336" }}>
                            <MdPets className="text-4xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2" style={{ color: "#0A303A" }}>
                            No Campaigns found
                        </h3>
                        <p className="text-base-content/70 mb-4">Try adjusting your search or filters to find more pets</p>

                    </motion.div>
                )}
            </div>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="fixed bottom-6 right-6"
            >
                <button
                    className="btn btn-circle btn-lg shadow-lg"
                    style={{
                        backgroundColor: "#F04336",
                        borderColor: "#F04336",
                        color: "white",
                    }}
                >
                    <FiHeart className="text-xl" />
                </button>
            </motion.div>




        </div>
    );
};

export default DonationCampaign;