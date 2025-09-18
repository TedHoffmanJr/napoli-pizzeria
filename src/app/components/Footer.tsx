import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  onOrderClick?: () => void;
}

export default function Footer({ onOrderClick }: FooterProps) {
  return (
    <footer className="bg-dark-gray text-pure-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Image
              src="/brand/napoli-logo-footer-white-font.png"
              alt="Napoli Pizzeria"
              width={260}
              height={80}
              className="h-20 w-auto mb-6"
              style={{ width: 'auto' }}
            />
            <p className="font-inter text-soft-gray mb-4">
              Authentic NY-style pizza and Italian cuisine in Syracuse, NY. 
              Family-owned since 2024, serving the community with old-world quality 
              and new-world hospitality.
            </p>
            <div className="flex space-x-4">
              <a
                href="tel:315-218-5837"
                className="text-napoli-red hover:text-red-400 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
              <a
                href="https://maps.google.com/?q=5194+W.+Taft+Rd.,+North+Syracuse+NY+13212"
                target="_blank"
                rel="noopener noreferrer"
                className="text-napoli-red hover:text-red-400 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-alegreya text-lg font-bold mb-4 uppercase">Hours</h3>
            <div className="font-inter text-soft-gray space-y-2">
              <div className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>11am - 8pm</span>
              </div>
              <div className="flex justify-between">
                <span>Friday</span>
                <span>11am - 8pm</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>11am - 8pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-napoli-red">Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-alegreya text-lg font-bold mb-4 uppercase">Quick Links</h3>
            <div className="font-inter text-soft-gray space-y-2">
              <Link href="/menu" className="block hover:text-napoli-red transition-colors">
                Menu
              </Link>
              <a 
                href="https://www.facebook.com/profile.php?id=61566700086836" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-napoli-red transition-colors"
              >
                Specials
              </a>
              <Link href="/catering" className="block hover:text-napoli-red transition-colors">
                Catering
              </Link>
              <Link href="/story" className="block hover:text-napoli-red transition-colors">
                Our Story
              </Link>
              {onOrderClick ? (
                <button 
                  onClick={onOrderClick}
                  className="block hover:text-napoli-red transition-colors text-left"
                >
                  Order Online
                </button>
              ) : (
                <Link href="/order" className="block hover:text-napoli-red transition-colors">
                  Order Online
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-medium-gray mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-inter text-soft-gray text-sm">
              <p>© {new Date().getFullYear()} Napoli Pizzeria. All rights reserved.</p>
              <p className="mt-1">
                <a 
                  href="https://www.google.com/maps?sca_esv=7d0b40d4ccf1baac&sxsrf=AE3TifOjiT2tdONIsxp2P3GWtQSgeaRCDw:1754431850099&lsig=AB86z5V_3OvHJY-uRTaGnVI7yqpx&biw=2880&bih=1366&dpr=0.67&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KaGQjjIA7dmJMSYtIq9idRJw&daddr=5194+W+Taft+Rd,+North+Syracuse,+NY+13212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-napoli-red transition-colors"
                >
                  5194 W. Taft Rd., North Syracuse NY 13212
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 