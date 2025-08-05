'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OrderModal from '../components/OrderModal';
import { getMenuData, formatPrice, getSizeVariantsString } from '../lib/menuData';
import { getMenuItemImage } from '../lib/imageMapping';
import MenuImage from '../components/MenuImage';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const menuData = getMenuData();

  useEffect(() => {
    if (menuData.length > 0) {
      setActiveCategory(menuData[0].name);
    }
  }, [menuData]);

  const scrollToCategory = (categoryName: string) => {
    const element = document.getElementById(`category-${categoryName}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveCategory(categoryName);
  };

  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-soft-gray">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/menuPics/pizza-margherita.jpg"
            alt="Napoli Pizzeria Menu - Fresh Margherita Pizza"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center text-pure-white px-4 max-w-3xl mx-auto">
          <h1 className="font-poppins text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-shadow leading-tight">
            our menu
          </h1>
          <p className="font-inter text-lg sm:text-xl mb-4 text-shadow leading-relaxed">
            Authentic NY-style pizza and Italian cuisine
          </p>
        </div>
      </section>

      {/* Menu Header */}
      <section className="bg-soft-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-gray mb-6 leading-tight">
            our menu
          </h1>
          <p className="font-inter text-lg sm:text-xl text-medium-gray mb-8 leading-relaxed max-w-2xl mx-auto">
            Authentic NY-style pizza and Italian cuisine
          </p>
          <div className="dashed-divider w-24 mx-auto"></div>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-40 bg-pure-white shadow-lg border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-4 py-3">
            {menuData.map((category) => (
              <button
                key={category.name}
                onClick={() => scrollToCategory(category.name)}
                className={`font-alegreya text-xs sm:text-sm font-bold uppercase whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeCategory === category.name
                    ? 'bg-napoli-red text-pure-white shadow-md scale-105'
                    : 'text-dark-gray hover:text-napoli-red hover:bg-soft-gray'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {menuData.map((category) => (
          <div key={category.name} id={`category-${category.name}`} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-poppins text-2xl sm:text-3xl lg:text-4xl font-semibold text-dark-gray mb-6 leading-tight">
                {category.name.toLowerCase()}
              </h2>
              <div className="dashed-divider w-16 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {category.items.map((item) => (
                <div key={item.id} className="card group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <MenuImage
                      src={getMenuItemImage(item.id, item.name, item.category)}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-2">
                        <h3 className="font-poppins text-lg sm:text-xl font-semibold text-dark-gray leading-tight">
                          {item.name.toLowerCase()}
                        </h3>
                        {item.italian_name && (
                          <p className="font-alegreya text-xs sm:text-sm text-napoli-red uppercase mt-1">
                            {item.italian_name}
                          </p>
                        )}
                      </div>
                      <span className="font-inter font-bold text-napoli-red text-lg sm:text-xl flex-shrink-0">
                        {formatPrice(item.base_price)}
                      </span>
                    </div>
                    
                    <p className="font-inter text-medium-gray text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {Object.keys(item.size_variants).length > 0 && (
                      <div className="mb-4 p-3 bg-soft-gray rounded-lg">
                        <p className="font-alegreya text-xs text-dark-gray font-bold uppercase tracking-wide mb-2">
                          Available Sizes
                        </p>
                        <p className="font-inter text-sm text-dark-gray">
                          {getSizeVariantsString(item.size_variants)}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center space-x-2">
                        {item.featured && (
                          <span className="bg-basil-green text-pure-white text-xs px-3 py-1 rounded-full font-alegreya font-bold uppercase tracking-wide">
                            Featured
                          </span>
                        )}
                      </div>
                      <button onClick={() => setIsOrderModalOpen(true)} className="btn-primary text-sm px-4 py-2 hover:scale-105 transition-transform">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <section className="bg-napoli-red text-pure-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-semibold mb-4">
            ready to order?
          </h2>
          <p className="font-inter text-lg mb-8">
            Order online for pickup or delivery through our partners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setIsOrderModalOpen(true)} className="btn-secondary text-lg px-8 py-4">
              Order Online
            </button>
            <a
              href="tel:315-218-5837"
              className="bg-pure-white text-napoli-red px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>

      <Footer onOrderClick={() => setIsOrderModalOpen(true)} />
      
      {/* Order Modal */}
      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
} 