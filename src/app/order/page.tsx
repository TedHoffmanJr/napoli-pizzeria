import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const orderingOptions = [
  {
    id: 1,
    name: "Toast Online Ordering",
    description: "Order directly through our website for pickup or delivery",
    features: [
      "Direct ordering through our system",
      "Real-time order tracking",
      "Easy pickup and delivery options",
      "Secure payment processing"
    ],
    link: "https://www.toasttab.com/local/order/napoli-pizzeria-syracuse-5194-west-taft-road-c/r-0abcda36-6edb-4213-804a-81c9fba9f522",
    primary: true,
    icon: (
      <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    )
  },
  {
    id: 2,
    name: "Uber Eats",
    description: "Order through Uber Eats for fast delivery to your door",
    features: [
      "Fast delivery service",
      "Track your order in real-time",
      "Wide delivery area",
      "Uber Eats rewards program"
    ],
    link: "https://www.ubereats.com/store/napoli-pizzeria-taft-rd/-rMPBrC3UmazDQBghIZzug",
    primary: false,
    icon: (
      <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    id: 3,
    name: "Postmates",
    description: "Order through Postmates for convenient delivery",
    features: [
      "Convenient delivery options",
      "Order tracking",
      "Multiple payment methods",
      "Postmates membership benefits"
    ],
    link: "https://www.postmates.com/store/napoli-pizzeria-taft-rd/-rMPBrC3UmazDQBghIZzug",
    primary: false,
    icon: (
      <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
      </svg>
    )
  }
];

export default function Order() {
  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-soft-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins text-5xl font-semibold text-dark-gray mb-4">
            order online
          </h1>
          <p className="font-inter text-xl text-medium-gray mb-8">
            Choose your preferred ordering method
          </p>
          <div className="dashed-divider w-24 mx-auto"></div>
        </div>
      </section>

      {/* Ordering Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {orderingOptions.map((option) => (
              <div key={option.id} className="card group hover:shadow-lg transition-shadow duration-300">
                <div className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    option.primary ? 'bg-napoli-red text-pure-white' : 'bg-soft-gray text-napoli-red'
                  }`}>
                    {option.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                    {option.name.toLowerCase()}
                  </h3>
                  
                  <p className="font-inter text-medium-gray mb-6">
                    {option.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="font-inter text-sm text-medium-gray space-y-2 mb-8 text-left">
                    {option.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-basil-green mr-2 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <a
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block w-full py-4 px-6 rounded-lg font-inter font-semibold transition-colors ${
                      option.primary
                        ? 'bg-napoli-red text-pure-white hover:bg-red-700'
                        : 'bg-pure-white text-napoli-red border-2 border-napoli-red hover:bg-napoli-red hover:text-pure-white'
                    }`}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phone Ordering */}
      <section className="py-16 bg-soft-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-semibold text-dark-gray mb-6">
            prefer to call?
          </h2>
          <p className="font-inter text-lg text-medium-gray mb-8">
            You can always call us directly to place your order
          </p>
          <a
            href="tel:315-218-5837"
            className="inline-flex items-center bg-napoli-red text-pure-white px-8 py-4 rounded-lg font-inter font-semibold hover:bg-red-700 transition-colors text-lg"
          >
            <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call 315-218-5837
          </a>
        </div>
      </section>

      {/* Ordering Information */}
      <section className="py-16 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                ordering information
              </h3>
              <ul className="font-inter text-medium-gray space-y-3">
                <li>• Minimum order: $15 for delivery</li>
                <li>• Delivery fee varies by platform</li>
                <li>• Estimated delivery time: 30-45 minutes</li>
                <li>• Payment accepted: Cash, Credit, Debit</li>
                <li>• Delivery area: 10-mile radius</li>
                <li>• Pickup available for all orders</li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                hours & availability
              </h3>
              <div className="font-inter text-medium-gray space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>11am - 8pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span>11am - 9pm</span>
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
              <div className="mt-6 p-4 bg-soft-gray rounded-lg">
                <p className="font-inter text-sm text-medium-gray">
                  <strong>Note:</strong> Online ordering available during business hours only. 
                  For orders outside of business hours, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-napoli-red text-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-semibold mb-4">
            visit us
          </h2>
          <p className="font-inter text-lg mb-8">
            Located at 5194 W. Taft Rd., North Syracuse NY 13212
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=5194+W.+Taft+Rd.,+North+Syracuse+NY+13212"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-4"
            >
              Get Directions
            </a>
            <a
              href="tel:315-218-5837"
              className="bg-pure-white text-napoli-red px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 