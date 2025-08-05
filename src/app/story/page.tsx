'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OrderModal from '../components/OrderModal';

export default function Story() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Story Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Mike's Photo */}
            <div className="relative">
              <Image
                src="/photos/mike-owner.jpg"
                alt="Mike Perrucci, Owner of Napoli Pizzeria"
                width={600}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-napoli-red text-pure-white p-4 rounded-lg">
                <p className="font-alegreya text-sm uppercase font-bold">Mike Perrucci</p>
                <p className="font-inter text-xs">Owner & Founder</p>
              </div>
            </div>

            {/* Story Content */}
            <div className="space-y-6">
              <h1 className="font-poppins text-3xl font-semibold text-dark-gray">
                About Us – Napoli Pizzeria
              </h1>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                At Napoli Pizzeria, we believe pizza is more than food — it&apos;s a craft, a conversation, and a connection to tradition.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                Owner and head pizzaiolo <span className="font-semibold text-dark-gray">Mike Perrucci</span> has spent decades in the pizza industry, perfecting his dough, mastering old-school techniques, and staying true to the fundamentals that make a great pie unforgettable. Every pizza that leaves the oven at Napoli is made with purpose — using quality ingredients, consistent technique, and just the right balance of heart and heat.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                We&apos;re proud to serve <span className="font-semibold text-dark-gray">authentic NY-style pizza</span> that reflects the best of both worlds: big city flavor, small town hospitality. Whether you&apos;re grabbing a slice on your lunch break, feeding the whole family, or catering a group at the hospital down the road — we make sure every order hits the mark.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                Mike&apos;s always around — tossing dough, checking the ovens, or chatting with customers at the counter. His philosophy is simple: <span className="italic">&quot;Make the kind of pizza you&apos;d be proud to serve your friends and family — every single time.&quot;</span> And it shows.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                So if you&apos;re nearby, stop in and say hey. We&apos;d love to make you something great.
              </p>
              <div className="bg-soft-gray p-6 rounded-lg">
                <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-3">
                  Good pizza. Good people. Napoli Pizzeria.
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => setIsOrderModalOpen(true)} 
                  className="btn-primary text-lg px-8 py-3"
                >
                  ORDER NOW
                </button>
                <a href="tel:315-218-5837" className="btn-secondary text-lg px-8 py-3">
                  CALL US
                </a>
              </div>
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