import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiUser, FiDollarSign, FiActivity } from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('token');
    const admin = JSON.parse(localStorage.getItem('admin'));
    
    if (!token || !admin) {
      navigate('/admin');
    } else {
      setAdminData(admin);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    navigate('/admin');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile menu button */}
      <div className="lg:hidden bg-black border-b border-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block w-64 bg-black border-r border-gray-800 min-h-screen fixed lg:relative`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-8 hidden lg:block">Admin Panel</h1>
            
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <FiHome className="text-lg" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('users');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <FiUsers className="text-lg" />
                <span>Users</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <FiSettings className="text-lg" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 mt-8"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-64 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            {adminData && (
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <FiUser className="text-lg" />
                </div>
                <div>
                  <p className="text-sm font-medium">{adminData.username}</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </div>
            )}
          </div>

          {/* Page content */}
          <div className="bg-black rounded-xl border border-gray-800 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  // Mock data for statistics
  const stats = [
    { title: 'Total Users', value: '1,234', icon: <FiUsers className="text-2xl" />, change: '+12%', trend: 'up' },
    { title: 'Total Revenue', value: '$12,345', icon: <FiDollarSign className="text-2xl" />, change: '+5%', trend: 'up' },
    { title: 'Active Sessions', value: '456', icon: <FiActivity className="text-2xl" />, change: '-2%', trend: 'down' },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold mb-6">Overview</h3>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h4 className="font-medium mb-4">Recent Activity</h4>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between pb-4 border-b border-gray-800 last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <FiUser className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Users Content Component
const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Function to toggle user role between Admin and User
  const toggleUserRole = async (userId) => {
    try {
      setIsLoading(true);
      // In a real app, you would make an API call here to update the user's role
      // const response = await fetch(`/api/users/${userId}/role`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      //   body: JSON.stringify({ role: 'Admin' }) // or 'User' based on current role
      // });
      // const data = await response.json();
      
      // For demo purposes, we'll update the local state
      setUsers(users.map(user => {
        if (user.id === userId) {
          const newRole = user.role === 'Admin' ? 'User' : 'Admin';
          setMessage({ text: `User role updated to ${newRole}`, type: 'success' });
          return { ...user, role: newRole };
        }
        return user;
      }));
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error updating user role:', error);
      setMessage({ text: 'Failed to update user role', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to toggle user status
  const toggleUserStatus = async (userId) => {
    try {
      setIsLoading(true);
      // Similar API call would go here
      setUsers(users.map(user => {
        if (user.id === userId) {
          const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
          setMessage({ text: `User status updated to ${newStatus}`, type: 'success' });
          return { ...user, status: newStatus };
        }
        return user;
      }));
      
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error updating user status:', error);
      setMessage({ text: 'Failed to update user status', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">User Management</h3>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            onClick={() => {}}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Export Users'}
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            onClick={() => {}}
            disabled={isLoading}
          >
            <FiUser className="mr-2" /> Add New User
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.type === 'error' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <FiUser className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserRole(user.id)}
                      disabled={isLoading}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Admin' 
                          ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {user.role}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      disabled={isLoading}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-900 text-green-300 hover:bg-green-800'
                          : 'bg-red-900 text-red-300 hover:bg-red-800'
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1"
                        onClick={() => {}}
                        title="Edit User"
                      >
                        <FiSettings className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 p-1"
                        onClick={() => {}}
                        title="Delete User"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{users.length}</span> of{' '}
            <span className="font-medium">{users.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm hover:bg-gray-800">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm hover:bg-gray-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Clicks List Component
const SettingsContent = () => {
  const [clicks, setClicks] = useState([
    { id: 1, timestamp: '2025-10-10T10:30:00Z', element: 'Login Button', page: '/login', userId: 'user123' },
    { id: 2, timestamp: '2025-10-10T10:31:15Z', element: 'Dashboard Link', page: '/', userId: 'user456' },
    { id: 3, timestamp: '2025-10-10T10:32:45Z', element: 'Settings Icon', page: '/settings', userId: 'user123' },
    { id: 4, timestamp: '2025-10-10T10:35:22Z', element: 'Profile Menu', page: '/profile', userId: 'user789' },
    { id: 5, timestamp: '2025-10-10T10:36:10Z', element: 'Logout Button', page: '/settings', userId: 'user456' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, you would fetch this data from an API
  // useEffect(() => {
  //   const fetchClicks = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch('/api/clicks', {
  //         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //       });
  //       const data = await response.json();
  //       setClicks(data);
  //     } catch (error) {
  //       console.error('Error fetching clicks:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchClicks();
  // }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Click Analytics</h3>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            onClick={() => {}}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"
            onClick={() => {}}
            disabled={isLoading}
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Element</th>
                <th className="px-6 py-3 font-medium">Page</th>
                <th className="px-6 py-3 font-medium">User ID</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    Loading click data...
                  </td>
                </tr>
              ) : clicks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    No click data available
                  </td>
                </tr>
              ) : (
                clicks.map((click) => (
                  <tr key={click.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-gray-300">
                      {formatDate(click.timestamp)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                        {click.element}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{click.page}</td>
                    <td className="px-6 py-4">
                      <span className="text-blue-400 text-sm">{click.userId}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1"
                        onClick={() => {}}
                        title="View Details"
                      >
                        <FiActivity className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {clicks.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{clicks.length}</span> of{' '}
              <span className="font-medium">{clicks.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm hover:bg-gray-800">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-700 text-gray-400 text-sm hover:bg-gray-800">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
