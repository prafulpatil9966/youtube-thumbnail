"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            PatilPlaysYT
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Between Games & Life — FPS gameplay, ranked grinds, and honest moments.
          </p>

          {/* YouTube Channel Link */}
          <div className="mb-8 sm:mb-12">
            <a
              href="https://www.youtube.com/@PatilPlaysYT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Visit My YouTube Channel
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
          <Link
            href="/create"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 shadow-lg hover:shadow-xl text-center"
          >
            + Create New Stream
          </Link>
          <Link
            href="/dashboard"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition duration-200 shadow-lg hover:shadow-xl text-center"
          >
            View Saved Streams
          </Link>
        </div>

        {/* About Section */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sm:p-8 md:p-12 text-center mb-8 sm:mb-12 mx-4 sm:mx-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
            Between Games & Life
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Welcome to patilplaysyt — where gaming meets real life.<br />
            FPS gameplay, ranked grinds, chill streams, and honest moments.<br /><br />
            Some days are clutches, some days are learning — all part of the journey.<br /><br />
            Subscribe and join the grind, between games & life.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          <div className="bg-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700 hover:border-red-500 transition text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎮</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-red-500">Gaming Content</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              FPS gameplay, ranked matches, and gaming highlights
            </p>
          </div>

          <div className="bg-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700 hover:border-red-500 transition text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📺</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-red-500">Live Streams</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Catch live gameplay and chill sessions on YouTube
            </p>
          </div>

          <div className="bg-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700 hover:border-red-500 transition text-center sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💬</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-red-500">Community</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Join the journey between games and life
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}