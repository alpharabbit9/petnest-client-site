import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Users, Trash2, Shield, GraduationCap, User, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [error, setError] = useState(null);
  const [adminButton, setAdminButton] = useState(true)
  

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://petnest-server-site.vercel.app/users');
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
        { id: 6, name: 'Emily Davis', email: 'emily.davis@university.edu', role: 'admin', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face' }
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


  const HandleAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`https://petnest-server-site.vercel.app/users/admin/${id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Role Set to Admin");
              setAdminButton(false);

              // ✅ Refresh users after success
              fetchUsers();
            }
          })
          .catch((err) => {
            toast.error("Failed to update role");
          });
      }
    });
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

                axios.delete(`https://petnest-server-site.vercel.app/users/${id}`)
                    .then(res => {

                        if (res.data.deletedCount > 0) {

                           toast.success('User Deleted')

                        }

                        fetchUsers()
                    })

            }
        });

    }


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
          <p className="text-white text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0d343e] via-[#104958] to-[#0A303A] p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            User Management
          </h1>
          <p className="text-emerald-100 text-lg">
            Manage university users, roles, and permissions
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
                placeholder="Search users..."
                className="input input-bordered w-full pl-10 bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-white/70 w-5 h-5" />
              <select
                className="select select-bordered bg-white/20 border-white/30 text-white focus:border-white/50"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all" className="text-gray-800">All Roles</option>
                <option value="admin" className="text-gray-800">Admin</option>
                <option value="user" className="text-gray-800">Users</option>
                
              </select>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-5 h-5" />
              <span className="font-semibold">{filteredUsers.length} users</span>
            </div>
          </div>
        </motion.div>

        {/* Users Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover="hover"
                className="card bg-white/15 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body p-6">
                  {/* User Avatar & Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-white/30 ring-offset-2 ring-offset-transparent">
                        <img
                          src={user?.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
                          alt={user.name}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                      <p className="text-white/80 text-sm">{user.email}</p>
                    </div>
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-sm text-white/70 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </label>
                    </div>
                  </div>

                  {/* Role Badge */}
                  {/* <div className="mb-4">
                    <div className={`badge ${getRoleBadgeClass(user.role)} gap-2 text-white`}>
                      {getRoleIcon(user.role)}
                      {user?.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  </div> */}

                  {/* Action Buttons */}
                  <div className="card-actions justify-between">
                    <div className="flex gap-2">
                      <motion.button
                        disabled={user.role === 'admin'}
                        onClick={() => HandleAdmin(user._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-sm bg-red-500/80 hover:bg-red-500 text-white border-none"
                      >
                        <Shield className="w-4 h-4" />
                        Admin
                      </motion.button>
                     
                    </div>
                    <motion.button
                    onClick={() => HandleDelete(user._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-sm bg-red-600/80 hover:bg-red-600 text-white border-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredUsers.length === 0 && !loading && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <div className="text-white/60 mb-4">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No users found</h3>
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

export default UserManagement;