'use client';

import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import OrderModal from '../components/OrderModal';
import { getMenuData } from '../lib/menuService';
import { MenuCategory } from '../lib/menuData';
import MenuImage from '../components/MenuImage';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Load menu data from database
  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await getMenuData();
        setMenuData(data);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  // Set initial active category
  useEffect(() => {
    if (menuData.length > 0 && !activeCategory) {
      setActiveCategory(menuData[0].name);
    }
  }, [menuData, activeCategory]);

  // Ultra simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (userClicked) return; // Don't update if user just clicked
      
      const topOffset = 200; // Account for sticky headers
      let currentCategory = '';
      
      // Find which category is currently at the top
      for (const category of menuData) {
        const element = document.getElementById(`category-${category.name}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= topOffset) {
            currentCategory = category.name;
          }
        }
      }
      
      if (currentCategory && currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuData, userClicked, activeCategory]);

  // Clear user click flag after delay
  useEffect(() => {
    if (userClicked) {
      const timer = setTimeout(() => setUserClicked(false), 800);
      return () => clearTimeout(timer);
    }
  }, [userClicked]);

  const scrollToCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    setUserClicked(true); // Prevent auto-update for 1 second
    
    const element = document.getElementById(`category-${categoryName}`);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 180;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Category bar scroll functions
  const scrollCategoryBar = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll-container');
    if (container) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Check scroll position for arrows
  const handleCategoryScroll = () => {
    const container = document.getElementById('category-scroll-container');
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < (container.scrollWidth - container.clientWidth - 10)
      );
    }
  };

  // Set up arrow visibility on load
  useEffect(() => {
    if (menuData.length > 0) {
      setTimeout(() => {
        handleCategoryScroll();
        const container = document.getElementById('category-scroll-container');
        if (container) {
          container.addEventListener('scroll', handleCategoryScroll);
          return () => container.removeEventListener('scroll', handleCategoryScroll);
        }
      }, 100);
    }
  }, [menuData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pure-white">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-napoli-red mx-auto mb-4"></div>
            <p className="font-inter text-medium-gray">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Quick Order Header */}
      <section className="bg-pure-white py-8 border-b border-soft-gray" id="menu-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-dark-gray">
                Napoli Pizzeria Menu
              </h1>
              <p className="font-inter text-sm text-medium-gray">
                📞 <a href="tel:315-218-5837" className="hover:underline">315-218-5837</a> • Fresh Made When You Order • Authentic NY-Style
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsOrderModalOpen(true)} className="btn-primary px-6 py-3 font-bold">
                ORDER NOW
              </button>
              <a href="tel:315-218-5837" className="btn-secondary px-6 py-3 font-bold">
                CALL
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Navigation */}
      <div className="sticky top-16 z-40 bg-pure-white shadow-lg border-b border-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Left Arrow - Desktop Only */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategoryBar('left')}
                className="hidden lg:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-pure-white shadow-lg rounded-full w-10 h-10 items-center justify-center hover:bg-soft-gray transition-colors border border-soft-gray"
                aria-label="Scroll categories left"
              >
                <svg className="w-5 h-5 text-dark-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Category Buttons */}
            <div 
              id="category-scroll-container"
              className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-4 py-3 sm:justify-start lg:justify-start lg:pl-12 lg:pr-12"
            >
              {menuData.map((category) => (
                <button
                  key={category.name}
                  onClick={() => scrollToCategory(category.name)}
                  className={`font-inter text-xs sm:text-sm font-bold uppercase whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeCategory === category.name
                      ? 'bg-napoli-red text-pure-white shadow-md'
                      : 'text-dark-gray hover:text-napoli-red hover:bg-soft-gray'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Right Arrow - Desktop Only */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategoryBar('right')}
                className="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-pure-white shadow-lg rounded-full w-10 h-10 items-center justify-center hover:bg-soft-gray transition-colors border border-soft-gray"
                aria-label="Scroll categories right"
              >
                <svg className="w-5 h-5 text-dark-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {menuData.map((category) => (
          <div key={category.name} id={`category-${category.name}`} className="mb-16">
            <div id={`category-header-${category.name}`} className="text-center mb-8 pt-8">
              <h2 className="font-poppins text-2xl sm:text-3xl font-bold text-dark-gray mb-2 flex items-center justify-center gap-3">
                {category.name}
                {(category.name === 'Pizza' || category.name === 'Specialty Pizza') && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    🌾 GF Available
                  </span>
                )}
              </h2>
              {category.subtitle && (
                <p className="font-inter text-lg text-napoli-red font-semibold mb-3">
                  {category.subtitle}
                </p>
              )}
              
              {/* Display category info (dressings, sauces, toppings) */}
              {category.categoryInfo && category.categoryInfo.length > 0 && (
                <div className="max-w-4xl mx-auto space-y-2">
                  {category.categoryInfo.map((info) => (
                    <div key={info.id} className="text-center">
                      <p className="font-inter text-sm font-semibold text-dark-gray capitalize mb-1">
                        {info.infoType === 'dressings' && '🥗 Available Dressings:'}
                        {info.infoType === 'sauces' && '🌶️ Available Sauces:'}
                        {info.infoType === 'toppings' && '🍕 Available Toppings:'}
                        {info.infoType === 'included' && '✅ Included:'}
                        {info.infoType === 'options' && '⚙️ Options:'}
                        {!['dressings', 'sauces', 'toppings', 'included', 'options'].includes(info.infoType) && `${info.infoType}:`}
                      </p>
                      <p className="font-inter text-sm text-medium-gray leading-relaxed">
                        {info.infoText}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {category.shared_options && (
                <div className="max-w-3xl mx-auto mt-3">
                  <p className="font-inter text-sm text-medium-gray">
                    {category.shared_options}
                  </p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <div key={item.id} className="bg-pure-white border-2 border-soft-gray rounded-lg hover:border-napoli-red transition-all duration-300 overflow-hidden group">
                  <div className="relative w-full overflow-hidden bg-soft-gray flex items-center justify-center" style={{aspectRatio: '16/9'}}>
                    {item.featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-napoli-red text-pure-white text-xs px-3 py-1 rounded-full font-inter font-bold">
                          MOST POPULAR
                        </span>
                      </div>
                    )}
                    <MenuImage
                      src={item.images[0] || '/brand/social-preview.jpg'}
                      alt={item.name}
                      fill
                      priority={category.display_order === 1 && item.display_order <= 6} // First category's first 6 items get priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="font-poppins text-xl font-bold text-dark-gray mb-1">
                        {item.name}
                      </h3>
                      <p className="font-inter text-medium-gray text-sm leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Removed pricing display - customers will see pricing when ordering */}
                    
                    {Object.keys(item.size_variants).length > 0 && (
                      <div className="mb-4 p-3 bg-soft-gray rounded-lg">
                        <p className="font-inter text-xs text-dark-gray font-semibold mb-1">
                          {/* Smart variant labeling based on variant names */}
                          {Object.keys(item.size_variants).some(v => v.toLowerCase().includes('inch') || v.toLowerCase().includes('size') || v.toLowerCase().includes('small') || v.toLowerCase().includes('large')) 
                            ? 'Multiple sizes available' 
                            : 'Additional options available'}
                        </p>
                        <p className="font-inter text-xs text-medium-gray">
                          {Object.entries(item.size_variants).map(([name]) => name).join(' • ')}
                        </p>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setIsOrderModalOpen(true)} 
                      className="w-full btn-primary text-lg py-3 font-bold hover:scale-105 transition-transform"
                    >
                      ORDER NOW
                    </button>
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