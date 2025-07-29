"use client";
import img from '../../assets/images/breadcrumb_bg.jpg'
import React, { useState, useMemo, useEffect } from "react";
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
import UseAxios from "../../Hooks/UseAxios";

import SectionCover from '../../Components/SectionCover/SectionCover'
import { Link } from 'react-router-dom';




const categories = ["All", "Dog", "Cat", "Bird", "Rabbit", "Other"];

export default function PetList() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [pets, setPets] = useState([]);
    const AxiosSecure = UseAxios()


    useEffect(() => {

        AxiosSecure.get('/pets')
            .then(res => {
                console.log(res.data)
                setPets(res.data)
            })
    }, [AxiosSecure])


    const filteredPets = useMemo(() => {
        return pets.filter((pet) => {
            const matchesSearch =
                pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
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
        <div className="min-h-screen -mt-8">

            <SectionCover title={'Petlist'} subtitle={'Browse loving companions waiting for a second chance and a forever family'} image={img} ></SectionCover>

            {/* Header */}
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
                                    Find Your Perfect Pet
                                </h1>
                                <p className="text-base-content/70">
                                    {filteredPets.length} adorable pets waiting for homes
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

                            <button
                                className="btn btn-outline"
                                onClick={() => setShowFilters(!showFilters)}
                                style={{ borderColor: "#F04336", color: "#F04336" }}
                            >
                                <FiFilter />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 border-t border-base-200 mt-6">
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                className={`btn btn-sm ${selectedCategory === category ? "btn-active" : "btn-outline"
                                                    }`}
                                                onClick={() => setSelectedCategory(category)}
                                                style={{
                                                    backgroundColor: selectedCategory === category ? "#F04336" : "transparent",
                                                    borderColor: "#F04336",
                                                    color: selectedCategory === category ? "white" : "#F04336",
                                                }}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Pet Grid/List */}
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
                                        src={pet.image || "/placeholder.svg"}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                    />
                                </figure>

                                <div className="card-body">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="card-title text-xl" style={{ color: "#0A303A" }}>
                                                {pet.name}
                                            </h2>
                                            <p className="text-base-content/70 font-medium">{pet.breed}</p>
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

                                    <p className="text-sm text-base-content/80 line-clamp-2">{pet.description}</p>

                                    <div className="flex flex-wrap gap-2 my-3">
                                        <div className="badge badge-outline gap-1">
                                            <MdCake className="text-sm" />
                                            {pet.age}
                                        </div>
                                        <div className="badge badge-outline gap-1">
                                            {pet.gender === "Male" ? <MdMale /> : <MdFemale />}
                                            {pet.gender}
                                        </div>
                                        <div className="badge badge-outline gap-1">
                                            <FiMapPin className="text-sm" />
                                            {pet.location}
                                        </div>
                                    </div>

                                    <div className="card-actions justify-between items-center">
                                        <div className="flex items-center gap-1 text-xs text-base-content/60">
                                            <FiCalendar />
                                            Added {new Date(pet.dateAdded).toLocaleDateString()}
                                        </div>
                                        <Link to={`/petDetails/${pet._id}`}>
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
                                                Adopt Me
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
                            No pets found
                        </h3>
                        <p className="text-base-content/70 mb-4">Try adjusting your search or filters to find more pets</p>
                        <button
                            className="btn"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            style={{
                                backgroundColor: "#F04336",
                                borderColor: "#F04336",
                                color: "white",
                            }}
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Floating Action Button */}
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
}
