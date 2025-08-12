'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import { getFeaturedItems } from './lib/menuService';
import { MenuItem } from './lib/menuData';
import MenuImage from "./components/MenuImage";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load featured items from database
  useEffect(() => {
    async function loadFeatured() {
      try {
        const items = await getFeaturedItems();
        setFeaturedItems(items);
      } catch (error) {
        console.error('Failed to load featured items:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Direct Action Header - No Hero */}
      <section className="bg-pure-white py-8 border-b-2 border-napoli-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-dark-gray mb-3 leading-tight">
              Syracuse&apos;s Best NY-Style Pizza
            </h1>
            <p className="font-inter text-xl text-napoli-red font-semibold mb-6">
              Authentic NY-Style • <a href="tel:315-218-5837" className="hover:underline">315-218-5837</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <button onClick={() => setIsOrderModalOpen(true)} className="btn-primary text-xl px-12 py-4">
                ORDER NOW
              </button>
              <Link href="/menu" className="btn-secondary text-xl px-12 py-4">
                VIEW MENU
              </Link>
              <a href="tel:315-218-5837" className="bg-pure-white text-napoli-red px-12 py-4 rounded-lg font-inter font-bold hover:bg-gray-100 transition-colors text-xl">
                CALL TO ORDER
              </a>
            </div>
            <p className="font-inter text-sm text-medium-gray">
              Corner of Taft & Buckley Rd • Authentic NY-Style Pizza
            </p>
          </div>
        </div>
      </section>

      {/* Best-Selling Pizzas */}
      <section className="py-12 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-dark-gray mb-2">
              Most Popular Pizzas
            </h2>
            <p className="font-inter text-lg text-medium-gray">
              Order these customer favorites - made fresh when you order
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-napoli-red mx-auto mb-4"></div>
              <p className="font-inter text-medium-gray">Loading featured items...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredItems.slice(0, 3).map((item, index) => (
                <div key={item.id} className="bg-pure-white border-2 border-soft-gray rounded-lg hover:border-napoli-red transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-napoli-red text-pure-white text-xs px-3 py-1 rounded-full font-inter font-bold">
                        #{index + 1} MOST POPULAR
                      </span>
                    </div>
                    <MenuImage
                      src={item.images[0] || '/brand/social-preview.jpg'}
                      alt={item.name}
                      fill
                      priority={index === 0} // First featured item gets priority
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="font-poppins text-xl font-bold text-dark-gray mb-1">
                        {item.name}
                      </h3>
                      <p className="font-inter text-medium-gray text-sm leading-relaxed">
                        {item.description || 'Fresh ingredients, authentic NY-style preparation'}
                      </p>
                    </div>
                    <div className="mb-4">
                      <span className="font-inter text-xs text-napoli-red font-semibold bg-red-50 px-2 py-1 rounded">
                        CUSTOMER FAVORITE
                      </span>
                    </div>
                  <button 
                    onClick={() => setIsOrderModalOpen(true)} 
                    className="w-full btn-primary text-lg py-3 font-bold hover:scale-105 transition-transform"
                  >
                    ORDER THIS PIZZA
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ready to Order with Mike's Photo */}
      <section className="py-12 bg-napoli-red text-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-poppins text-2xl font-bold">
              Ready to Order?
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
            <div>
              <Image
                src="/brand/mike_oven.webp"
                alt="Mike Perrucci at the oven making fresh pizza"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
                style={{ height: 'auto' }}
              />
            </div>
            
            <div className="flex flex-col gap-4">
              <button onClick={() => setIsOrderModalOpen(true)} className="btn-secondary text-lg px-8 py-3">
                ORDER PIZZA NOW
              </button>
              <Link href="/menu" className="bg-pure-white text-napoli-red px-8 py-3 rounded-lg font-inter font-bold hover:bg-gray-100 transition-colors text-center">
                VIEW FULL MENU
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Info */}
      <section className="py-8 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-inter font-bold text-dark-gray mb-2">📍 LOCATION</h3>
              <p className="font-inter text-sm text-medium-gray">
                <a 
                  href="https://www.google.com/maps?sca_esv=7d0b40d4ccf1baac&sxsrf=AE3TifOjiT2tdONIsxp2P3GWtQSgeaRCDw:1754431850099&lsig=AB86z5V_3OvHJY-uRTaGnVI7yqpx&biw=2880&bih=1366&dpr=0.67&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KaGQjjIA7dmJMSYtIq9idRJw&daddr=5194+W+Taft+Rd,+North+Syracuse,+NY+13212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-napoli-red transition-colors"
                >
                  5194 W. Taft Rd, North Syracuse
                </a><br />
                (Corner of Taft & Buckley Rd)
              </p>
            </div>
            <div>
              <h3 className="font-inter font-bold text-dark-gray mb-2">🕒 HOURS</h3>
              <p className="font-inter text-sm text-medium-gray">
                Mon-Thu: 11am-8pm • Fri: 11am-9pm<br />
                Sat: 11am-8pm • Sun: Closed
              </p>
            </div>
            <div>
              <h3 className="font-inter font-bold text-dark-gray mb-2">📞 ORDER</h3>
              <p className="font-inter text-sm text-medium-gray">
                <a href="tel:315-218-5837" className="text-napoli-red font-bold">315-218-5837</a><br />
                Or order online below
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer onOrderClick={() => setIsOrderModalOpen(true)} />
      
      {/* Order Modal */}
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
}
