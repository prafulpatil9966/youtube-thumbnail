"use client";
import React, { useEffect, useState, ChangeEvent } from 'react';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

interface StreamRecord {
    id: number;
    title: string;
    desc: string;
    thumbnail: string;
    date: string;
}

export default function ThumbnailsPage() {
    const [records, setRecords] = useState<StreamRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    
    // Form states
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState<File | null>(null);
    
    // Edit states
    const [editingRecord, setEditingRecord] = useState<StreamRecord | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');
    
    const STREAM_END_TEXT = "ggs, live on YT if anyone wants to stop by — PatilPlaysYT";

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('streamrecords')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching records:', error);
                setRecords([]);
            } else {
                setRecords(data || []);
            }
        } catch (err) {
            console.error('Error:', err);
            setRecords([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let base64Image = "";

            if (image) {
                base64Image = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(image);
                });
            }

            const { error } = await supabase
                .from('streamrecords')
                .insert([
                    {
                        title,
                        desc,
                        thumbnail: base64Image,
                        date: new Date().toISOString()
                    }
                ]);

            if (error) {
                console.error('Error saving to Supabase:', error);
                alert('Failed to save record: ' + error.message);
                setLoading(false);
                return;
            }

            // Reset form
            setTitle('');
            setDesc('');
            setImage(null);
            setIsAdding(false);

            // Refresh list
            fetchRecords();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to save record: ' + (err instanceof Error ? err.message : String(err)));
            setLoading(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const deleteRecord = async (id: number) => {
        const password = window.prompt("Enter password to delete this record:");
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "patilplays";

        if (password !== ADMIN_PASSWORD) {
            alert("Incorrect password!");
            return;
        }

        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                const { error } = await supabase
                    .from('streamrecords')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Error deleting record:', error);
                    alert('Failed to delete record: ' + error.message);
                    return;
                }

                const updatedRecords = records.filter(record => record.id !== id);
                setRecords(updatedRecords);
            } catch (err) {
                console.error('Error:', err);
                alert('Failed to delete record: ' + (err instanceof Error ? err.message : String(err)));
            }
        }
    };

    const startEdit = (record: StreamRecord) => {
        const password = window.prompt("Enter password to edit this record:");
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "patilplays";

        if (password !== ADMIN_PASSWORD) {
            alert("Incorrect password!");
            return;
        }

        setEditingRecord(record);
        setEditTitle(record.title);
        setEditDesc(record.desc);
    };

    const cancelEdit = () => {
        setEditingRecord(null);
        setEditTitle('');
        setEditDesc('');
    };

    const saveEdit = async () => {
        if (!editingRecord) return;

        try {
            const { error } = await supabase
                .from('streamrecords')
                .update({
                    title: editTitle,
                    desc: editDesc,
                })
                .eq('id', editingRecord.id);

            if (error) {
                console.error('Error updating record:', error);
                alert('Failed to update record: ' + error.message);
                return;
            }

            const updatedRecords = records.map(record =>
                record.id === editingRecord.id
                    ? { ...record, title: editTitle, desc: editDesc }
                    : record
            );
            setRecords(updatedRecords);

            cancelEdit();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to update record: ' + (err instanceof Error ? err.message : String(err)));
        }
    };

    const downloadImage = (base64Data?: string, fileName?: string) => {
        if (!base64Data) return;

        const firstWord = fileName?.trim().split(/\s+/)[0] || 'thumbnail';
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = `${firstWord}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied!`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 overflow-x-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 sm:mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-500">Stream Thumbnails</h1>
                        <p className="text-gray-400 mt-2 text-sm sm:text-base">Create and manage your stream thumbnails</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition text-sm sm:text-base"
                    >
                        {isAdding ? '✕ Cancel' : '+ Add Thumbnail'}
                    </button>
                </div>

                {/* Add New Thumbnail Form */}
                {isAdding && (
                    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 mb-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-red-500">New Stream Thumbnail</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-300 text-sm sm:text-base">Stream Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white text-sm sm:text-base"
                                    placeholder="Enter title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-300 text-sm sm:text-base">Description</label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white text-sm sm:text-base"
                                    placeholder="Paste description here..."
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-300 text-sm sm:text-base">Thumbnail Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-xs sm:text-sm text-gray-400 file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-1/3 bg-red-600 hover:bg-red-700 py-3 rounded font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {loading ? 'Saving...' : '💾 Save Thumbnail'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Thumbnails List */}
                {loading && records.length === 0 ? (
                    <div className="text-center py-12 sm:py-20 bg-gray-800 rounded-lg border border-dashed border-gray-600">
                        <p className="text-gray-400 text-base sm:text-lg">Loading...</p>
                    </div>
                ) : records.length === 0 ? (
                    <div className="text-center py-12 sm:py-20 bg-gray-800 rounded-lg border border-dashed border-gray-600">
                        <p className="text-gray-400 text-base sm:text-lg">No thumbnails yet. Click "Add Thumbnail" to create one!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-6 w-full">
                        {records.map((item) => (
                            <div key={item.id} className="bg-gray-800 p-3 sm:p-4 md:p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 shadow-lg overflow-hidden">
                                {/* Thumbnail Section */}
                                <div className="relative w-full md:w-64 lg:w-72 shrink-0 min-w-0">
                                    {item.thumbnail ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-600 bg-black">
                                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => downloadImage(item.thumbnail, item.title)}
                                                className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 active:opacity-100 transition-opacity flex items-center justify-center text-xs sm:text-sm font-semibold"
                                            >
                                                📥 Download Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center text-gray-500">No Image</div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    {editingRecord?.id === item.id ? (
                                        /* Edit Mode */
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-300">Title</label>
                                                <input
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-300">Description</label>
                                                <textarea
                                                    rows={4}
                                                    value={editDesc}
                                                    onChange={(e) => setEditDesc(e.target.value)}
                                                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
                                                ></textarea>
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={saveEdit}
                                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-bold transition"
                                                >
                                                    💾 Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm font-bold transition"
                                                >
                                                    ✕ Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* View Mode */
                                        <>
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight pr-2 sm:pr-4 break-words flex-1">{item.title}</h2>
                                                    <div className="flex gap-1 sm:gap-2">
                                                        <button
                                                            onClick={() => startEdit(item)}
                                                            className="text-gray-500 hover:text-blue-500 active:text-blue-600 transition-colors p-1.5 sm:p-1"
                                                            title="Edit Record"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                        </button>
                                                        <button
                                                            onClick={() => deleteRecord(item.id)}
                                                            className="text-gray-500 hover:text-red-500 active:text-red-600 transition-colors p-1.5 sm:p-1"
                                                            title="Delete Record"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-xs sm:text-sm whitespace-pre-wrap line-clamp-3 mb-2 sm:mb-3">{item.desc}</p>
                                                <p className="text-xs sm:text-sm font-semibold text-gray-300 mt-2 sm:mt-3">Stream End:</p>
                                                <p className="text-gray-400 text-xs sm:text-sm whitespace-pre-wrap line-clamp-2 mb-2 sm:mb-3">{STREAM_END_TEXT}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                                                <button onClick={() => downloadImage(item.thumbnail, item.title)} className="text-xs sm:text-sm bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-3 sm:px-4 py-2 rounded transition-colors">
                                                    ⬇ Image
                                                </button>
                                                <button onClick={() => copyToClipboard(item.title, 'Title')} className="text-xs sm:text-sm bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-3 sm:px-4 py-2 rounded transition-colors">
                                                    📋 Title
                                                </button>
                                                <button onClick={() => copyToClipboard(item.desc, 'Description')} className="text-xs sm:text-sm bg-gray-700 hover:bg-gray-600 active:bg-gray-500 px-3 sm:px-4 py-2 rounded transition-colors">
                                                    📋 Desc
                                                </button>
                                                <span className="text-[10px] sm:text-xs self-center font-mono text-gray-500 ml-auto hidden md:block">{item.date}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
