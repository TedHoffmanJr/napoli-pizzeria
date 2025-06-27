'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getMenuData, formatPrice, getSizeVariantsString } from '../utils/menuData';
import MenuImage from '../components/MenuImage';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('');
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
            src="/photos/cheese-pie-hero.jpg"
            alt="Napoli Pizzeria Menu Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" style={{backgroundColor:'rgba(214,19,44,0.18)'}}></div>
        </div>
        <div className="relative z-10 text-center text-pure-white px-4 max-w-3xl mx-auto">
          <h1 className="font-poppins text-5xl font-semibold mb-4 text-shadow" style={{marginTop:10, marginBottom:10}}>
            our menu
          </h1>
          <p className="font-inter text-xl mb-4 text-shadow">
            Authentic NY-style pizza and Italian cuisine
          </p>
        </div>
      </section>

      {/* Menu Header */}
      <section className="bg-soft-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins text-5xl font-semibold text-dark-gray mb-4">
            our menu
          </h1>
          <p className="font-inter text-xl text-medium-gray mb-8">
            Authentic NY-style pizza and Italian cuisine
          </p>
          <div className="dashed-divider w-24 mx-auto"></div>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-40 bg-pure-white shadow-md border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-8 py-4">
            {menuData.map((category) => (
              <button
                key={category.name}
                onClick={() => scrollToCategory(category.name)}
                className={`font-alegreya text-sm font-bold uppercase whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.name
                    ? 'bg-napoli-red text-pure-white'
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
              <h2 className="font-poppins text-3xl font-semibold text-dark-gray mb-4">
                {category.name}
              </h2>
              <div className="dashed-divider w-16 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <div key={item.id} className="card group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <MenuImage
                      src={`/menuPics/${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.jpg`}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-poppins text-xl font-semibold text-dark-gray">
                        {item.name.toLowerCase()}
                      </h3>
                      <span className="font-inter font-semibold text-napoli-red text-lg">
                        {formatPrice(item.base_price)}
                      </span>
                    </div>
                    
                    {item.italian_name && (
                      <p className="font-alegreya text-sm text-napoli-red uppercase mb-3">
                        {item.italian_name}
                      </p>
                    )}
                    
                    <p className="font-inter text-medium-gray text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    {Object.keys(item.size_variants).length > 0 && (
                      <div className="mb-4">
                        <p className="font-inter text-xs text-medium-gray uppercase tracking-wide mb-2">
                          Available Sizes:
                        </p>
                        <p className="font-inter text-sm text-dark-gray">
                          {getSizeVariantsString(item.size_variants)}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {item.featured && (
                          <span className="bg-basil-green text-pure-white text-xs px-2 py-1 rounded-full font-inter font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                      <Link href="/order" className="btn-primary text-sm px-4 py-2">
                        Order Now
                      </Link>
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
            <Link href="/order" className="btn-secondary text-lg px-8 py-4">
              Order Online
            </Link>
            <a
              href="tel:315-218-5837"
              className="bg-pure-white text-napoli-red px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 