import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Camera, 
  MapPin, 
  User, 
  Calendar, 
  Tag, 
  FileText, 
  Heart,
  CheckCircle,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

// Mock categories - replace with your actual categories
const petCategories = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'bird', label: 'Bird' },
  { value: 'fish', label: 'Fish' },
  { value: 'rabbit', label: 'Rabbit' },
  { value: 'hamster', label: 'Hamster' },
  { value: 'reptile', label: 'Reptile' },
  { value: 'other', label: 'Other' }
];

// Custom Select Component
const CustomSelect = ({ options, value, onChange, name, placeholder, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (option) => {
    onChange(name, option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectRef}>
      <div
        className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl cursor-pointer transition-all duration-300 ${
          error ? 'border-red-400' : 'border-white/20 hover:border-white/40'
        } ${isOpen ? 'border-white/40' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-white' : 'text-white/60'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-white/60`} />
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl z-50 overflow-hidden"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="p-3 hover:bg-white/10 cursor-pointer transition-colors text-white border-b border-white/10 last:border-b-0"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ onImageSelect, error }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    // Simulate upload to Cloudinary/ImgBB
    setUploading(true);
    try {
      // Mock upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockUrl = `https://example.com/uploads/${Date.now()}.jpg`;
      onImageSelect(mockUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
          error ? 'border-red-400' : 'border-white/30 hover:border-white/50'
        } ${preview ? 'border-solid border-white/40' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Pet preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white/60">
            <Upload className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium mb-2">Upload Pet Image</p>
            <p className="text-sm">Click to select or drag and drop</p>
          </div>
        )}
        
        {uploading && (
          <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

// Success Modal
const SuccessModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">Pet Added Successfully!</h3>
          <p className="text-white/80 mb-6">Your furry friend is now listed for adoption.</p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Continue
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Validation functions
const validateField = (name, value) => {
  switch (name) {
    case 'petImage':
      return !value ? 'Pet image is required' : '';
    case 'petName':
      if (!value) return 'Pet name is required';
      if (value.length < 2) return 'Pet name must be at least 2 characters';
      if (value.length > 50) return 'Pet name must be less than 50 characters';
      return '';
    case 'petAge':
      if (!value) return 'Pet age is required';
      if (value < 0) return 'Age cannot be negative';
      if (value > 30) return 'Please enter a valid age';
      return '';
    case 'petCategory':
      return !value ? 'Pet category is required' : '';
    case 'petLocation':
      if (!value) return 'Pet location is required';
      if (value.length < 3) return 'Location must be at least 3 characters';
      return '';
    case 'shortDescription':
      if (!value) return 'Short description is required';
      if (value.length < 10) return 'Short description must be at least 10 characters';
      if (value.length > 150) return 'Short description must be less than 150 characters';
      return '';
    case 'longDescription':
      if (!value) return 'Long description is required';
      if (value.length < 50) return 'Long description must be at least 50 characters';
      if (value.length > 1000) return 'Long description must be less than 1000 characters';
      return '';
    default:
      return '';
  }
};

export default function AddPet() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    petImage: '',
    petName: '',
    petAge: '',
    petCategory: '',
    petLocation: '',
    shortDescription: '',
    longDescription: '',
  });

  const [errors, setErrors] = useState({});

  // Handle field changes
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change if it was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle field blur
  const handleFieldBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const allFieldsValid = Object.keys(formData).every(key => {
      const error = validateField(key, formData[key]);
      return !error;
    });
    return allFieldsValid;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Touch all fields
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const allErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});
    setErrors(allErrors);

    // Check if form is valid
    if (Object.keys(allErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Pet data:', formData);
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        petImage: '',
        petName: '',
        petAge: '',
        petCategory: '',
        petLocation: '',
        shortDescription: '',
        longDescription: '',
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Error adding pet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return touched[fieldName] && errors[fieldName];
  };

  // CSS animation styles
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d343e] via-[#104958] to-[#0A303A] p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Add Your Beloved Pet
            <Heart className="inline-block w-10 h-10 ml-3 text-pink-400" />
          </h1>
          <p className="text-xl text-white/80">Help your furry friend find their forever home</p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div 
            className="space-y-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {/* Pet Image Upload */}
            <motion.div variants={fadeInUp}>
              <label className="block text-white font-semibold mb-3 text-lg">
                <Camera className="inline w-5 h-5 mr-2" />
                Pet Image *
              </label>
              <ImageUpload
                onImageSelect={(url) => handleFieldChange('petImage', url)}
                error={getFieldError('petImage')}
              />
              {getFieldError('petImage') && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center"
                >
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.petImage}
                </motion.p>
              )}
            </motion.div>

            {/* Pet Name and Age Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-3 text-lg">
                  <User className="inline w-5 h-5 mr-2" />
                  Pet Name *
                </label>
                <input
                  type="text"
                  value={formData.petName}
                  onChange={(e) => handleFieldChange('petName', e.target.value)}
                  onBlur={() => handleFieldBlur('petName')}
                  placeholder="Enter your pet's name"
                  className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                    getFieldError('petName') ? 'border-red-400' : 'border-white/20'
                  }`}
                />
                {getFieldError('petName') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.petName}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-3 text-lg">
                  <Calendar className="inline w-5 h-5 mr-2" />
                  Pet Age (years) *
                </label>
                <input
                  type="number"
                  value={formData.petAge}
                  onChange={(e) => handleFieldChange('petAge', e.target.value)}
                  onBlur={() => handleFieldBlur('petAge')}
                  placeholder="Enter age in years"
                  min="0"
                  step="0.1"
                  className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                    getFieldError('petAge') ? 'border-red-400' : 'border-white/20'
                  }`}
                />
                {getFieldError('petAge') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.petAge}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Category and Location Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-3 text-lg">
                  <Tag className="inline w-5 h-5 mr-2" />
                  Pet Category *
                </label>
                <CustomSelect
                  options={petCategories}
                  value={formData.petCategory}
                  onChange={handleFieldChange}
                  name="petCategory"
                  placeholder="Select pet category"
                  error={getFieldError('petCategory')}
                />
                {getFieldError('petCategory') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.petCategory}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-white font-semibold mb-3 text-lg">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  Pet Location *
                </label>
                <input
                  type="text"
                  value={formData.petLocation}
                  onChange={(e) => handleFieldChange('petLocation', e.target.value)}
                  onBlur={() => handleFieldBlur('petLocation')}
                  placeholder="Enter pickup location"
                  className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                    getFieldError('petLocation') ? 'border-red-400' : 'border-white/20'
                  }`}
                />
                {getFieldError('petLocation') && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.petLocation}
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Short Description */}
            <motion.div variants={fadeInUp}>
              <label className="block text-white font-semibold mb-3 text-lg">
                <FileText className="inline w-5 h-5 mr-2" />
                Short Description *
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => handleFieldChange('shortDescription', e.target.value)}
                onBlur={() => handleFieldBlur('shortDescription')}
                placeholder="A brief note about your pet (e.g., 'Friendly and energetic golden retriever')"
                maxLength="150"
                className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ${
                  getFieldError('shortDescription') ? 'border-red-400' : 'border-white/20'
                }`}
              />
              <div className="flex justify-between items-center mt-2">
                {getFieldError('shortDescription') ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.shortDescription}
                  </motion.p>
                ) : (
                  <div></div>
                )}
                <span className="text-white/60 text-sm">
                  {formData.shortDescription.length}/150
                </span>
              </div>
            </motion.div>

            {/* Long Description */}
            <motion.div variants={fadeInUp}>
              <label className="block text-white font-semibold mb-3 text-lg">
                <FileText className="inline w-5 h-5 mr-2" />
                Detailed Description *
              </label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => handleFieldChange('longDescription', e.target.value)}
                onBlur={() => handleFieldBlur('longDescription')}
                placeholder="Provide detailed information about your pet's personality, habits, health, training, and any special needs..."
                rows="6"
                maxLength="1000"
                className={`w-full p-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none ${
                  getFieldError('longDescription') ? 'border-red-400' : 'border-white/20'
                }`}
              />
              <div className="flex justify-between items-center mt-2">
                {getFieldError('longDescription') ? (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.longDescription}
                  </motion.p>
                ) : (
                  <div></div>
                )}
                <span className="text-white/60 text-sm">
                  {formData.longDescription.length}/1000
                </span>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !isFormValid()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Adding Pet...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6" />
                    <span>Add Pet for Adoption</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}