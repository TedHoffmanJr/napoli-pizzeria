import Image from "next/image";
import Link from 'next/link';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { getFeaturedItems, formatPrice } from './utils/menuData';
import MenuImage from "./components/MenuImage";

export default function Home() {
  const featuredItems = getFeaturedItems();

  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-soft-gray">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/photos/cheese-pie-hero.jpg"
            alt="Authentic NY-Style Pizza at Napoli Pizzeria"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" style={{backgroundColor:'rgba(214,19,44,0.18)'}}></div>
        </div>
        <div className="relative z-10 text-center text-pure-white px-4 max-w-4xl mx-auto">
          <h1 className="font-poppins text-5xl md:text-7xl font-semibold mb-4 text-shadow" style={{marginTop:10, marginBottom:10}}>
            authentic ny-style pizza
          </h1>
          <p className="font-inter text-xl md:text-2xl mb-8 text-shadow">
            Old-world quality with new-world hospitality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/order" className="btn-primary text-lg px-8 py-4">
              Order Online
            </Link>
            <Link href="/menu" className="btn-secondary text-lg px-8 py-4">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-semibold text-dark-gray mb-4">
              our signature dishes
            </h2>
            <div className="dashed-divider w-24 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.slice(0, 3).map((item) => (
              <div key={item.id} className="card group hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <MenuImage
                    src={`/menuPics/${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.jpg`}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-2">
                    {item.name.toLowerCase()}
                  </h3>
                  {item.italian_name && (
                    <p className="font-alegreya text-sm text-napoli-red uppercase mb-2">
                      {item.italian_name}
                    </p>
                  )}
                  <p className="font-inter text-medium-gray text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-semibold text-napoli-red">
                      {formatPrice(item.base_price)}
                    </span>
                    <Link href="/order" className="btn-primary text-sm px-4 py-2">
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="py-12 bg-napoli-red text-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="mb-4">
                <svg className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-alegreya text-lg font-bold mb-2 uppercase">Location</h3>
              <p className="font-inter text-sm">
                5194 W. Taft Rd.<br />
                North Syracuse, NY 13212
              </p>
            </div>
            
            <div>
              <div className="mb-4">
                <svg className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-alegreya text-lg font-bold mb-2 uppercase">Phone</h3>
              <a href="tel:315-218-5837" className="font-inter text-sm hover:text-red-200 transition-colors">
                315-218-5837
              </a>
            </div>
            
            <div>
              <div className="mb-4">
                <svg className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-alegreya text-lg font-bold mb-2 uppercase">Hours</h3>
              <p className="font-inter text-sm">
                Mon-Thu: 11am-8pm<br />
                Fri: 11am-9pm<br />
                Sat: 11am-8pm<br />
                Sun: Closed
              </p>
            </div>
            
            <div>
              <div className="mb-4">
                <svg className="h-8 w-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </div>
              <h3 className="font-alegreya text-lg font-bold mb-2 uppercase">Order</h3>
              <div className="space-y-2">
                <Link href="/order" className="block font-inter text-sm hover:text-red-200 transition-colors">
                  Order Online
                </Link>
                <Link href="/catering" className="block font-inter text-sm hover:text-red-200 transition-colors">
                  Catering
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins text-4xl font-semibold text-dark-gray mb-6">
                family-owned since 2024
              </h2>
              <p className="font-inter text-lg text-medium-gray mb-6">
                Napoli Pizzeria brings authentic NY-style pizza to Syracuse, NY. 
                Our recipes are rooted in tradition, crafted with care, and served 
                with the warmth of family hospitality.
              </p>
              <p className="font-inter text-lg text-medium-gray mb-8">
                Located next to North Medical Center, we&apos;re proud to serve both 
                our neighborhood families and the local medical community with 
                quality Italian cuisine.
              </p>
              <Link href="/story" className="btn-secondary">
                Read Our Story
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/photos/mike-owner.jpg"
                alt="Mike Perrucci, Owner of Napoli Pizzeria"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
