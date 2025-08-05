'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OrderModal from './OrderModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <nav className="bg-pure-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center py-2">
            <Image
              src="/brand/napoli-logo-main.png"
              alt="Napoli Pizzeria"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-inter text-dark-gray hover:text-napoli-red transition-colors">
              Home
            </Link>
            <Link href="/menu" className="font-inter text-dark-gray hover:text-napoli-red transition-colors">
              Menu
            </Link>
            <a 
              href="https://www.facebook.com/profile.php?id=61566700086836" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-inter text-dark-gray hover:text-napoli-red transition-colors"
            >
              Specials
            </a>
            <Link href="/story" className="font-inter text-dark-gray hover:text-napoli-red transition-colors">
              Our Story
            </Link>
            <Link href="/catering" className="font-inter text-dark-gray hover:text-napoli-red transition-colors">
              Catering
            </Link>
            <button onClick={openOrderModal} className="btn-primary">
              Order Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-dark-gray hover:text-napoli-red focus:outline-none focus:text-napoli-red"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-pure-white border-t border-soft-gray">
              <Link
                href="/"
                className="block px-3 py-2 font-inter text-dark-gray hover:text-napoli-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-3 py-2 font-inter text-dark-gray hover:text-napoli-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61566700086836"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 font-inter text-dark-gray hover:text-napoli-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Specials
              </a>
              <Link
                href="/story"
                className="block px-3 py-2 font-inter text-dark-gray hover:text-napoli-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>
              <Link
                href="/catering"
                className="block px-3 py-2 font-inter text-dark-gray hover:text-napoli-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Catering
              </Link>
              <button
                onClick={openOrderModal}
                className="block w-full mx-3 my-2 btn-primary text-center"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Order Modal */}
      <OrderModal isOpen={isOrderModalOpen} onClose={closeOrderModal} />
    </nav>
  );
} 