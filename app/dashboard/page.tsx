"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

interface StreamRecord {
    id: number;
    title: string;
    desc: string;
    thumbnail: string;
    date: string;
}

export default function Dashboard() {
    const [records, setRecords] = useState<StreamRecord[]>([]);
    const [loading, setLoading] = useState(true);
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
                // Fallback to localStorage if Supabase fails
                const savedData = JSON.parse(localStorage.getItem('streamRecords') || '[]');
                setRecords(savedData);
            } else {
                setRecords(data || []);
            }
        } catch (err) {
            console.error('Error:', err);
            // Fallback to localStorage
            const savedData = JSON.parse(localStorage.getItem('streamRecords') || '[]');
            setRecords(savedData);
        } finally {
            setLoading(false);
        }
    };

    // --- NEW: Delete Function with Password Protection ---
    const deleteRecord = async (id: number) => {
        // Prompt for password
        const password = window.prompt("Enter password to delete this record:");
        
        // Read password from environment variable
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "praful123";
        
        if (password !== ADMIN_PASSWORD) {
            alert("Incorrect password!");
            return;
        }
        
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                // Delete from Supabase
                const { error } = await supabase
                    .from('streamrecords')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Error deleting record:', error);
                    alert('Failed to delete record');
                    return;
                }

                // Update state to refresh UI
                const updatedRecords = records.filter(record => record.id !== id);
                setRecords(updatedRecords);
                
                // Also update localStorage as backup
                localStorage.setItem('streamRecords', JSON.stringify(updatedRecords));
                
                alert('Record deleted successfully!');
            } catch (err) {
                console.error('Error:', err);
                alert('Failed to delete record');
            }
        }
    };

    const downloadImage = (base64Data?: string, fileName?: string) => {
        if (!base64Data) return;
        debugger
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = `thumbnail.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied!`); // Simple feedback
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-red-500">My Thumbnails</h1>
                    <p className="text-gray-400 mt-2">View and manage all your saved thumbnails</p>
                </div>

                {records.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800 rounded-lg border border-dashed border-gray-600">
                        <p className="text-gray-400 text-lg">
                            {loading ? 'Loading...' : 'No records found.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {records.map((item) => (
                            <div key={item.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-6 shadow-lg relative group">

                                {/* Thumbnail Section */}
                                <div className="relative w-full md:w-64 flex-shrink-0">
                                    {item.thumbnail ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-600 bg-black">
                                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => downloadImage(item.thumbnail, item.title)}
                                                className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold"
                                            >
                                                Download Image
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="aspect-video rounded-lg bg-gray-700 flex items-center justify-center text-gray-500">No Image</div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-2xl font-bold text-white leading-tight pr-8">{item.title}</h2>

                                            {/* --- DELETE BUTTON (Top Right) --- */}
                                            <button
                                                onClick={() => deleteRecord(item.id)}
                                                className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                                title="Delete Record"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                            </button>
                                        </div>
                                        <p className="text-gray-400 text-sm whitespace-pre-wrap line-clamp-3 mb-4">{item.desc}</p>
                                        <p>Stream End:</p><p className="text-gray-400 text-sm whitespace-pre-wrap line-clamp-3 mb-4">{STREAM_END_TEXT}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        <button onClick={() => downloadImage(item.thumbnail, item.title)} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">
                                            ⬇ Image
                                        </button>
                                        <button onClick={() => copyToClipboard(item.title, 'Title')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">
                                            📋 Copy Title
                                        </button>
                                        <button onClick={() => copyToClipboard(item.desc, 'Description')} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">
                                            📋 Copy Desc
                                        </button>
                                        <span className="text-[10px] self-center font-mono text-gray-500 ml-auto">{item.date}</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}