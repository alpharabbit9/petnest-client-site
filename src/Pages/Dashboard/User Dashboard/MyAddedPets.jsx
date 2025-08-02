import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  AlertTriangle,
  CheckCircle,
  PawPrint
} from 'lucide-react';

// Mock data - replace with your actual data
const mockPetsData = [
  {
    id: 1,
    petName: 'Buddy',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-01-15'
  },
  {
    id: 2,
    petName: 'Whiskers',
    petCategory: 'Cat',
    petImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: true,
    dateAdded: '2024-01-20'
  },
  {
    id: 3,
    petName: 'Charlie',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-01'
  },
  {
    id: 4,
    petName: 'Luna',
    petCategory: 'Cat',
    petImage: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-05'
  },
  {
    id: 5,
    petName: 'Max',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: true,
    dateAdded: '2024-02-10'
  },
  {
    id: 6,
    petName: 'Bella',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-12'
  },
  {
    id: 7,
    petName: 'Mittens',
    petCategory: 'Cat',
    petImage: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-15'
  },
  {
    id: 8,
    petName: 'Rocky',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-18'
  },
  {
    id: 9,
    petName: 'Shadow',
    petCategory: 'Cat',
    petImage: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: true,
    dateAdded: '2024-02-20'
  },
  {
    id: 10,
    petName: 'Daisy',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-22'
  },
  {
    id: 11,
    petName: 'Tiger',
    petCategory: 'Cat',
    petImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-25'
  },
  {
    id: 12,
    petName: 'Cooper',
    petCategory: 'Dog',
    petImage: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=100&h=100&fit=crop&crop=face',
    adoptionStatus: false,
    dateAdded: '2024-02-28'
  }
];

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, petName }) => (
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
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">Delete Pet</h3>
          <p className="text-white/80 mb-6">
            Are you sure you want to delete <span className="font-semibold text-white">"{petName}"</span>? 
            This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/20"
            >
              No, Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Yes, Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Adoption Success Modal
const AdoptionModal = ({ isOpen, onClose, petName }) => (
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
          <h3 className="text-2xl font-bold text-white mb-2">Congratulations!</h3>
          <p className="text-white/80 mb-6">
            <span className="font-semibold text-white">"{petName}"</span> has been marked as adopted! 
            Thank you for helping them find their forever home.
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Great!
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Custom Table Hook
const useTable = (data, pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sorting function
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        const comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    sortConfig,
    handleSort,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    startIndex,
    endIndex: Math.min(endIndex, sortedData.length),
    totalItems: sortedData.length
  };
};

// Sortable Header Component
const SortableHeader = ({ children, sortKey, sortConfig, onSort, canSort = true }) => {
  if (!canSort) {
    return (
      <th className="px-6 py-4 text-left text-white font-semibold">
        {children}
      </th>
    );
  }

  const isSorted = sortConfig.key === sortKey;
  const direction = isSorted ? sortConfig.direction : null;

  return (
    <th className="px-6 py-4 text-left text-white font-semibold">
      <div
        className="flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors"
        onClick={() => onSort(sortKey)}
      >
        {children}
        <div className="flex flex-col">
          <ChevronUp 
            className={`w-3 h-3 ${
              direction === 'asc' ? 'text-blue-400' : 'text-white/40'
            }`} 
          />
          <ChevronDown 
            className={`w-3 h-3 -mt-1 ${
              direction === 'desc' ? 'text-blue-400' : 'text-white/40'
            }`} 
          />
        </div>
      </div>
    </th>
  );
};

export default function MyAddedPets() {
  const [data, setData] = useState(mockPetsData);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, petId: null, petName: '' });
  const [adoptionModal, setAdoptionModal] = useState({ isOpen: false, petName: '' });

  const {
    data: paginatedData,
    currentPage,
    totalPages,
    sortConfig,
    handleSort,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    startIndex,
    endIndex,
    totalItems
  } = useTable(data, 10);

  // Handle pet deletion
  const handleDelete = (petId) => {
    setData(prevData => prevData.filter(pet => pet.id !== petId));
    setDeleteModal({ isOpen: false, petId: null, petName: '' });
  };

  // Handle marking pet as adopted
  const handleAdoption = (petId, petName) => {
    setData(prevData => 
      prevData.map(pet => 
        pet.id === petId ? { ...pet, adoptionStatus: true } : pet
      )
    );
    setAdoptionModal({ isOpen: true, petName });
  };

  // Handle update (redirect to update page)
  const handleUpdate = (petId) => {
    console.log('Redirecting to update page for pet:', petId);
    // Replace with your actual routing logic
    // navigate(`/update-pet/${petId}`);
  };

  const showPagination = totalPages > 1;

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d343e] via-[#104958] to-[#0A303A] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Added Pets
            <PawPrint className="inline-block w-10 h-10 ml-3 text-blue-400" />
          </h1>
          <p className="text-xl text-white/80">Manage all the pets you've added for adoption</p>
        </motion.div>

        {data.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12">
              <PawPrint className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No pets added yet</h3>
              <p className="text-white/60">Start by adding your first pet for adoption!</p>
            </div>
          </motion.div>
        ) : (
          /* Table Container */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Table Stats */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Total Pets: {data.length}</h3>
                  <p className="text-white/60 text-sm">
                    Adopted: {data.filter(pet => pet.adoptionStatus).length} | 
                    Available: {data.filter(pet => !pet.adoptionStatus).length}
                  </p>
                </div>
                {showPagination && (
                  <div className="text-white/60 text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <SortableHeader canSort={false}>Serial No.</SortableHeader>
                    <SortableHeader canSort={false}>Pet Image</SortableHeader>
                    <SortableHeader 
                      sortKey="petName" 
                      sortConfig={sortConfig} 
                      onSort={handleSort}
                    >
                      Pet Name
                    </SortableHeader>
                    <SortableHeader 
                      sortKey="petCategory" 
                      sortConfig={sortConfig} 
                      onSort={handleSort}
                    >
                      Category
                    </SortableHeader>
                    <SortableHeader 
                      sortKey="adoptionStatus" 
                      sortConfig={sortConfig} 
                      onSort={handleSort}
                    >
                      Adoption Status
                    </SortableHeader>
                    <SortableHeader canSort={false}>Actions</SortableHeader>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((pet, index) => (
                    <motion.tr
                      key={pet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      {/* Serial Number */}
                      <td className="px-6 py-4 text-white/80">
                        {startIndex + index + 1}
                      </td>
                      
                      {/* Pet Image */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <img
                            src={pet.petImage}
                            alt={pet.petName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                          />
                        </div>
                      </td>
                      
                      {/* Pet Name */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">{pet.petName}</span>
                      </td>
                      
                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                          {pet.petCategory}
                        </span>
                      </td>
                      
                      {/* Adoption Status */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          pet.adoptionStatus 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-orange-500/20 text-orange-300'
                        }`}>
                          {pet.adoptionStatus ? 'Adopted' : 'Not Adopted'}
                        </span>
                      </td>
                      
                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleUpdate(pet.id)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-200"
                            title="Update Pet"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDeleteModal({ 
                              isOpen: true, 
                              petId: pet.id, 
                              petName: pet.petName 
                            })}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-200"
                            title="Delete Pet"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                          
                          {!pet.adoptionStatus && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAdoption(pet.id, pet.petName)}
                              className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-all duration-200"
                              title="Mark as Adopted"
                            >
                              <Heart className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {showPagination && (
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">
                    Showing {startIndex + 1} to {endIndex} of {totalItems} entries
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map(pageNum => (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-blue-500 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, petId: null, petName: '' })}
        onConfirm={() => handleDelete(deleteModal.petId)}
        petName={deleteModal.petName}
      />

      <AdoptionModal
        isOpen={adoptionModal.isOpen}
        onClose={() => setAdoptionModal({ isOpen: false, petName: '' })}
        petName={adoptionModal.petName}
      />
    </div>
  );
}