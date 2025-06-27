import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Story() {
  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      
      {/* Header */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-soft-gray">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/photos/hero-napoli.jpg"
            alt="Napoli Pizzeria Story Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" style={{backgroundColor:'rgba(214,19,44,0.18)'}}></div>
        </div>
        <div className="relative z-10 text-center text-pure-white px-4 max-w-3xl mx-auto">
          <h1 className="font-poppins text-5xl font-semibold mb-4 text-shadow" style={{marginTop:10, marginBottom:10}}>
            our story
          </h1>
          <p className="font-inter text-xl mb-4 text-shadow">
            The story behind Napoli Pizzeria
          </p>
          <div className="dashed-divider w-24 mx-auto"></div>
        </div>
      </section>

      {/* Main Story Section */}
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
              <h2 className="font-poppins text-3xl font-semibold text-dark-gray">
                About Us – Napoli Pizzeria
              </h2>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                At Napoli Pizzeria, we believe pizza is more than food — it's a craft, a conversation, and a connection to tradition.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                Owner and head pizzaiolo <span className="font-semibold text-dark-gray">Mike Perrucci</span> has spent decades in the pizza industry, perfecting his dough, mastering old-school techniques, and staying true to the fundamentals that make a great pie unforgettable. Every pizza that leaves the oven at Napoli is made with purpose — using quality ingredients, consistent technique, and just the right balance of heart and heat.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                Mike's always around — tossing dough, checking the ovens, or chatting with customers at the counter. His philosophy is simple: <span className="italic">"Make the kind of pizza you'd be proud to serve your friends and family — every single time."</span> And it shows.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                We're proud to serve <span className="font-semibold text-dark-gray">authentic NY-style pizza</span> that reflects the best of both worlds: big city flavor, small town hospitality. Whether you're grabbing a slice on your lunch break, feeding the whole family, or catering a group at the hospital down the road — we make sure every order hits the mark.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                Mike has had a hand in making some of the local brands what they are today! His experience and passion for pizza have helped shape the Syracuse pizza scene.
              </p>
              <p className="font-inter text-lg text-medium-gray leading-relaxed">
                So if you're nearby, stop in and say hey. We'd love to make you something great.
              </p>
              <div className="bg-soft-gray p-6 rounded-lg">
                <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-3">
                  Good pizza. Good people. Napoli Pizzeria.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Story */}
      <section className="py-16 bg-soft-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins text-3xl font-semibold text-dark-gray mb-6">
                perfectly positioned
              </h2>
              <p className="font-inter text-lg text-medium-gray mb-6 leading-relaxed">
                Our location at 5194 W. Taft Rd. in North Syracuse was carefully chosen 
                to serve both our neighborhood families and the local medical community. 
                With over 12,000 vehicles passing through daily and hundreds of medical 
                professionals nearby, we're perfectly positioned to provide quality 
                Italian cuisine to everyone who needs it.
              </p>
              <p className="font-inter text-lg text-medium-gray mb-6 leading-relaxed">
                Whether you're a medical professional looking for a quick lunch, a family 
                planning dinner, or someone in need of catering for a special event, 
                Napoli Pizzeria is here to serve you with the same care and attention 
                we'd give our own family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://maps.google.com/?q=5194+W.+Taft+Rd.,+North+Syracuse+NY+13212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Get Directions
                </a>
                <a
                  href="tel:315-218-5837"
                  className="btn-primary"
                >
                  Call Us
                </a>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/photos/counter-mike.jpg"
                alt="Napoli Pizzeria counter and service area"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl font-semibold text-dark-gray mb-4">
              our values
            </h2>
            <div className="dashed-divider w-16 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-napoli-red text-pure-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-3">
                authenticity
              </h3>
              <p className="font-inter text-medium-gray">
                We stay true to traditional NY-style pizza techniques and Italian recipes, 
                ensuring every bite delivers authentic flavor and quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-basil-green text-pure-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-3">
                community
              </h3>
              <p className="font-inter text-medium-gray">
                We're proud to serve our local community, from families to medical professionals, 
                with the same care and attention we'd give our own loved ones.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-napoli-red text-pure-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-dark-gray mb-3">
                quality
              </h3>
              <p className="font-inter text-medium-gray">
                Every ingredient is carefully selected, every recipe is crafted with care, 
                and every dish is prepared to exceed your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-napoli-red text-pure-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl font-semibold mb-4">
            experience the difference
          </h2>
          <p className="font-inter text-lg mb-8">
            Come taste the authentic NY-style pizza and Italian cuisine that makes 
            Napoli Pizzeria special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/menu" className="btn-secondary text-lg px-8 py-4">
              View Menu
            </a>
            <a href="/order" className="bg-pure-white text-napoli-red px-8 py-4 rounded-lg font-inter font-semibold hover:bg-gray-100 transition-colors">
              Order Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 