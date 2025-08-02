import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Edit3, 
  Play, 
  Pause, 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Eye,
  X,
  User,
  Clock,
  Target,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const MyDonationCampaigns = () => {
  // Mock data for demonstration
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      petName: "Bella",
      petImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&h=150&fit=crop&crop=face",
      maxAmount: 5000,
      currentAmount: 3200,
      isActive: true,
      createdDate: "2024-07-15",
      endDate: "2024-08-30",
      donators: [
        { id: 1, name: "Sarah Johnson", amount: 500, date: "2024-07-20", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop&crop=face" },
        { id: 2, name: "Mike Chen", amount: 1200, date: "2024-07-22", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" },
        { id: 3, name: "Emma Davis", amount: 800, date: "2024-07-25", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" },
        { id: 4, name: "John Smith", amount: 700, date: "2024-07-28", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" }
      ]
    },
    {
      id: 2,
      petName: "Max",
      petImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop&crop=face",
      maxAmount: 3500,
      currentAmount: 3500,
      isActive: true,
      createdDate: "2024-06-10",
      endDate: "2024-08-15",
      donators: [
        { id: 1, name: "Lisa Wilson", amount: 1500, date: "2024-06-15", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face" },
        { id: 2, name: "David Brown", amount: 2000, date: "2024-06-20", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" }
      ]
    },
    {
      id: 3,
      petName: "Luna",
      petImage: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop&crop=face",
      maxAmount: 4200,
      currentAmount: 1800,
      isActive: false,
      createdDate: "2024-07-01",
      endDate: "2024-09-01",
      donators: [
        { id: 1, name: "Anna Taylor", amount: 900, date: "2024-07-05", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face" },
        { id: 2, name: "Robert Lee", amount: 900, date: "2024-07-10", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=50&h=50&fit=crop&crop=face" }
      ]
    },
    {
      id: 4,
      petName: "Charlie",
      petImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150&h=150&fit=crop&crop=face",
      maxAmount: 2800,
      currentAmount: 450,
      isActive: true,
      createdDate: "2024-07-28",
      endDate: "2024-09-15",
      donators: [
        { id: 1, name: "Grace Kim", amount: 450, date: "2024-07-30", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face" }
      ]
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showDonatorsModal, setShowDonatorsModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };

  const toggleCampaignStatus = (campaignId) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        const newStatus = !campaign.isActive;
        showNotification(
          'success', 
          `Campaign ${newStatus ? 'resumed' : 'paused'} successfully`
        );
        return { ...campaign, isActive: newStatus };
      }
      return campaign;
    }));
  };

  const handleEditCampaign = (campaignId) => {
    showNotification('info', `Redirecting to edit campaign ${campaignId}...`);
    // In real app: navigate to edit page
    console.log(`Navigate to /edit-donation/${campaignId}`);
  };

  const openDonatorsModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonatorsModal(true);
  };

  const getProgressPercentage = (current, max) => {
    return Math.min((current / max) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (campaign) => {
    const percentage = getProgressPercentage(campaign.currentAmount, campaign.maxAmount);
    const isExpired = new Date(campaign.endDate) < new Date();
    
    if (percentage >= 100) {
      return <div className="badge badge-success gap-1"><CheckCircle className="w-3 h-3" />Completed</div>;
    }
    if (isExpired) {
      return <div className="badge badge-error gap-1"><AlertCircle className="w-3 h-3" />Expired</div>;
    }
    if (!campaign.isActive) {
      return <div className="badge badge-warning gap-1"><Pause className="w-3 h-3" />Paused</div>;
    }
    return <div className="badge badge-info gap-1"><Clock className="w-3 h-3" />Active</div>;
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d343e] via-[#104958] to-[#0A303A] relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-teal-400/10 rounded-full blur-xl"
        animate={floatingAnimation}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
      />

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className={`alert ${
              notification.type === 'success' ? 'alert-success' : 
              notification.type === 'error' ? 'alert-error' : 'alert-info'
            } shadow-lg max-w-sm`}>
              <div className="flex items-center gap-2">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
                {notification.type === 'info' && <Eye className="w-5 h-5" />}
                <span className="text-sm">{notification.message}</span>
                <button 
                  onClick={() => setNotification({ show: false, type: '', message: '' })}
                  className="btn btn-ghost btn-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
                My Donation Campaigns
              </h1>
            </div>
            <p className="text-teal-100/80 text-lg max-w-2xl mx-auto">
              Manage and track your pet donation campaigns. Monitor progress, view supporters, and make updates as needed.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{campaigns.length}</p>
                  <p className="text-teal-200 text-sm">Total Campaigns</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {campaigns.filter(c => getProgressPercentage(c.currentAmount, c.maxAmount) >= 100).length}
                  </p>
                  <p className="text-teal-200 text-sm">Completed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Play className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {campaigns.filter(c => c.isActive).length}
                  </p>
                  <p className="text-teal-200 text-sm">Active</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    ${campaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}
                  </p>
                  <p className="text-teal-200 text-sm">Total Raised</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Campaigns Table */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-teal-500/20 text-teal-100">
                    <th className="text-left">Pet Info</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Progress</th>
                    <th className="text-center">Donators</th>
                    <th className="text-center">End Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign, index) => {
                    const progressPercentage = getProgressPercentage(campaign.currentAmount, campaign.maxAmount);
                    const progressColor = getProgressColor(progressPercentage);
                    
                    return (
                      <motion.tr 
                        key={campaign.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        {/* Pet Info */}
                        <td>
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-16 h-16 rounded-xl">
                                <img src={campaign.petImage} alt={campaign.petName} className="object-cover" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-white text-lg">{campaign.petName}</h3>
                              <p className="text-teal-200 text-sm">Created: {new Date(campaign.createdDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="text-center">
                          {getStatusBadge(campaign)}
                        </td>

                        {/* Progress */}
                        <td className="text-center">
                          <div className="w-32 mx-auto">
                            <div className="flex justify-between text-sm text-teal-200 mb-1">
                              <span>${campaign.currentAmount.toLocaleString()}</span>
                              <span>${campaign.maxAmount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full ${progressColor} rounded-full relative`}
                              >
                                {progressPercentage >= 100 && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                )}
                              </motion.div>
                            </div>
                            <p className="text-xs text-teal-300 mt-1">{progressPercentage.toFixed(1)}%</p>
                          </div>
                        </td>

                        {/* Donators */}
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Users className="w-4 h-4 text-teal-300" />
                            <span className="text-white font-semibold">{campaign.donators.length}</span>
                          </div>
                        </td>

                        {/* End Date */}
                        <td className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="w-4 h-4 text-teal-300" />
                            <span className="text-teal-200 text-sm">
                              {new Date(campaign.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            {/* Pause/Resume Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleCampaignStatus(campaign.id)}
                              className={`btn btn-sm ${campaign.isActive ? 'btn-warning' : 'btn-success'} btn-circle`}
                              title={campaign.isActive ? 'Pause Campaign' : 'Resume Campaign'}
                            >
                              {campaign.isActive ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </motion.button>

                            {/* Edit Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEditCampaign(campaign.id)}
                              className="btn btn-sm btn-info btn-circle"
                              title="Edit Campaign"
                            >
                              <Edit3 className="w-4 h-4" />
                            </motion.button>

                            {/* View Donators Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => openDonatorsModal(campaign)}
                              className="btn btn-sm btn-primary btn-circle"
                              title="View Donators"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {campaigns.length === 0 && (
            <motion.div 
              variants={itemVariants}
              className="text-center py-16"
            >
              <Heart className="w-16 h-16 text-teal-300 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl text-teal-200 mb-2">No campaigns yet</h3>
              <p className="text-teal-300/60">Start by creating your first donation campaign!</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Donators Modal */}
      <AnimatePresence>
        {showDonatorsModal && selectedCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDonatorsModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-xl">
                        <img src={selectedCampaign.petImage} alt={selectedCampaign.petName} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Donators for {selectedCampaign.petName}
                      </h3>
                      <p className="text-teal-200">
                        {selectedCampaign.donators.length} supporters • 
                        ${selectedCampaign.currentAmount.toLocaleString()} raised
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDonatorsModal(false)}
                    className="btn btn-ghost btn-circle"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {selectedCampaign.donators.length > 0 ? (
                  <div className="space-y-4">
                    {selectedCampaign.donators.map((donator, index) => (
                      <motion.div
                        key={donator.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full">
                              <img src={donator.avatar} alt={donator.name} />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{donator.name}</h4>
                            <p className="text-teal-300 text-sm">
                              Donated on {new Date(donator.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-400 font-bold">
                            <DollarSign className="w-4 h-4" />
                            {donator.amount.toLocaleString()}
                          </div>
                          <div className="badge badge-success badge-sm">
                            <Award className="w-3 h-3 mr-1" />
                            Supporter
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-teal-300 mx-auto mb-4 opacity-50" />
                    <h4 className="text-lg text-teal-200 mb-2">No donations yet</h4>
                    <p className="text-teal-300/60">Be patient, supporters will come!</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/20 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="text-teal-200">
                    <span className="text-sm">Total Amount Raised</span>
                    <div className="text-2xl font-bold text-white">
                      ${selectedCampaign.currentAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right text-teal-200">
                    <span className="text-sm">Goal</span>
                    <div className="text-xl font-bold text-white">
                      ${selectedCampaign.maxAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyDonationCampaigns;