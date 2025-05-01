import React, { useState, useEffect } from 'react';
import { getloginData } from '../../Services/loginApiServices';
import { useNavigate } from 'react-router-dom';

const   UserProfile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: '',
        gender: 'male',
        addresses: []
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                // Get user ID from localStorage
                const userData = JSON.parse(localStorage.getItem('user'));

                if (!userData || !userData.id) {
                    throw new Error('User ID not found in localStorage');
                }

                // Fetch user data from API
                const response = await getloginData(`/users/${userData.id}`);
                console.log({ response })
                if (response.status != 200) {
                    throw new Error('Failed to fetch user data');
                }

                const data = response.data
                console.log({ data })
                setUser(data);

                // Initialize form data with user data
                setFormData({
                    name: data.name || '',

                    email: data.email || '',
                    mobileNumber: data.mobileNumber || '',
                    //   dateOfBirth: data.dateOfBirth || '',
                    //   gender: data.gender || 'male',
                    addresses: data.addresses || []
                });

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);
    console.log({ user })
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleAddressChange = (index, field, value) => {
        const updatedAddresses = [...formData.addresses];
        updatedAddresses[index] = {
            ...updatedAddresses[index],
            [field]: value
        };

        setFormData({
            ...formData,
            addresses: updatedAddresses
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = JSON.parse(localStorage.getItem('user'));

            if (!userData || !userData.id) {
                throw new Error('User ID not found in localStorage');
            }

            const response = await fetch(`/api/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            // Show success message or notification
            alert('Profile updated successfully');

            // Update local user data
            const updatedData = await response.json();
            setUser(updatedData);

        } catch (err) {
            alert(`Error updating profile: ${err.message}`);
        }
    };

    const setDefaultAddress = async (addressId) => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));

            if (!userData || !userData.id) {
                throw new Error('User ID not found in localStorage');
            }

            const response = await fetch(`/api/users/${userData.id}/addresses/default`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ addressId })
            });

            if (!response.ok) {
                throw new Error('Failed to set default address');
            }

            // Update local state with new addresses array that has updated default status
            const updatedData = await response.json();
            setFormData({
                ...formData,
                addresses: updatedData.addresses
            });

            alert('Default address updated');

        } catch (err) {
            alert(`Error setting default address: ${err.message}`);
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));

            if (!userData || !userData.id) {
                throw new Error('User ID not found in localStorage');
            }

            const response = await fetch(`/api/users/${userData.id}/addresses/${addressId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete address');
            }

            // Update local state by removing the deleted address
            const updatedAddresses = formData.addresses.filter(addr => addr.id !== addressId);
            setFormData({
                ...formData,
                addresses: updatedAddresses
            });

            alert('Address deleted successfully');

        } catch (err) {
            alert(`Error deleting address: ${err.message}`);
        }
    };

    const addNewAddress = () => {
        const newAddress = {
            id: `temp-${Date.now()}`, // Temporary ID until saved
            type: 'Home',
            name: formData.name,
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            mobileNumber: '',
            isDefault: formData.addresses.length === 0 // Make default if it's the first address
        };

        setFormData({
            ...formData,
            addresses: [...formData.addresses, newAddress]
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p><strong>Error:</strong> {error}</p>
                    <p className="mt-2">Please try refreshing the page or logging in again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="flex items-center mb-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-semibold mr-4">
                        {formData.name && formData.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome, {formData.name} </h1>
                        <p className="text-gray-500">{formData.email}</p>
                    </div>
                </div>

                {/* Dashboard Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {/* Orders Box */}
                    <div  
                     className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition transform hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
                        </div>
                        <p className="text-gray-600">View your order history and track current orders</p>
                    </div>

                    {/* Wishlist Box */}
                    <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition transform hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Wishlist</h3>
                        </div>
                        <p className="text-gray-600">View and manage your saved items</p>
                    </div>

                    {/* Coupons Box */}
                    <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition transform hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Coupons</h3>
                        </div>
                        <p className="text-gray-600">View and apply your available coupons</p>
                    </div>

                    {/* Help Center Box */}
                    <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition transform hover:-translate-y-1">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">Help Center</h3>
                        </div>
                        <p className="text-gray-600">Get support and find answers to your questions</p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`${activeTab === 'profile'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Profile Information
                        </button>
                        <button
                            onClick={() => setActiveTab('addresses')}
                            className={`${activeTab === 'addresses'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            My Addresses
                        </button>
                    </nav>
                </div>

                {/* Profile Information Form */}
                {activeTab === 'profile' && (
                    <div className="bg-white shadow rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Profile Information
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div> */}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobileNumber"
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div> */}
                            </div>

                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Reset form to original user data
                                        if (user) {
                                            setFormData({
                                                name: user.name || '',
                                                email: user.email || '',
                                                mobileNumber: user.mobileNumber || '',
                                                dateOfBirth: user.dateOfBirth || '',
                                                gender: user.gender || 'male',
                                                addresses: user.addresses || []
                                            });
                                        }
                                    }}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Addresses Section */}
                {activeTab === 'addresses' && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            My Addresses
                        </h2>

                        {formData.addresses.length === 0 ? (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="mt-2 text-gray-500">You don't have any saved addresses yet.</p>
                            </div>
                        ) : (
                            // Map through addresses and render each one
                            formData.addresses.map((address, index) => (
                                <div
                                    key={address.id}
                                    className={`${address.isDefault
                                            ? 'border border-blue-200 bg-blue-50'
                                            : 'border border-gray-200'
                                        } rounded-lg p-6 mb-4 relative`}
                                >
                                    <span className={`absolute top-4 right-4 ${address.isDefault
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                        } text-xs font-semibold px-2 py-1 rounded`}>
                                        {address.isDefault ? 'Default' : address.type}
                                    </span>

                                    <h3 className="text-md font-semibold text-gray-800">{address.type} Address</h3>
                                    <div className="mt-2 text-gray-600">

                                        <p className="mt-1">{address.receiverName
                                        }</p>
                                        <p className="mt-1">{address.receiverNumber
                                        }</p>
                                        <p>{address.buildingName}</p>
                                        <p>{address.street}</p>
                                        <p>{address.district}, {address.state} {address.zipCode}</p>
                                        <p>{address.country}</p>

                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={() => {
                                                // Implement edit functionality
                                                // This could open a modal or expand the form
                                            }}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={() => deleteAddress(address.id)}
                                        >
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Delete
                                        </button>

                                        {!address.isDefault && (
                                            <button
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                onClick={() => setDefaultAddress(address.id)}
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                Set as Default
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Add New Address */}
                        <button
                            onClick={addNewAddress}
                            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-600 font-medium">Add New Address</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;