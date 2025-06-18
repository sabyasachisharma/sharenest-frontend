import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="absolute inset-0 bg-neutral-900">
        <img
          src="https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Beautiful vacation home"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Content */}
      <div className="relative min-h-[80vh] flex items-center">
        <div className="container-custom py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Share Your Space, Find Your Place
            </h1>
            <h2 className="text-xl md:text-2xl text-white/90 mb-8">
              Find your ideal shared living space - Connect with flatmates, discover sublets, and make your next home sharing experience memorable
            </h2>

            {/* Search Form */}
            <div className="bg-white p-4 rounded-xl shadow-lg animate-fade-in">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <label htmlFor="location" className="sr-only">Location</label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      placeholder="Where are you going?"
                      className="input pl-10 py-3 w-full"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary py-3 px-6">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;