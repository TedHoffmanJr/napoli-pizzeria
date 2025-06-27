import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';

// Mock specials data - in a real app, this would come from Supabase
const specials = [
  {
    id: 1,
    name: "Lunch Special",
    description: "Any 12\" pizza with 2 toppings + 2 sodas",
    price: 15.99,
    originalPrice: 22.99,
    validUntil: "2024-12-31",
    isLimited: false,
    category: "Lunch"
  },
  {
    id: 2,
    name: "Family Night",
    description: "Large 16\" pizza with 3 toppings + garlic knots + 2-liter soda",
    price: 29.99,
    originalPrice: 38.99,
    validUntil: "2024-12-31",
    isLimited: false,
    category: "Family"
  },
  {
    id: 3,
    name: "Weekend Special",
    description: "Grandma's Pizza + Antipasto Salad",
    price: 24.99,
    originalPrice: 32.99,
    validUntil: "2024-12-15",
    isLimited: true,
    category: "Weekend"
  },
  {
    id: 4,
    name: "Medical Center Special",
    description: "20% off all orders over $25 for medical professionals",
    price: null,
    originalPrice: null,
    validUntil: "2024-12-31",
    isLimited: false,
    category: "Medical"
  },
  {
    id: 5,
    name: "Wing Wednesday",
    description: "20 wings for the price of 10",
    price: 13.99,
    originalPrice: 26.99,
    validUntil: "2024-12-31",
    isLimited: false,
    category: "Wings"
  },
  {
    id: 6,
    name: "Holiday Special",
    description: "Utica Greens Pizza + Chicken Parm Sub",
    price: 28.99,
    originalPrice: 35.99,
    validUntil: "2024-12-20",
    isLimited: true,
    category: "Holiday"
  }
];

export default function Specials() {
  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-soft-gray">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/photos/cheese-pie-hero.jpg"
            alt="Napoli Pizzeria Specials Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" style={{backgroundColor:'rgba(214,19,44,0.18)'}}></div>
        </div>
        <div className="relative z-10 text-center text-pure-white px-4 max-w-3xl mx-auto">
          <h1 className="font-poppins text-5xl font-semibold mb-4 text-shadow" style={{marginTop:10, marginBottom:10}}>
            current specials
          </h1>
          <p className="font-inter text-xl mb-4 text-shadow">
            Limited-time offers and daily specials
          </p>
        </div>
      </section>

      {/* Header */}
      <section className="bg-soft-gray py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins text-5xl font-semibold text-dark-gray mb-4">
            current specials
          </h1>
          <p className="font-inter text-xl text-medium-gray mb-8">
            Limited-time offers and daily specials
          </p>
          <div className="dashed-divider w-24 mx-auto"></div>
        </div>
      </section>

      {/* Specials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specials.map((special) => (
              <div key={special.id} className="card group hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-2">
                        {special.name.toLowerCase()}
                      </h3>
                      <span className="font-alegreya text-sm text-napoli-red uppercase">
                        {special.category}
                      </span>
                    </div>
                    {special.isLimited && (
                      <span className="bg-basil-green text-pure-white text-xs px-2 py-1 rounded-full font-inter font-semibold">
                        Limited Time
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-inter text-medium-gray text-sm mb-4">
                    {special.description}
                  </p>

                  {/* Price */}
                  {special.price && special.originalPrice && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="font-inter font-bold text-2xl text-napoli-red">
                          ${special.price}
                        </span>
                        <span className="font-inter text-medium-gray line-through">
                          ${special.originalPrice}
                        </span>
                        <span className="font-inter text-sm text-basil-green font-semibold">
                          Save ${(special.originalPrice - special.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Discount Percentage */}
                  {special.price && special.originalPrice && (
                    <div className="mb-4">
                      <span className="font-inter text-sm text-basil-green font-semibold">
                        {Math.round(((special.originalPrice - special.price) / special.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  )}

                  {/* Medical Center Special */}
                  {special.category === "Medical" && (
                    <div className="mb-4">
                      <span className="font-inter text-lg text-napoli-red font-semibold">
                        20% OFF
                      </span>
                      <p className="font-inter text-sm text-medium-gray mt-1">
                        Valid with medical ID
                      </p>
                    </div>
                  )}

                  {/* Timer for Limited Time Offers */}
                  {special.isLimited && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="font-inter text-sm text-red-800 font-semibold mb-2">
                        ⏰ Limited Time Offer
                      </p>
                      <p className="font-inter text-xs text-red-600">
                        Valid until {new Date(special.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-medium-gray">
                      {special.isLimited ? (
                        <span className="text-red-600 font-semibold">Limited Time</span>
                      ) : (
                        <span className="text-basil-green font-semibold">Ongoing</span>
                      )}
                    </div>
                    <a
                      href="/order"
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-napoli-red text-pure-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-semibold mb-4">
            don&apos;t miss out!
          </h2>
          <p className="font-inter text-lg mb-8">
            Specials change regularly. Order now to take advantage of these great deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/order"
              className="btn-secondary text-lg px-8 py-4"
            >
              Order Online
            </a>
            <a
              href="tel:315-218-5837"
              className="bg-pure-white text-napoli-red px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                special offers
              </h3>
              <ul className="font-inter text-medium-gray space-y-2">
                <li>• Medical professionals receive 20% off orders over $25</li>
                <li>• Family night specials every Friday</li>
                <li>• Lunch specials Monday through Friday</li>
                <li>• Weekend specials on select items</li>
                <li>• Catering discounts for large orders</li>
              </ul>
            </div>
            <div>
              <h3 className="font-poppins text-2xl font-semibold text-dark-gray mb-4">
                how to redeem
              </h3>
              <ul className="font-inter text-medium-gray space-y-2">
                <li>• Mention the special when ordering by phone</li>
                <li>• Select specials in our online ordering system</li>
                <li>• Show medical ID for medical center specials</li>
                <li>• Specials cannot be combined</li>
                <li>• Valid for pickup and delivery orders</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 