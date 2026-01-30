"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export const dynamic = 'force-dynamic';

interface Highlight {
    id: number;
    stream_title: string;
    stream_date: string;
    timestamps: string;
    created_at?: string;
}

export default function HighlightsPage() {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form states
    const [streamTitle, setStreamTitle] = useState('');
    const [streamDate, setStreamDate] = useState('');
    const [timestamps, setTimestamps] = useState('');

    // Edit states
    const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
    const [editStreamTitle, setEditStreamTitle] = useState('');
    const [editStreamDate, setEditStreamDate] = useState('');
    const [editTimestamps, setEditTimestamps] = useState('');

    useEffect(() => {
        fetchHighlights();
    }, []);

    const fetchHighlights = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('highlights')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching highlights:', error);
                setHighlights([]);
            } else {
                setHighlights(data || []);
            }
        } catch (err) {
            console.error('Error:', err);
            setHighlights([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('highlights')
                .insert([
                    {
                        stream_title: streamTitle,
                        stream_date: streamDate,
                        timestamps: timestamps
                    }
                ]);

            if (error) {
                console.error('Error saving highlight:', error);
                alert('Failed to save highlight: ' + error.message);
                setLoading(false);
                return;
            }

            // Reset form
            setStreamTitle('');
            setStreamDate('');
            setTimestamps('');
            setIsAdding(false);

            // Refresh list
            fetchHighlights();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to save highlight: ' + (err instanceof Error ? err.message : String(err)));
            setLoading(false);
        }
    };

    const deleteHighlight = async (id: number) => {
        const password = window.prompt("Enter password to delete this highlight:");
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "patilplays";

        if (password !== ADMIN_PASSWORD) {
            alert("Incorrect password!");
            return;
        }

        if (window.confirm("Are you sure you want to delete this highlight?")) {
            try {
                const { error } = await supabase
                    .from('highlights')
                    .delete()
                    .eq('id', id);

                if (error) {
                    console.error('Error deleting highlight:', error);
                    alert('Failed to delete highlight: ' + error.message);
                    return;
                }

                const updatedHighlights = highlights.filter(h => h.id !== id);
                setHighlights(updatedHighlights);
            } catch (err) {
                console.error('Error:', err);
                alert('Failed to delete highlight: ' + (err instanceof Error ? err.message : String(err)));
            }
        }
    };

    const startEdit = (highlight: Highlight) => {
        const password = window.prompt("Enter password to edit this highlight:");
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "patilplays";

        if (password !== ADMIN_PASSWORD) {
            alert("Incorrect password!");
            return;
        }

        setEditingHighlight(highlight);
        setEditStreamTitle(highlight.stream_title);
        setEditStreamDate(highlight.stream_date);
        setEditTimestamps(highlight.timestamps);
    };

    const cancelEdit = () => {
        setEditingHighlight(null);
        setEditStreamTitle('');
        setEditStreamDate('');
        setEditTimestamps('');
    };

    const saveEdit = async () => {
        if (!editingHighlight) return;

        try {
            const { error } = await supabase
                .from('highlights')
                .update({
                    stream_title: editStreamTitle,
                    stream_date: editStreamDate,
                    timestamps: editTimestamps,
                })
                .eq('id', editingHighlight.id);

            if (error) {
                console.error('Error updating highlight:', error);
                alert('Failed to update highlight: ' + error.message);
                return;
            }

            const updatedHighlights = highlights.map(h =>
                h.id === editingHighlight.id
                    ? { ...h, stream_title: editStreamTitle, stream_date: editStreamDate, timestamps: editTimestamps }
                    : h
            );
            setHighlights(updatedHighlights);

            cancelEdit();
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to update highlight: ' + (err instanceof Error ? err.message : String(err)));
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied!`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 sm:mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-red-500">Stream Highlights</h1>
                        <p className="text-gray-400 mt-2 text-sm sm:text-base">Store timestamps and highlights from your streams</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition text-sm sm:text-base"
                    >
                        {isAdding ? '✕ Cancel' : '+ Add Highlight'}
                    </button>
                </div>

                {/* Add New Highlight Form */}
                {isAdding && (
                    <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 mb-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-red-500">New Stream Highlight</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-300 text-sm sm:text-base">Stream Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white text-sm sm:text-base"
                                    placeholder="e.g., Stream 30 Jan"
                                    value={streamTitle}
                                    onChange={(e) => setStreamTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-300 text-sm sm:text-base">Stream Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white text-sm sm:text-base"
                                    value={streamDate}
                                    onChange={(e) => setStreamDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-300 text-sm sm:text-base">Timestamps & Highlights</label>
                                <textarea
                                    rows={6}
                                    required
                                    className="w-full p-2 sm:p-3 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white text-sm sm:text-base font-mono"
                                    placeholder="00:47:12 – 1v3 clutch B site&#10;01:22:40 – Ace with AK&#10;02:05:10 – insane flick"
                                    value={timestamps}
                                    onChange={(e) => setTimestamps(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-1">Tip: Use format "HH:MM:SS – description"</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {loading ? 'Saving...' : '💾 Save Highlight'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Highlights List */}
                {loading && highlights.length === 0 ? (
                    <div className="text-center py-12 sm:py-20 bg-gray-800 rounded-lg border border-dashed border-gray-600">
                        <p className="text-gray-400 text-base sm:text-lg">Loading...</p>
                    </div>
                ) : highlights.length === 0 ? (
                    <div className="text-center py-12 sm:py-20 bg-gray-800 rounded-lg border border-dashed border-gray-600">
                        <p className="text-gray-400 text-base sm:text-lg">No highlights yet. Click "Add Highlight" to create one!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-6">
                        {highlights.map((highlight) => (
                            <div key={highlight.id} className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg">
                                {editingHighlight?.id === highlight.id ? (
                                    /* Edit Mode */
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-300">Stream Title</label>
                                            <input
                                                type="text"
                                                value={editStreamTitle}
                                                onChange={(e) => setEditStreamTitle(e.target.value)}
                                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-300">Stream Date</label>
                                            <input
                                                type="date"
                                                value={editStreamDate}
                                                onChange={(e) => setEditStreamDate(e.target.value)}
                                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-medium text-gray-300">Timestamps</label>
                                            <textarea
                                                rows={6}
                                                value={editTimestamps}
                                                onChange={(e) => setEditTimestamps(e.target.value)}
                                                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white font-mono"
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
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Stream Title</p>
                                                <h2 className="text-xl sm:text-2xl font-bold text-white">{highlight.stream_title}</h2>
                                            </div>
                                            <div className="flex gap-1 sm:gap-2 ml-4">
                                                <button
                                                    onClick={() => startEdit(highlight)}
                                                    className="text-gray-500 hover:text-blue-500 transition-colors p-1"
                                                    title="Edit Highlight"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => deleteHighlight(highlight.id)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                                    title="Delete Highlight"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Stream Date</p>
                                            <p className="text-gray-300 text-sm">{highlight.stream_date}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Timestamps & Highlights</p>
                                            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                                                <pre className="text-gray-300 text-sm sm:text-base whitespace-pre-wrap font-mono">{highlight.timestamps}</pre>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 sm:gap-3">
                                            <button
                                                onClick={() => copyToClipboard(highlight.timestamps, 'Timestamps')}
                                                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 sm:px-3 py-2 rounded"
                                            >
                                                📋 Copy Timestamps
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(`${highlight.stream_title}\n${highlight.stream_date}\n\n${highlight.timestamps}`, 'Full Highlight')}
                                                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 sm:px-3 py-2 rounded"
                                            >
                                                📋 Copy All
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
