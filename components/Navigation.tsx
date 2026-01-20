"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/create', label: 'Create Thumbnail' },
        { href: '/dashboard', label: 'View Thumbnails' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-red-500 font-bold text-xl">
                            YT Thumbnail Manager
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                                    pathname === link.href
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
