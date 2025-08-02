import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Heart, Calendar, DollarSign, FileText, Save, CheckCircle, AlertCircle, X } from 'lucide-react';

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    petPicture: null,
    maxAmount: '',
    lastDate: '',
    shortDescription: '',
    longDescription: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // GSAP-like animations using framer-motion
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Simulate image upload to Cloudinary/imgbb
  const uploadImage = async (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearInterval(interval);
    setUploadProgress(100);
    
    // Simulate successful upload response
    const mockResponse = {
      secure_url: URL.createObjectURL(file),
      public_id: `pet_${Date.now()}`
    };
    
    setIsUploading(false);
    return mockResponse;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('error', 'Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('error', 'Image size should be less than 5MB');
      return;
    }

    try {
      const uploadResult = await uploadImage(file);
      setFormData(prev => ({ ...prev, petPicture: uploadResult }));
      setPreviewImage(uploadResult.secure_url);
      showNotification('success', 'Image uploaded successfully!');
    } catch (error) {
      showNotification('error', 'Failed to upload image. Please try again.');
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, petPicture: null }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.petPicture) {
      newErrors.petPicture = 'Pet picture is required';
    }

    if (!formData.maxAmount || parseFloat(formData.maxAmount) <= 0) {
      newErrors.maxAmount = 'Please enter a valid maximum donation amount';
    }

    if (!formData.lastDate) {
      newErrors.lastDate = 'Last donation date is required';
    } else {
      const selectedDate = new Date(formData.lastDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.lastDate = 'Last donation date must be in the future';
      }
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.length > 150) {
      newErrors.shortDescription = 'Short description must be 150 characters or less';
    }

    if (!formData.longDescription.trim()) {
      newErrors.longDescription = 'Long description is required';
    } else if (formData.longDescription.length < 50) {
      newErrors.longDescription = 'Long description must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('error', 'Please fix the errors before submitting');
      return;
    }

    // Create donation campaign object with current timestamp
    const donationCampaign = {
      ...formData,
      createdAt: new Date().toISOString(),
      createdDate: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString(),
      status: 'active',
      currentAmount: 0,
      donorCount: 0
    };

    console.log('Creating donation campaign:', donationCampaign);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    showNotification('success', 'Donation campaign created successfully!');
    
    // Reset form
    setFormData({
      petPicture: null,
      maxAmount: '',
      lastDate: '',
      shortDescription: '',
      longDescription: ''
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Minimum tomorrow
    return today.toISOString().split('T')[0];
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
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-300/5 rounded-full blur-2xl"
        animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
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
            <div className={`alert ${notification.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg max-w-sm`}>
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
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
          className="max-w-4xl mx-auto"
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
                Create Donation Campaign
              </h1>
            </div>
            <p className="text-teal-100/80 text-lg max-w-2xl mx-auto">
              Help pets find their forever homes by creating a donation campaign. Every contribution makes a difference in their lives.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            ref={formRef}
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Pet Picture Upload */}
                <motion.div variants={itemVariants} className="form-control">
                  <label className="label">
                    <span className="label-text text-teal-100 font-semibold flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Pet Picture *
                    </span>
                  </label>
                  
                  <div className="relative">
                    {!previewImage ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-64 border-2 border-dashed border-teal-300/50 rounded-2xl bg-teal-50/5 hover:bg-teal-50/10 transition-all cursor-pointer flex flex-col items-center justify-center group"
                      >
                        {isUploading ? (
                          <div className="text-center">
                            <div className="loading loading-spinner loading-lg text-teal-400 mb-4"></div>
                            <p className="text-teal-200">Uploading... {uploadProgress}%</p>
                            <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-teal-400 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-teal-300 mb-4 group-hover:scale-110 transition-transform" />
                            <p className="text-teal-200 text-center">
                              <span className="font-semibold">Click to upload</span><br />
                              <span className="text-sm text-teal-300">PNG, JPG up to 5MB</span>
                            </p>
                          </>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <img 
                          src={previewImage} 
                          alt="Pet preview" 
                          className="w-full h-64 object-cover rounded-2xl"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 btn btn-circle btn-sm bg-red-500 hover:bg-red-600 border-none"
                        >
                          <X className="w-4 h-4 text-white" />
                        </motion.button>
                      </motion.div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  {errors.petPicture && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="label"
                    >
                      <span className="label-text-alt text-red-300">{errors.petPicture}</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Maximum Donation Amount */}
                <motion.div variants={itemVariants} className="form-control">
                  <label className="label">
                    <span className="label-text text-teal-100 font-semibold flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Maximum Donation Amount *
                    </span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="number"
                    name="maxAmount"
                    value={formData.maxAmount}
                    onChange={handleInputChange}
                    placeholder="Enter maximum amount (e.g., 5000)"
                    min="1"
                    step="0.01"
                    className={`input input-bordered bg-white/10 border-teal-300/30 text-white placeholder-teal-200/60 focus:border-teal-400 focus:bg-white/15 transition-all ${
                      errors.maxAmount ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.maxAmount && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="label"
                    >
                      <span className="label-text-alt text-red-300">{errors.maxAmount}</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Last Date of Donation */}
                <motion.div variants={itemVariants} className="form-control">
                  <label className="label">
                    <span className="label-text text-teal-100 font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Last Date of Donation *
                    </span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="date"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                    className={`input input-bordered bg-white/10 border-teal-300/30 text-white focus:border-teal-400 focus:bg-white/15 transition-all ${
                      errors.lastDate ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.lastDate && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="label"
                    >
                      <span className="label-text-alt text-red-300">{errors.lastDate}</span>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Short Description */}
                <motion.div variants={itemVariants} className="form-control">
                  <label className="label">
                    <span className="label-text text-teal-100 font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Short Description *
                    </span>
                    <span className="label-text-alt text-teal-200/60">
                      {formData.shortDescription.length}/150
                    </span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    placeholder="Brief description of the pet and why they need help..."
                    maxLength="150"
                    rows="3"
                    className={`textarea textarea-bordered bg-white/10 border-teal-300/30 text-white placeholder-teal-200/60 focus:border-teal-400 focus:bg-white/15 transition-all resize-none ${
                      errors.shortDescription ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.shortDescription && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="label"
                    >
                      <span className="label-text-alt text-red-300">{errors.shortDescription}</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Long Description */}
                <motion.div variants={itemVariants} className="form-control">
                  <label className="label">
                    <span className="label-text text-teal-100 font-semibold flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Long Description *
                    </span>
                    <span className="label-text-alt text-teal-200/60">
                      {formData.longDescription.length} characters
                    </span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    placeholder="Detailed story about the pet, their background, medical needs, personality, and why donations are needed. Include any special requirements or medical conditions..."
                    rows="8"
                    className={`textarea textarea-bordered bg-white/10 border-teal-300/30 text-white placeholder-teal-200/60 focus:border-teal-400 focus:bg-white/15 transition-all resize-none ${
                      errors.longDescription ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.longDescription && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="label"
                    >
                      <span className="label-text-alt text-red-300">{errors.longDescription}</span>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isUploading}
                className="btn btn-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 border-none text-white font-bold px-12 rounded-full shadow-lg disabled:opacity-50"
              >
                <Save className="w-6 h-6 mr-2" />
                Create Donation Campaign
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-teal-200/60 text-sm">
                * Required fields. Campaign will be reviewed before going live.
              </p>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateDonation;