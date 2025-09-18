'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const orderingOptions = [
    {
      name: "Toast Online Ordering",
      description: "Order directly from Napoli - Primary ordering platform",
      url: "https://www.toasttab.com/local/order/napoli-pizzeria-syracuse-5194-west-taft-road-c/r-0abcda36-6edb-4213-804a-81c9fba9f522",
      primary: true,
      type: "pickup"
    },
    {
      name: "Toast Delivery",
      description: "Delivery through Toast platform",
      url: "https://www.toasttab.com/local/order/napoli-pizzeria-syracuse-5194-west-taft-road-c/r-0abcda36-6edb-4213-804a-81c9fba9f522?diningOption=delivery",
      primary: false,
      type: "delivery"
    },
    {
      name: "Uber Eats",
      description: "Order for delivery through Uber Eats",
      url: "https://www.ubereats.com/store/napoli-pizzeria-taft-rd/-rMPBrC3UmazDQBghIZzug",
      primary: false,
      type: "delivery"
    },
    {
      name: "DoorDash",
      description: "Order for delivery through DoorDash",
      url: "https://www.doordash.com/store/napoli-pizzeria-syracuse-31031912/48708547/",
      primary: false,
      type: "delivery"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-pure-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-dark-gray text-pure-white px-6 py-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="/brand/napoli-logo-footer-white-font.png"
                  alt="Napoli Pizzeria"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <h2 className="font-poppins text-2xl font-semibold">Order Online</h2>
                  <p className="font-inter text-sm opacity-90">Choose your preferred ordering method</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-pure-white hover:text-red-200 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid gap-4">
              {orderingOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
                    option.primary 
                      ? 'border-napoli-red bg-napoli-red text-pure-white hover:bg-red-700' 
                      : 'border-soft-gray bg-pure-white text-dark-gray hover:border-napoli-red hover:bg-soft-gray'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-poppins text-lg font-semibold">
                          {option.name}
                        </h3>
                        {option.primary && (
                          <span className="bg-basil-green text-pure-white text-xs px-2 py-1 rounded-full font-inter font-semibold">
                            Recommended
                          </span>
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full font-inter font-semibold ${
                          option.type === 'pickup'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {option.type === 'pickup' ? 'Pickup' : 'Delivery'}
                        </span>
                      </div>
                      <p className={`font-inter text-sm mt-1 ${
                        option.primary ? 'text-red-100' : 'text-medium-gray'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      <svg
                        className={`h-5 w-5 ${option.primary ? 'text-pure-white' : 'text-napoli-red'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Call Option */}
            <div className="mt-6 pt-4 border-t border-soft-gray">
              <div className="text-center">
                <p className="font-inter text-medium-gray text-sm mb-3">
                  Prefer to call in your order?
                </p>
                <a
                  href="tel:315-218-5837"
                  className="inline-flex items-center space-x-2 btn-secondary"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Call (315) 218-5837</span>
                </a>
              </div>
            </div>

            {/* Hours Info */}
            <div className="mt-4 bg-soft-gray rounded-lg p-4">
              <h4 className="font-alegreya text-sm font-bold uppercase text-dark-gray mb-2">Hours</h4>
              <div className="font-inter text-xs text-medium-gray space-y-1">
                <div className="flex justify-between">
                  <span>Mon-Sat:</span>
                  <span>11am - 8pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sun:</span>
                  <span className="text-napoli-red">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}