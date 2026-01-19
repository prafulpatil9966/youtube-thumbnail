"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
// Correct import for Next.js 13/14/15 App Router
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function CreateThumbnail() {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  // Correctly typing the file state
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let base64Image = ""; 

      // Convert image to Base64 string if it exists
      if (image) {
        base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(image);
        });
      }

      // Save to Supabase
      const { data, error } = await supabase
        .from('streamrecords')
        .insert([
          {
            title,
            desc,
            thumbnail: base64Image,
            date: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Error saving to Supabase:', error);
        alert('Failed to save record. Please try again.');
        setLoading(false);
        return;
      }

      // Also save to localStorage as backup
      const newRecord = {
        id: Date.now(),
        title,
        desc,
        thumbnail: base64Image,
        date: new Date().toLocaleDateString()
      };
      const savedData = localStorage.getItem('streamRecords');
      const existingRecords = savedData ? JSON.parse(savedData) : [];
      localStorage.setItem('streamRecords', JSON.stringify([newRecord, ...existingRecords]));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to save record');
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Create New Thumbnail</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-xl">
          <div>
            <label className="block mb-1 font-medium text-gray-300">Stream Title</label>
            <input
              type="text"
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Description</label>
            <textarea
              rows={4}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
              placeholder="Paste description here..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-300">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Thumbnail'}
          </button>
        </form>
      </div>
    </div>
  );
}
