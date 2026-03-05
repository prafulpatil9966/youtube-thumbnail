"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

const VALORANT_MAPS = [
    'Abyss', 'Ascent', 'Bind', 'Breeze', 'Corrode', 'Fracture', 
    'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split', 'Sunset'
];

interface Lineup {
    id: number;
    title: string;
    description: string;
    images: string[];
    map_name: string;
    created_at?: string;
}

export default function LineupsPage() {
    const [lineups, setLineups] = useState<Lineup[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMap, setSelectedMap] = useState<string>('All');
    const [viewingLineup, setViewingLineup] = useState<Lineup | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [uploading, setUploading] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>(['']);
    const [mapName, setMapName] = useState('');

    // Edit states
    const [editingLineup, setEditingLineup] = useState<Lineup | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editImageUrls, setEditImageUrls] = useState<string[]>(['']);
    const [editMapName, setEditMapName] = useState('');

    useEffect(() => {
        fetchLineups();
    }, []);

    const fetchLineups = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('lineups')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching lineups:', error);
                setLineups([]);
            } else {
                setLineups(data || []);
            }
        } catch (err) {
            console.error('Error:', err);
            setLineups([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('lineups')
                .insert([
                    {
                        title: title,
                        description: description,
                        images: imageUrls.filter(url => url.trim() !== ''),
                        map_name: mapName
                    }
                ]);

            if (error) {
                console.error('Error saving lineup:', error);
                alert('Failed to save lineup: ' + error.message);
                setLoading(false);
                return;
            }

            // Reset form
            setTitle('');
            setDescription('');
            setImageUrls(['']);
            setMapName('');
            setIsAdding(false);

            // Refresh list
            fetchLineups();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to save lineup: ' + (err instanceof Error ? err.message : String(err)));
            setLoading(false);
        }
    };

    const deleteLineup = async (id: number) => {
        const password = window.prompt("Enter password to delete this lineup:");
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "patilplays";

        if (password !== ADMIN_PASSWORD) {
            alert("Incorrect password!");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('lineups')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting lineup:', error);
                alert('Failed to delete lineup: ' + error.message);
            } else {
                fetchLineups();
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to delete lineup: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (lineup: Lineup) => {
        setEditingLineup(lineup);
        setEditTitle(lineup.title);
        setEditDescription(lineup.description);
        setEditImageUrls(lineup.images.length > 0 ? lineup.images : ['']);
        setEditMapName(lineup.map_name);
    };

    const cancelEdit = () => {
        setEditingLineup(null);
        setEditTitle('');
        setEditDescription('');
        setEditImageUrls(['']);
        setEditMapName('');
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLineup) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('lineups')
                .update({
                    title: editTitle,
                    description: editDescription,
                    images: editImageUrls.filter(url => url.trim() !== ''),
                    map_name: editMapName
                })
                .eq('id', editingLineup.id);

            if (error) {
                console.error('Error updating lineup:', error);
                alert('Failed to update lineup: ' + error.message);
                setLoading(false);
                return;
            }

            cancelEdit();
            fetchLineups();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to update lineup: ' + (err instanceof Error ? err.message : String(err)));
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `lineups/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('lineup-images')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Upload error:', uploadError);
                alert('Failed to upload image: ' + uploadError.message);
                return null;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('lineup-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Failed to upload image');
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const url = await uploadImage(files[i]);
            if (url) uploadedUrls.push(url);
        }

        if (uploadedUrls.length > 0) {
            if (isEdit) {
                setEditImageUrls([...editImageUrls.filter(url => url.trim() !== ''), ...uploadedUrls]);
            } else {
                setImageUrls([...imageUrls.filter(url => url.trim() !== ''), ...uploadedUrls]);
            }
        }
    };

    // Filter lineups based on search query and map
    const filteredLineups = lineups.filter(lineup => {
        const matchesSearch = !searchQuery.trim() || 
            lineup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lineup.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesMap = selectedMap === 'All' || lineup.map_name === selectedMap;
        
        return matchesSearch && matchesMap;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Valorant Lineups</h1>
                    <p className="text-sm sm:text-base text-gray-400">Manage your Valorant lineup videos</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6 sm:mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search lineups..."
                            className="w-full px-4 py-2 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <svg
                            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Map Filter */}
                <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-thin">
                    <div className="flex gap-2 justify-start px-2 sm:px-4 pb-2">
                        <button
                            onClick={() => setSelectedMap('All')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition whitespace-nowrap ${
                                selectedMap === 'All'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            Any
                        </button>
                        {VALORANT_MAPS.map((map) => (
                            <button
                                key={map}
                                onClick={() => setSelectedMap(map)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg font-medium transition whitespace-nowrap ${
                                    selectedMap === map
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                                {map}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add New Button */}
                {!isAdding && (
                    <div className="mb-6 sm:mb-8 text-center">
                        <button
                            onClick={() => setIsAdding(true)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg shadow-lg font-medium transition transform hover:scale-105"
                        >
                            + Add New Lineup
                        </button>
                    </div>
                )}

                {/* Add Form */}
                {isAdding && (
                    <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-700">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Add New Lineup</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Map</label>
                                    <select
                                        value={mapName}
                                        onChange={(e) => setMapName(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    >
                                        <option value="">Select a map</option>
                                        {VALORANT_MAPS.map((map) => (
                                            <option key={map} value={map}>{map}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="e.g., Haven A Site Smoke from Spawn"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                                        placeholder="Enter lineup instructions...\n1. Stand here\n2. Aim there\n3. Throw ability"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Images</label>
                                    
                                    {/* File Upload */}
                                    <div className="mb-4">
                                        <label className="block w-full cursor-pointer">
                                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-red-500 transition">
                                                <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="mt-2 text-xs sm:text-sm text-gray-400">
                                                    {uploading ? 'Uploading...' : 'Click to upload images or drag and drop'}
                                                </p>
                                                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, false)}
                                                className="hidden"
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>

                                    {/* Image URLs */}
                                    {imageUrls.filter(url => url.trim() !== '').length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-xs sm:text-sm text-gray-400">Uploaded Images ({imageUrls.filter(url => url.trim() !== '').length})</p>
                                            {imageUrls.map((url, index) => url.trim() !== '' && (
                                                <div key={index} className="flex gap-2 items-center bg-gray-700 rounded-lg p-2">
                                                    <img src={url} alt={`Preview ${index + 1}`} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                                                    <span className="flex-1 text-xs sm:text-sm text-gray-300 truncate">{url}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageUrls(imageUrls.filter((_, i) => i !== index))}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Saving...' : 'Save Lineup'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setTitle('');
                                        setDescription('');
                                        setImageUrls(['']);
                                        setMapName('');
                                    }}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Lineups List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {loading && lineups.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-500 border-t-red-500"></div>
                            <p className="text-gray-400 mt-4">Loading lineups...</p>
                        </div>
                    ) : filteredLineups.length === 0 ? (
                        <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
                            <p className="text-gray-400 text-lg">
                                {searchQuery ? `No lineups found matching "${searchQuery}"` : 'No lineups yet. Add your first lineup!'}
                            </p>
                        </div>
                    ) : (
                        filteredLineups.map((lineup) => (
                            <div key={lineup.id} className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                                {editingLineup?.id === lineup.id ? (
                                    // Edit Mode
                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Edit Lineup</h3>
                                        <form onSubmit={handleUpdate}>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Map</label>
                                                    <select
                                                        value={editMapName}
                                                        onChange={(e) => setEditMapName(e.target.value)}
                                                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        required
                                                    >
                                                        <option value="">Select a map</option>
                                                        {VALORANT_MAPS.map((map) => (
                                                            <option key={map} value={map}>{map}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Title</label>
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Description</label>
                                                    <textarea
                                                        value={editDescription}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base">Images</label>
                                                    
                                                    {/* File Upload */}
                                                    <div className="mb-4">
                                                        <label className="block w-full cursor-pointer">
                                                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-3 sm:p-4 text-center hover:border-red-500 transition">
                                                                <svg className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <p className="mt-1 text-[10px] sm:text-xs text-gray-400">
                                                                    {uploading ? 'Uploading...' : 'Upload more images'}
                                                                </p>
                                                            </div>
                                                            <input
                                                                type="file"
                                                                multiple
                                                                accept="image/*"
                                                                onChange={(e) => handleFileUpload(e, true)}
                                                                className="hidden"
                                                                disabled={uploading}
                                                            />
                                                        </label>
                                                    </div>

                                                    {/* Image URLs */}
                                                    {editImageUrls.filter(url => url.trim() !== '').length > 0 && (
                                                        <div className="space-y-2 max-h-48 overflow-y-auto">
                                                            {editImageUrls.map((url, index) => url.trim() !== '' && (
                                                                <div key={index} className="flex gap-2 items-center bg-gray-600 rounded p-2">
                                                                    <img src={url} alt={`Preview ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                                                                    <span className="flex-1 text-xs text-gray-300 truncate">{url.substring(url.lastIndexOf('/') + 1)}</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setEditImageUrls(editImageUrls.filter((_, i) => i !== index))}
                                                                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition disabled:opacity-50"
                                                >
                                                    {loading ? 'Updating...' : 'Update'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={cancelEdit}
                                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    // View Mode - Clickable Card
                                    <div 
                                        className="cursor-pointer group"
                                        onClick={() => {
                                            setViewingLineup(lineup);
                                            setCurrentImageIndex(0);
                                        }}
                                    >
                                        {/* Image Thumbnail */}
                                        {lineup.images && lineup.images.filter(img => img && img.trim() !== '').length > 0 && (
                                            <div className="relative rounded-t-lg overflow-hidden">
                                                <img 
                                                    src={lineup.images.filter(img => img && img.trim() !== '')[0]} 
                                                    alt={lineup.title}
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                                    <svg className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                {lineup.images.filter(img => img && img.trim() !== '').length > 1 && (
                                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                                                        1/{lineup.images.filter(img => img && img.trim() !== '').length}
                                                    </div>
                                                )}
                                                {lineup.map_name && (
                                                    <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                        {lineup.map_name}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="p-3 sm:p-4">
                                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2">{lineup.title}</h3>
                                            {lineup.created_at && (
                                                <p className="text-gray-500 text-sm mt-2">
                                                    {new Date(lineup.created_at).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Modal Popup */}
                {viewingLineup && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4"
                        onClick={() => setViewingLineup(null)}
                    >
                        <div 
                            className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Left Side - Image Slider */}
                            <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[40vh] md:min-h-0">
                                {viewingLineup.images && viewingLineup.images.length > 0 && viewingLineup.images[currentImageIndex] ? (
                                    <>
                                        <img 
                                            src={viewingLineup.images[currentImageIndex]} 
                                            alt={`${viewingLineup.title} - Image ${currentImageIndex + 1}`}
                                            className="w-full h-full object-contain max-h-[90vh]"
                                        />
                                        
                                        {/* Navigation Arrows */}
                                        {viewingLineup.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex((prev) => 
                                                            prev > 0 ? prev - 1 : viewingLineup.images.length - 1
                                                        );
                                                    }}
                                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 sm:p-3 rounded-full transition"
                                                >
                                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex((prev) => 
                                                            prev < viewingLineup.images.length - 1 ? prev + 1 : 0
                                                        );
                                                    }}
                                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 sm:p-3 rounded-full transition"
                                                >
                                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                                
                                                {/* Image Counter */}
                                                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-75 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                                    {currentImageIndex + 1}/{viewingLineup.images.length}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-gray-400">No images available</div>
                                )}
                            </div>

                            {/* Right Side - Details */}
                            <div className="md:w-2/5 flex flex-col max-h-[55vh] md:max-h-none">
                                {/* Header */}
                                <div className="p-4 sm:p-6 border-b border-gray-700">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white pr-4">{viewingLineup.title}</h2>
                                        <button
                                            onClick={() => setViewingLineup(null)}
                                            className="text-gray-400 hover:text-white transition flex-shrink-0"
                                        >
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {viewingLineup.created_at && (
                                        <p className="text-gray-400 text-sm mt-2">
                                            Created: {new Date(viewingLineup.created_at).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                {/* Content - Description */}
                                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                    <div>
                                        <label className="block text-gray-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">Instructions</label>
                                        <div className="text-sm sm:text-base text-white whitespace-pre-wrap bg-gray-700 rounded-lg p-3 sm:p-4">
                                            {viewingLineup.description}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-4 sm:p-6 border-t border-gray-700 space-y-2 sm:space-y-3">
                                    <button
                                        onClick={() => {
                                            setViewingLineup(null);
                                            startEdit(viewingLineup);
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setViewingLineup(null);
                                            deleteLineup(viewingLineup.id);
                                        }}
                                        className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm sm:text-base rounded-lg font-medium transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
