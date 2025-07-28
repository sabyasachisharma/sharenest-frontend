import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = React.useState({
    location: '',
    moveInDate: '',
    moveOutDate: '',
    guests: 1
  });

  const handleInputChange = (field: string, value: string | number) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.moveInDate) searchParams.set('checkIn', searchData.moveInDate);
    if (searchData.moveOutDate) searchParams.set('checkOut', searchData.moveOutDate);
    if (searchData.guests > 1) searchParams.set('guests', searchData.guests.toString());
    
    navigate(`/search?${searchParams.toString()}`);
  };

  // Get today's date in YYYY-MM-DD format for minimum date
  const today = new Date().toISOString().split('T')[0];

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
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Share Your Space, Find Your Place
            </h1>
            <h2 className="text-xl md:text-2xl text-white/90 mb-8">
              Find your ideal shared living space with flexible stay durations - Connect with flatmates and discover your perfect temporary home
            </h2>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Location */}
                  <div className="lg:col-span-1">
                    <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
                      Where
                    </label>
                    <div className="relative">
                      <input
                        id="location"
                        type="text"
                        placeholder="City, neighborhood..."
                        className="input pl-10 py-3 w-full"
                        value={searchData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    </div>
                  </div>

                  {/* Move-in Date */}
                  <div>
                    <label htmlFor="moveInDate" className="block text-sm font-medium text-neutral-700 mb-2">
                      Move-in Date
                    </label>
                    <div className="relative">
                      <input
                        id="moveInDate"
                        type="date"
                        className="input pl-10 py-3 w-full"
                        value={searchData.moveInDate}
                        min={today}
                        onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                        required
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    </div>
                  </div>

                  {/* Move-out Date */}
                  <div>
                    <label htmlFor="moveOutDate" className="block text-sm font-medium text-neutral-700 mb-2">
                      Move-out Date
                    </label>
                    <div className="relative">
                      <input
                        id="moveOutDate"
                        type="date"
                        className="input pl-10 py-3 w-full"
                        value={searchData.moveOutDate}
                        min={searchData.moveInDate || today}
                        onChange={(e) => handleInputChange('moveOutDate', e.target.value)}
                        required
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-neutral-700 mb-2">
                      Occupants
                    </label>
                    <div className="relative">
                      <select
                        id="guests"
                        className="input pl-10 py-3 w-full appearance-none"
                        value={searchData.guests}
                        onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                      >
                        <option value={1}>1 person</option>
                        <option value={2}>2 people</option>
                        <option value={3}>3 people</option>
                        <option value={4}>4 people</option>
                        <option value={5}>5+ people</option>
                      </select>
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center pt-2">
                  <button type="submit" className="btn btn-primary py-3 px-8 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Stays
                  </button>
                </div>
              </form>

              {/* Stay Duration Info */}
              {searchData.moveInDate && searchData.moveOutDate && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-700 font-medium">
                    Stay Duration: {
                      Math.ceil(
                        (new Date(searchData.moveOutDate).getTime() - new Date(searchData.moveInDate).getTime()) 
                        / (1000 * 60 * 60 * 24)
                      )
                    } days
                  </p>
                </div>
              )}
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