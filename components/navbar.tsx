'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    // { label: 'Past Reads', href: '/past-reads' },
    // { label: 'Events', href: '/events' },
    { label: 'Members', href: '/members' },
    { label: 'About', href: '/about' },
    // { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:opacity-80 transition">
            CMU Africa Book Club
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="hover:opacity-80 transition text-white font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://chat.whatsapp.com/HgEi04TCqSzLObYOpopTNz?mode=hqrt1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-medium"
              >
                💬 Join WhatsApp
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="block hover:opacity-80 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://chat.whatsapp.com/your-group-link"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-medium"
              >
                💬 Join WhatsApp
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
