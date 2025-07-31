import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyCard from '../components/property/PropertyCard';
import { Property, PropertyFilters as FilterType } from '../types';
import api from '../services/api';
import { MapPin, Search, Filter, SlidersHorizontal } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL params
  const initialFilters: FilterType = {
    location: searchParams.get('location') || '',
    checkIn: searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : null,
    checkOut: searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : null,
    guests: searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined,
    priceMin: searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined,
    priceMax: searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined,
    propertyType: searchParams.getAll('type'),
    amenities: searchParams.getAll('amenities'),
  };

  const [filters, setFilters] = useState<FilterType>(initialFilters);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    // Update URL with filter values
    const params = new URLSearchParams();
    
    if (filters.location) params.set('location', filters.location);
    if (filters.checkIn) params.set('checkIn', filters.checkIn.toISOString());
    if (filters.checkOut) params.set('checkOut', filters.checkOut.toISOString());
    if (filters.guests) params.set('guests', filters.guests.toString());
    if (filters.priceMin) params.set('priceMin', filters.priceMin.toString());
    if (filters.priceMax) params.set('priceMax', filters.priceMax.toString());
    
    // Clear existing type params and add new ones
    if (filters.propertyType?.length) {
      filters.propertyType.forEach(type => params.append('type', type));
    }
    
    // Clear existing amenities params and add new ones
    if (filters.amenities?.length) {
      filters.amenities.forEach(amenity => params.append('amenities', amenity));
    }
    
    setSearchParams(params);
    fetchProperties();
  };

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      
      // Build query params for API request
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.set('location', filters.location);
      if (filters.checkIn) queryParams.set('checkIn', filters.checkIn.toISOString());
      if (filters.checkOut) queryParams.set('checkOut', filters.checkOut.toISOString());
      if (filters.guests) queryParams.set('guests', filters.guests.toString());
      if (filters.priceMin) queryParams.set('priceMin', filters.priceMin.toString());
      if (filters.priceMax) queryParams.set('priceMax', filters.priceMax.toString());
      if (filters.propertyType?.length) {
        filters.propertyType.forEach(type => queryParams.append('type', type));
      }
      if (filters.amenities?.length) {
        filters.amenities.forEach(amenity => queryParams.append('amenities', amenity));
      }
      
      const response = await api.get<Property[]>(`/properties/search?${queryParams.toString()}`);
      
      // Set properties from API response (could be empty array)
      setProperties(response.data || []);
      
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      
      // Check if it's a "no results" response vs actual server error
      if (err.response?.status === 404 || err.response?.data?.message?.includes('No properties found')) {
        // This is "no results found", not a server error
        setProperties([]);
        setError(null);
      } else {
        // This is an actual server/connection error
        setError('Unable to connect to our servers. Please check your internet connection and try again.');
        setProperties([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user's favorites
  const fetchFavorites = async () => {
    try {
      const response = await api.get<string[]>('/users/favorites');
      setFavorites(response.data || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      // Silently fail - non-critical feature
    }
  };

  const handleToggleFavorite = async (propertyId: string) => {
    try {
      if (favorites.includes(propertyId)) {
        await api.delete(`/users/favorites/${propertyId}`);
        setFavorites(favorites.filter(id => id !== propertyId));
      } else {
        await api.post(`/users/favorites/${propertyId}`);
        setFavorites([...favorites, propertyId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Placeholder properties for development
  const placeholderProperties: Property[] = [
    {
      id: '1',
      title: 'Modern Beachfront Villa',
      description: 'Stunning beachfront villa with panoramic ocean views.',
      location: {
        address: '123 Ocean Drive',
        city: 'Malibu',
        state: 'California',
        country: 'USA',
        zipCode: '90265',
      },
      pricePerNight: 350,
      images: ['https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      amenities: ['wifi', 'pool', 'kitchen', 'ac'],
      type: 'house',
      bedroomCount: 3,
      bathroomCount: 2,
      maxGuestCount: 6,
      hostId: 'host1',
      rating: 4.9,
      reviewCount: 124,
      createdAt: '2023-01-15T00:00:00Z',
      updatedAt: '2023-01-15T00:00:00Z',
    },
    {
      id: '2',
      title: 'Cozy Mountain Cabin',
      description: 'Rustic cabin nestled in the mountains.',
      location: {
        address: '456 Pine Trail',
        city: 'Aspen',
        state: 'Colorado',
        country: 'USA',
        zipCode: '81611',
      },
      pricePerNight: 180,
      images: ['https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      amenities: ['wifi', 'kitchen', 'fireplace', 'hot_tub'],
      type: 'house',
      bedroomCount: 2,
      bathroomCount: 1,
      maxGuestCount: 4,
      hostId: 'host2',
      rating: 4.8,
      reviewCount: 98,
      createdAt: '2023-02-10T00:00:00Z',
      updatedAt: '2023-02-10T00:00:00Z',
    },
    {
      id: '3',
      title: 'Luxury Penthouse',
      description: 'Upscale penthouse with city skyline views.',
      location: {
        address: '789 Highrise Blvd',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        zipCode: '10001',
      },
      pricePerNight: 450,
      images: ['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      amenities: ['wifi', 'gym', 'kitchen', 'ac', 'doorman'],
      type: 'apartment',
      bedroomCount: 3,
      bathroomCount: 2.5,
      maxGuestCount: 6,
      hostId: 'host3',
      rating: 4.95,
      reviewCount: 142,
      createdAt: '2023-03-05T00:00:00Z',
      updatedAt: '2023-03-05T00:00:00Z',
    },
    {
      id: '4',
      title: 'Charming Countryside Cottage',
      description: 'Quaint cottage surrounded by beautiful countryside.',
      location: {
        address: '123 Rural Lane',
        city: 'Cotswolds',
        state: 'England',
        country: 'UK',
        zipCode: 'GL54',
      },
      pricePerNight: 145,
      images: ['https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      amenities: ['wifi', 'fireplace', 'kitchen', 'garden'],
      type: 'house',
      bedroomCount: 2,
      bathroomCount: 1,
      maxGuestCount: 4,
      hostId: 'host4',
      rating: 4.85,
      reviewCount: 76,
      createdAt: '2023-04-20T00:00:00Z',
      updatedAt: '2023-04-20T00:00:00Z',
    },
    {
      id: '5',
      title: 'Urban Loft Apartment',
      description: 'Spacious loft in the heart of downtown.',
      location: {
        address: '555 Main St',
        city: 'Chicago',
        state: 'Illinois',
        country: 'USA',
        zipCode: '60611',
      },
      pricePerNight: 220,
      images: ['https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      amenities: ['wifi', 'kitchen', 'ac', 'gym'],
      type: 'apartment',
      bedroomCount: 2,
      bathroomCount: 2,
      maxGuestCount: 4,
      hostId: 'host5',
      rating: 4.7,
      reviewCount: 89,
      createdAt: '2023-05-12T00:00:00Z',
      updatedAt: '2023-05-12T00:00:00Z',
    },
    {
      id: '6',
      title: 'Seaside Bungalow',
      description: 'Cozy bungalow just steps from the beach.',
      location: {
        address: '789 Coastal Hwy',
        city: 'Santa Barbara',
        state: 'California',
        country: 'USA',
        zipCode: '93101',
      },
      pricePerNight: 195,
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
      amenities: ['wifi', 'kitchen', 'beach_access', 'patio'],
      type: 'house',
      bedroomCount: 1,
      bathroomCount: 1,
      maxGuestCount: 2,
      hostId: 'host6',
      rating: 4.9,
      reviewCount: 64,
      createdAt: '2023-06-03T00:00:00Z',
      updatedAt: '2023-06-03T00:00:00Z',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/20">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {filters.location ? `Discover ${filters.location}` : 'Find Your Perfect Stay'}
          </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Explore unique accommodations around the world
            </p>
          </div>
          
          {/* Search Stats */}
          <div className="flex items-center justify-center gap-2 text-primary-100">
            <Search className="w-5 h-5" />
            <span className="text-lg">
              {isLoading ? 'Searching...' : `${properties.length} stays available`}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-secondary flex items-center gap-2 md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <div className="hidden md:block">
                <PropertyFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange} 
                  onSearch={handleSearch}
                />
              </div>
            </div>
        </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden card p-4 mb-6">
        <PropertyFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onSearch={handleSearch}
        />
            </div>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Finding amazing stays...
            </h3>
            <p className="text-neutral-600">This will just take a moment</p>
          </div>
        ) : error ? (
          // Server Error State
          <div className="text-center py-20">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-8 shadow-modern">
              <MapPin className="w-16 h-16 text-red-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Connection Issue
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
              We're having trouble loading properties right now. Please try again.
            </p>
            
            <button
              onClick={fetchProperties}
              className="btn btn-primary text-lg px-8 py-3"
            >
              Try Again
            </button>
          </div>
        ) : properties.length === 0 ? (
          // No Properties Found State
          <div className="text-center py-20">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-8 shadow-modern">
              <Search className="w-16 h-16 text-primary-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              No stays found
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              We couldn't find any properties matching your criteria. Try adjusting your search or explore these popular destinations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => {
                  setFilters({
                    location: '',
                    checkIn: null,
                    checkOut: null,
                    guests: undefined,
                    priceMin: undefined,
                    priceMax: undefined,
                    propertyType: [],
                    amenities: [],
                  });
                  handleSearch();
                }}
                className="btn btn-primary px-8"
              >
                Clear All Filters
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="btn btn-secondary px-8"
              >
                Start New Search
              </button>
            </div>
            
            {/* Popular Destinations */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                ✨ Popular Destinations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { city: 'New York', emoji: '🗽' },
                  { city: 'Los Angeles', emoji: '🌴' },
                  { city: 'Miami', emoji: '🏖️' },
                  { city: 'Chicago', emoji: '🏙️' }
                ].map(({ city, emoji }) => (
                  <button
                    key={city}
                    onClick={() => {
                      setFilters({...filters, location: city});
                      handleSearch();
                    }}
                    className="card p-6 text-center hover:shadow-modern-lg hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white to-primary-50"
                  >
                    <div className="text-3xl mb-2">{emoji}</div>
                    <p className="font-semibold text-primary-700">{city}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Properties Results
          <div>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-xl shadow-modern border-l-4 border-primary-500">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {properties.length} Amazing {properties.length === 1 ? 'Stay' : 'Stays'} Found
                </h2>
                <p className="text-neutral-600 mt-1">
                  {filters.location && `in ${filters.location}`}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-primary-600">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Perfect matches</span>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {properties.map((property, index) => (
                <div 
                  key={property.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
                </div>
              ))}
            </div>

            {/* Load More Button (if needed) */}
            {properties.length >= 12 && (
              <div className="text-center mt-12">
                <button className="btn btn-secondary px-8 py-3 text-lg">
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;