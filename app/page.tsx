"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            YouTube Thumbnail Manager
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create, manage, and organize your YouTube thumbnails with ease. 
            Store titles, descriptions, and images all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/create"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              Create Thumbnail
            </Link>
            <Link
              href="/dashboard"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500 transition">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-3 text-red-500">Create Thumbnails</h3>
            <p className="text-gray-400">
              Upload and store your YouTube thumbnail images with associated metadata.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500 transition">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-3 text-red-500">Manage Content</h3>
            <p className="text-gray-400">
              Store titles, descriptions, and dates for easy reference and copying.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-red-500 transition">
            <div className="text-4xl mb-4">☁️</div>
            <h3 className="text-xl font-bold mb-3 text-red-500">Cloud Storage</h3>
            <p className="text-gray-400">
              Access your thumbnails from anywhere with secure cloud storage.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Streamline Your YouTube Workflow
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Save time and stay organized with a dedicated space for all your YouTube thumbnail assets and metadata.
          </p>
          <Link
            href="/create"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
}