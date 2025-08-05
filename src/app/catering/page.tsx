'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const cateringPackages = [
  {
    id: 1,
    name: "Medical Center Lunch",
    description: "Perfect for medical staff and healthcare professionals",
    price: "Call for Pricing",
    includes: [
      "Choice of pizza (2-3 varieties)",
      "Fresh salads",
      "Garlic knots",
      "Beverages",
      "Paper goods included",
      "Minimum 10 people"
    ],
    idealFor: "Medical offices, clinics, healthcare facilities",
    image: "/photos/food-case.jpg"
  },
  {
    id: 2,
    name: "Office Catering",
    description: "Professional catering for corporate events and meetings",
    price: "Call for Pricing",
    includes: [
      "Assorted pizzas",
      "Antipasto platter",
      "Fresh salads",
      "Dessert selection",
      "Beverages",
      "Setup and cleanup included",
      "Minimum 15 people"
    ],
    idealFor: "Corporate meetings, office parties, business events",
    image: "/photos/counter-mike.jpg"
  },
  {
    id: 3,
    name: "Family Gathering",
    description: "Perfect for family celebrations and special occasions",
    price: "Call for Pricing",
    includes: [
      "Family-style Italian feast",
      "Multiple pizza varieties",
      "Pasta dishes",
      "Appetizers and salads",
      "Desserts",
      "Beverages",
      "Minimum 20 people"
    ],
    idealFor: "Birthdays, anniversaries, family reunions",
    image: "/photos/cheese-pie-hero.jpg"
  }
];

export default function Catering() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventDate: '',
    guestCount: '',
    package: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to Supabase
    console.log('Catering inquiry submitted:', formData);
    alert('Thank you for your catering inquiry! We&apos;ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      eventDate: '',
      guestCount: '',
      package: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Header */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-soft-gray">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/photos/hero-napoli.jpg"
            alt="Napoli Pizzeria Catering Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" style={{backgroundColor:'rgba(214,19,44,0.18)'}}></div>
        </div>
        <div className="relative z-10 text-center text-pure-white px-4 max-w-3xl mx-auto">
          <h1 className="font-poppins text-5xl font-semibold mb-4 text-shadow" style={{marginTop:10, marginBottom:10}}>
            catering services
          </h1>
          <p className="font-inter text-xl mb-4 text-shadow">
            Professional catering for offices, medical centers, and special events
          </p>
          <div className="dashed-divider w-24 mx-auto"></div>
        </div>
      </section>

      {/* Catering Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-semibold text-dark-gray mb-4">
              catering packages
            </h2>
            <p className="font-inter text-lg text-medium-gray">
              From medical center lunches to corporate events, we have the perfect package for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cateringPackages.map((pkg) => (
              <div key={pkg.id} className="card group hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-2">
                        {pkg.name.toLowerCase()}
                      </h3>
                    </div>
                  </div>

                  <p className="font-inter text-medium-gray text-sm mb-4">
                    {pkg.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="font-inter font-bold text-napoli-red text-lg">
                      {pkg.price}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-alegreya text-sm text-napoli-red uppercase mb-2">
                      Includes:
                    </h4>
                    <ul className="font-inter text-sm text-medium-gray space-y-1">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-basil-green mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-alegreya text-sm text-napoli-red uppercase mb-2">
                      Ideal For:
                    </h4>
                    <p className="font-inter text-sm text-medium-gray">
                      {pkg.idealFor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Inquiry Form */}
      <section className="py-16 bg-soft-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-semibold text-dark-gray mb-4">
              request catering quote
            </h2>
            <p className="font-inter text-lg text-medium-gray">
              Fill out the form below and we&apos;ll get back to you within 24 hours
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-pure-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-inter font-semibold text-dark-gray mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-inter font-semibold text-dark-gray mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block font-inter font-semibold text-dark-gray mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block font-inter font-semibold text-dark-gray mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                />
              </div>
              
              <div>
                <label htmlFor="eventDate" className="block font-inter font-semibold text-dark-gray mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                />
              </div>
              
              <div>
                <label htmlFor="guestCount" className="block font-inter font-semibold text-dark-gray mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  required
                  min="10"
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="package" className="block font-inter font-semibold text-dark-gray mb-2">
                  Preferred Package
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter"
                >
                  <option value="">Select a package</option>
                  <option value="medical">Medical Center Lunch</option>
                  <option value="office">Office Catering</option>
                  <option value="family">Family Gathering</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block font-inter font-semibold text-dark-gray mb-2">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your event, dietary restrictions, or special requests..."
                  className="w-full px-4 py-3 border border-soft-gray rounded-lg focus:ring-2 focus:ring-napoli-red focus:border-transparent font-inter resize-none"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="btn-primary text-lg px-8 py-4"
              >
                Submit Catering Request
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                why choose napoli for catering?
              </h3>
              <ul className="font-inter text-medium-gray space-y-3">
                <li>• Authentic NY-style pizza and Italian cuisine</li>
                <li>• Fresh, high-quality ingredients</li>
                <li>• Professional setup and service</li>
                <li>• Flexible packages for any group size</li>
                <li>• Competitive pricing</li>
                <li>• Local business supporting the community</li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                catering policies
              </h3>
              <ul className="font-inter text-medium-gray space-y-3">
                <li>• 48-hour advance notice required</li>
                <li>• 50% deposit required for confirmation</li>
                <li>• Cancellation policy: 24 hours notice</li>
                <li>• Delivery available within 10-mile radius</li>
                <li>• Setup and cleanup included</li>
                <li>• Dietary restrictions accommodated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-napoli-red text-pure-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-semibold mb-4">
            ready to plan your event?
          </h2>
          <p className="font-inter text-lg mb-8">
            Contact us today to discuss your catering needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:315-218-5837"
              className="btn-secondary text-lg px-8 py-4"
            >
              Call for Quote
            </a>
            <a
              href="mailto:catering@napolipizzeria.com"
              className="bg-pure-white text-napoli-red px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 