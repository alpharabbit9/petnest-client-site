import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, Trash2, Shield, GraduationCap, User, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';

const AllDonations = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [error, setError] = useState(null);
    const [adminButton, setAdminButton] = useState(true);
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Calculate pagination values
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedRole]);

    // Fetch users from API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://petnest-server-site.vercel.app/donations');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (err) {
            setError(err.message);
            // Fallback mock data for demonstration
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john.doe@university.edu', role: 'admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 2, name: 'Jane Smith', email: 'jane.smith@university.edu', role: 'faculty', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
                { id: 3, name: 'Mike Johnson', email: 'mike.johnson@university.edu', role: 'user', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@university.edu', role: 'faculty', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                { id: 5, name: 'David Brown', email: 'david.brown@university.edu', role: 'user', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 6, name: 'Emily Davis', email: 'emily.davis@university.edu', role: 'admin', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face' },
                { id: 7, name: 'Alex Thompson', email: 'alex.thompson@university.edu', role: 'user', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
                { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@university.edu', role: 'faculty', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
                { id: 9, name: 'Chris Martinez', email: 'chris.martinez@university.edu', role: 'user', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
                { id: 10, name: 'Rachel Green', email: 'rachel.green@university.edu', role: 'admin', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
                { id: 11, name: 'Tom Wilson', email: 'tom.wilson@university.edu', role: 'user', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
                { id: 12, name: 'Anna Clark', email: 'anna.clark@university.edu', role: 'faculty', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face' }
            ];
            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
        } finally {
            setLoading(false);
        }
    };

    // Filter users based on search term and role
    useEffect(() => {
        let filtered = users;

        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedRole !== 'all') {
            filtered = filtered.filter(user => user.role === selectedRole);
        }

        setFilteredUsers(filtered);
    }, [users, searchTerm, selectedRole]);

    // Pagination functions
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const half = Math.floor(maxVisiblePages / 2);
            let start = Math.max(1, currentPage - half);
            let end = Math.min(totalPages, start + maxVisiblePages - 1);
            
            if (end - start + 1 < maxVisiblePages) {
                start = Math.max(1, end - maxVisiblePages + 1);
            }
            
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
        }
        
        return pageNumbers;
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin':
                return <Shield className="w-4 h-4 text-red-500" />;
            case 'faculty':
                return <GraduationCap className="w-4 h-4 text-blue-500" />;
            default:
                return <User className="w-4 h-4 text-green-500" />;
        }
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'admin':
                return 'badge-error';
            case 'faculty':
                return 'badge-info';
            default:
                return 'badge-success';
        }
    };

   

    const HandleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://petnest-server-site.vercel.app/donations/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            toast.success('User Deleted');
                        }
                        fetchUsers();
                    });
            }
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        hover: {
            y: -5,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-blue-800 via-teal-600 to-cyan-700 flex items-center justify-center">
                <div className="text-center">
                    <div className="loading loading-spinner loading-lg text-white mb-4"></div>
                    <div className="text-white text-lg">Loading Donation Campaigns...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0d343e] via-[#104958] to-[#0A303A] p-4 md:p-8 ">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                        Manage Donations
                    </h1>
                    <p className="text-emerald-100 text-lg">
                        Keep track donation of your furry friends and their details with ease.
                    </p>
                </motion.div>

                {/* Controls */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search Campaign..."
                                className="input input-bordered w-full pl-10 bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Items per page selector */}
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="text-sm">Show:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                                className="select select-bordered select-sm bg-white/20 border-white/30 text-white focus:border-white/50"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-2 text-white/90">
                            <Users className="w-5 h-5" />
                            <span className="font-semibold">{filteredUsers.length} Campaigns</span>
                        </div>
                    </div>
                </motion.div>

                {/* Users Table */}
                <motion.div variants={itemVariants} className="overflow-x-auto  ">
                    <AnimatePresence>
                        <table className="table w-full text-white border  border-white/20 backdrop-blur-md">
                            <thead>
                                <tr className='text-white'>
                                    <th>Campaign Name</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        whileHover="hover"
                                        className="hover:bg-white/10 transition-all duration-300"
                                    >
                                        {/* User Info */}
                                        <td className="flex items-center gap-4 py-4">
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-full ring ring-white/30 ring-offset-2 ring-offset-transparent">
                                                    <img
                                                        src={
                                                            user?.petImage ||
                                                            `https://ui-avatars.com/api/?name=${user.name}&background=random`
                                                        }
                                                        alt={user.name}
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{user.petName}</h3>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="py-4">{user.lastDate}</td>

                                        {/* Actions */}
                                        <td className="py-4">
                                            <div className="flex gap-2">
                                                <motion.button
                                                    disabled={user.role === 'admin'}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="btn btn-sm bg-blue-500/80 hover:bg-blue-500 text-white border-none"
                                                >
                                                    <Shield className="w-4 h-4" />
                                                    Update
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => HandleDelete(user._id)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="btn btn-sm bg-red-600/80 hover:bg-red-600 text-white border-none"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        variants={itemVariants}
                        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mt-8 border border-white/20"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Pagination Info */}
                            <div className="text-white/90 text-sm">
                                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center gap-2">
                                {/* Previous Button */}
                                <motion.button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-sm bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </motion.button>

                                {/* Page Numbers */}
                                {getPageNumbers().map((pageNumber) => (
                                    <motion.button
                                        key={pageNumber}
                                        onClick={() => goToPage(pageNumber)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`btn btn-sm ${
                                            currentPage === pageNumber
                                                ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500'
                                                : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                                        }`}
                                    >
                                        {pageNumber}
                                    </motion.button>
                                ))}

                                {/* Next Button */}
                                <motion.button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-sm bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {filteredUsers.length === 0 && !loading && (
                    <motion.div
                        variants={itemVariants}
                        className="text-center py-16"
                    >
                        <div className="text-white/60 mb-4">
                            <Users className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No pets found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    </motion.div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        variants={itemVariants}
                        className="alert alert-warning bg-yellow-500/20 border-yellow-500/30 text-white mb-6"
                    >
                        <div>
                            <span>⚠️ Could not fetch users from API. Showing demo data instead.</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default AllDonations;