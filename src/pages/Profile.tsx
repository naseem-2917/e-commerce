import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Mail, User, Shield, LogOut, Package, Settings, ChevronRight, Pencil, Check, X, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Profile() {
    const { user, signOut, loading } = useAuth();
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingPhoto, setIsEditingPhoto] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPhotoURL, setNewPhotoURL] = useState('');
    const [updating, setUpdating] = useState(false);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <User size={40} className="text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Not logged in</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Please sign in to view your profile</p>
                <Link
                    to="/login"
                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    // Get initials for avatar fallback
    const getInitials = () => {
        if (user.displayName) {
            return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return user.email?.charAt(0).toUpperCase() || 'U';
    };

    // Handle name update
    const handleUpdateName = async () => {
        if (!newName.trim() || !auth.currentUser) return;

        setUpdating(true);
        try {
            await updateProfile(auth.currentUser, { displayName: newName.trim() });
            setIsEditingName(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating name:', error);
        }
        setUpdating(false);
    };

    // Handle photo URL update
    const handleUpdatePhoto = async () => {
        if (!newPhotoURL.trim() || !auth.currentUser) return;

        setUpdating(true);
        try {
            await updateProfile(auth.currentUser, { photoURL: newPhotoURL.trim() });
            setIsEditingPhoto(false);
            setImageError(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating photo:', error);
        }
        setUpdating(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative flex flex-col sm:flex-row items-center gap-6">
                    {/* Avatar with Edit Button */}
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/30">
                            {user.photoURL && !imageError ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || 'User'}
                                    className="w-full h-full object-cover"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <span className="text-4xl font-bold text-white">{getInitials()}</span>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                setNewPhotoURL(user.photoURL || '');
                                setIsEditingPhoto(true);
                            }}
                            className="absolute bottom-0 right-0 w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            title="Change Photo"
                        >
                            <Camera size={18} />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="text-center sm:text-left flex-1">
                        {isEditingName ? (
                            <div className="flex items-center gap-2 mb-1">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter new name"
                                    className="px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                                    autoFocus
                                />
                                <button
                                    onClick={handleUpdateName}
                                    disabled={updating}
                                    className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    <Check size={18} />
                                </button>
                                <button
                                    onClick={() => setIsEditingName(false)}
                                    className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-3xl font-bold">{user.displayName || 'User'}</h1>
                                <button
                                    onClick={() => {
                                        setNewName(user.displayName || '');
                                        setIsEditingName(true);
                                    }}
                                    className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                                    title="Edit Name"
                                >
                                    <Pencil size={16} />
                                </button>
                            </div>
                        )}
                        <p className="text-blue-100 flex items-center justify-center sm:justify-start gap-2">
                            <Mail size={16} /> {user.email}
                        </p>
                        {user.role === 'admin' && (
                            <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-amber-500/20 text-amber-200 rounded-full text-sm font-medium">
                                <Shield size={14} /> Admin
                            </span>
                        )}
                    </div>
                </div>

                {/* Photo URL Edit Modal */}
                {isEditingPhoto && (
                    <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                            <LinkIcon size={16} />
                            <span className="font-medium">Update Profile Photo</span>
                        </div>
                        <p className="text-sm text-blue-100 mb-3">Paste an image URL (e.g., from Google Photos, Imgur, etc.)</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="url"
                                value={newPhotoURL}
                                onChange={(e) => setNewPhotoURL(e.target.value)}
                                placeholder="https://example.com/photo.jpg"
                                className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                                autoFocus
                            />
                            <button
                                onClick={handleUpdatePhoto}
                                disabled={updating || !newPhotoURL.trim()}
                                className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                <Check size={18} /> Save
                            </button>
                            <button
                                onClick={() => setIsEditingPhoto(false)}
                                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                            >
                                <X size={18} /> Cancel
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Link
                    to="/orders"
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <Package className="text-blue-600 dark:text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">My Orders</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">View & download purchases</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-blue-600 transition-colors" size={20} />
                    </div>
                </Link>

                {user.role === 'admin' && (
                    <Link
                        to="/admin"
                        className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 transition-colors group"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                                    <Shield className="text-amber-600 dark:text-amber-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Admin Panel</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage products & orders</p>
                                </div>
                            </div>
                            <ChevronRight className="text-slate-400 group-hover:text-amber-600 transition-colors" size={20} />
                        </div>
                    </Link>
                )}
            </div>

            {/* Account Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-8">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Settings size={20} /> Account Details
                    </h2>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <User size={18} className="text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">Display Name</span>
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{user.displayName || 'Not set'}</span>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">Email Address</span>
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">{user.email}</span>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Shield size={18} className="text-slate-400" />
                            <span className="text-slate-600 dark:text-slate-400">Account Type</span>
                        </div>
                        <span className={`font-medium ${user.role === 'admin' ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                            {user.role === 'admin' ? 'Administrator' : 'Customer'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Sign Out */}
            <button
                onClick={handleSignOut}
                className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
            >
                <LogOut size={20} /> Sign Out
            </button>
        </div>
    );
}
