import React, { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaUser,
  FaClock,
  FaEye,
  FaReply,
  FaTrash,
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaDownload,
  FaSort,
  FaCheckSquare,
  FaSquare
} from 'react-icons/fa';
import { InquiriesController } from '../../controllers/inquiriesController';
import './dashboard.css';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedInquiries, setSelectedInquiries] = useState([]);
  const [bulkActionLoading, setBulkActionLoading] = useState(false);

  // Fetch inquiries on component mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    await InquiriesController.fetchInquiries(
      { limit: 50, offset: 0 },
      {
        onSuccess: (response) => {
          setInquiries(response.data);
          setError(null);
        },
        onError: (error) => {
          setError(error.error || 'Failed to fetch inquiries');
          console.error('Fetch inquiries error:', error);
        },
        onLoading: setLoading
      }
    );
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    // Validate action first
    const inquiry = inquiries.find(i => i.id === inquiryId);
    const validation = InquiriesController.validateAction(inquiry, 
      newStatus === 'replied' ? 'markAsReplied' : 'markAsRead'
    );
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    await InquiriesController.updateInquiryStatus(
      inquiryId, 
      newStatus,
      {
        onSuccess: (response) => {
          setInquiries(prev => 
            prev.map(inquiry => 
              inquiry.id === inquiryId 
                ? { ...inquiry, status: newStatus }
                : inquiry
            )
          );
          setError(null);
          
          // Update selected inquiry if it's open in modal
          if (selectedInquiry?.id === inquiryId) {
            setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
          }
        },
        onError: (error) => {
          setError(error.error || 'Failed to update inquiry status');
          console.error('Update status error:', error);
        },
        onLoading: setActionLoading
      }
    );
  };

  const handleDelete = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    await InquiriesController.deleteInquiry(
      inquiryId,
      {
        onSuccess: (response) => {
          setInquiries(prev => prev.filter(inquiry => inquiry.id !== inquiryId));
          
          if (selectedInquiry?.id === inquiryId) {
            closeModal();
          }
          
          // Remove from selected inquiries if present
          setSelectedInquiries(prev => prev.filter(id => id !== inquiryId));
          setError(null);
        },
        onError: (error) => {
          setError(error.error || 'Failed to delete inquiry');
          console.error('Delete inquiry error:', error);
        },
        onLoading: setActionLoading
      }
    );
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedInquiries.length === 0) return;
    
    setBulkActionLoading(true);
    
    try {
      const promises = selectedInquiries.map(id => 
        InquiriesController.updateInquiryStatus(id, newStatus, {})
      );
      
      const results = await Promise.allSettled(promises);
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      
      if (successful.length > 0) {
        setInquiries(prev => 
          prev.map(inquiry => 
            selectedInquiries.includes(inquiry.id)
              ? { ...inquiry, status: newStatus }
              : inquiry
          )
        );
        
        setSelectedInquiries([]);
        setError(null);
      }
      
      if (successful.length < results.length) {
        setError(`Updated ${successful.length} of ${results.length} inquiries`);
      }
      
    } catch (error) {
      setError('Failed to perform bulk update');
      console.error('Bulk update error:', error);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedInquiries.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedInquiries.length} inquiries?`)) {
      return;
    }
    
    setBulkActionLoading(true);
    
    try {
      const promises = selectedInquiries.map(id => 
        InquiriesController.deleteInquiry(id, {})
      );
      
      const results = await Promise.allSettled(promises);
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      
      if (successful.length > 0) {
        setInquiries(prev => 
          prev.filter(inquiry => !selectedInquiries.includes(inquiry.id))
        );
        
        setSelectedInquiries([]);
        setError(null);
      }
      
      if (successful.length < results.length) {
        setError(`Deleted ${successful.length} of ${results.length} inquiries`);
      }
      
    } catch (error) {
      setError('Failed to perform bulk delete');
      console.error('Bulk delete error:', error);
    } finally {
      setBulkActionLoading(false);
    }
  };

  const openModal = async (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
    
    // Mark as read if it's new
    if (inquiry.status === 'new') {
      await handleStatusChange(inquiry.id, 'read');
    }
  };

  const closeModal = () => {
    setSelectedInquiry(null);
    setIsModalOpen(false);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const toggleSelectInquiry = (inquiryId) => {
    setSelectedInquiries(prev => 
      prev.includes(inquiryId)
        ? prev.filter(id => id !== inquiryId)
        : [...prev, inquiryId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedInquiries.length === filteredInquiries.length) {
      setSelectedInquiries([]);
    } else {
      setSelectedInquiries(filteredInquiries.map(i => i.id));
    }
  };

  // Filter and sort inquiries using controller methods
  const filteredInquiries = InquiriesController.filterInquiries(inquiries, {
    statusFilter,
    searchTerm
  });

  const sortedInquiries = InquiriesController.sortInquiries(
    filteredInquiries, 
    sortBy, 
    sortOrder
  );

  // Get status badge component using controller
  const getStatusBadge = (status) => {
    const config = InquiriesController.getStatusBadgeConfig(status);
    
    return (
      <span className={config.className}>
        {status === 'new' && <FaExclamationCircle />}
        {status === 'read' && <FaEye />}
        {status === 'replied' && <FaCheckCircle />}
        {config.label}
      </span>
    );
  };

  // Get inquiry stats using controller
  const stats = InquiriesController.calculateStats(inquiries);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading inquiries...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
          <FaExclamationCircle />
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card" style={{'--stat-color': '#00d9ff', '--stat-color-dark': '#0ea5e9'}}>
          <div className="stat-header">
            <div className="stat-title">Total Inquiries</div>
            <div className="stat-icon"><FaEnvelope /></div>
          </div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-change neutral">All time</div>
        </div>

        <div className="stat-card" style={{'--stat-color': '#ef4444', '--stat-color-dark': '#dc2626'}}>
          <div className="stat-header">
            <div className="stat-title">New</div>
            <div className="stat-icon"><FaExclamationCircle /></div>
          </div>
          <div className="stat-value">{stats.newCount}</div>
          <div className="stat-change neutral">Require attention</div>
        </div>

        <div className="stat-card" style={{'--stat-color': '#10b981', '--stat-color-dark': '#059669'}}>
          <div className="stat-header">
            <div className="stat-title">Read</div>
            <div className="stat-icon"><FaEye /></div>
          </div>
          <div className="stat-value">{stats.readCount}</div>
          <div className="stat-change neutral">Viewed</div>
        </div>

        <div className="stat-card" style={{'--stat-color': '#9333ea', '--stat-color-dark': '#7c3aed'}}>
          <div className="stat-header">
            <div className="stat-title">Replied</div>
            <div className="stat-icon"><FaCheckCircle /></div>
          </div>
          <div className="stat-value">{stats.repliedCount}</div>
          <div className="stat-change neutral">
            {stats.completionRate}% completion rate
          </div>
        </div>
      </div>

      {/* Filters, Search, and Bulk Actions */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Contact Inquiries</h3>
          {selectedInquiries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedInquiries.length} selected
              </span>
              <button
                onClick={() => handleBulkStatusChange('read')}
                disabled={bulkActionLoading}
                className="action-btn"
                title="Mark as Read"
              >
                <FaEye size={12} />
              </button>
              <button
                onClick={() => handleBulkStatusChange('replied')}
                disabled={bulkActionLoading}
                className="action-btn primary"
                title="Mark as Replied"
              >
                <FaReply size={12} />
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={bulkActionLoading}
                className="action-btn danger"
                title="Delete Selected"
              >
                <FaTrash size={12} />
              </button>
            </div>
          )}
        </div>
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              className="action-btn primary flex items-center gap-2"
              title="Export Data"
            >
              <FaDownload size={12} />
              Export
            </button>
          </div>

          {/* Inquiries Table */}
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <button onClick={toggleSelectAll} className="flex items-center">
                      {selectedInquiries.length === filteredInquiries.length && filteredInquiries.length > 0 ? 
                        <FaCheckSquare /> : <FaSquare />
                      }
                    </button>
                  </th>
                  <th>
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1"
                    >
                      Contact <FaSort />
                    </button>
                  </th>
                  <th>
                    <button 
                      onClick={() => handleSort('subject')}
                      className="flex items-center gap-1"
                    >
                      Subject <FaSort />
                    </button>
                  </th>
                  <th>
                    <button 
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-1"
                    >
                      Status <FaSort />
                    </button>
                  </th>
                  <th>
                    <button 
                      onClick={() => handleSort('createdAt')}
                      className="flex items-center gap-1"
                    >
                      Date <FaSort />
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'No inquiries match your filters' 
                        : 'No inquiries yet'
                      }
                    </td>
                  </tr>
                ) : (
                  sortedInquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>
                        <button onClick={() => toggleSelectInquiry(inquiry.id)}>
                          {selectedInquiries.includes(inquiry.id) ? 
                            <FaCheckSquare className="text-blue-500" /> : 
                            <FaSquare className="text-gray-400" />
                          }
                        </button>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-blue-600" size={12} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{inquiry.fullName}</div>
                            <div className="text-sm text-gray-500">{inquiry.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="max-w-xs truncate font-medium">{inquiry.subject}</div>
                      </td>
                      <td>{getStatusBadge(inquiry.status)}</td>
                      <td>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <FaClock size={12} />
                          {InquiriesController.formatDate(inquiry.createdAt, 'short')}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(inquiry)}
                            className="action-btn"
                            title="View Details"
                          >
                            <FaEye size={12} />
                          </button>
                          
                          {inquiry.status !== 'replied' && (
                            <button
                              onClick={() => handleStatusChange(inquiry.id, 'replied')}
                              disabled={actionLoading === inquiry.id}
                              className="action-btn primary"
                              title="Mark as Replied"
                            >
                              {actionLoading === inquiry.id ? (
                                <div className="spinner" style={{width: '12px', height: '12px'}} />
                              ) : (
                                <FaReply size={12} />
                              )}
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDelete(inquiry.id)}
                            disabled={actionLoading === inquiry.id}
                            className="action-btn danger"
                            title="Delete"
                          >
                            {actionLoading === inquiry.id ? (
                              <div className="spinner" style={{width: '12px', height: '12px'}} />
                            ) : (
                              <FaTrash size={12} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for inquiry details */}
      {isModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedInquiry.subject}</h3>
                  <p className="text-gray-600">From: {selectedInquiry.fullName}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedInquiry.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <p className="text-gray-900">
                      {InquiriesController.formatDate(selectedInquiry.createdAt, 'long')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">IP Address</label>
                    <p className="text-gray-900">{selectedInquiry.ipAddress || 'Unknown'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'replied')}
                    disabled={actionLoading === selectedInquiry.id || selectedInquiry.status === 'replied'}
                    className="action-btn primary flex items-center gap-2"
                  >
                    <FaReply />
                    {selectedInquiry.status === 'replied' ? 'Replied' : 'Mark as Replied'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    disabled={actionLoading === selectedInquiry.id}
                    className="action-btn danger flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>
                  <button
                    onClick={closeModal}
                    className="action-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;