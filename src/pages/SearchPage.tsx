import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertyCard from '../components/property/PropertyCard';
import { Property, PropertyFilters as FilterType } from '../types';
import api from '../services/api';
import { MapPin } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

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
      setProperties(response.data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
      // Use placeholder data during development
      setProperties(placeholderProperties);
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
    <div className="bg-neutral-50 py-8 min-h-screen">
      <div className="container-custom">
        <div className="flex items-center mb-6">
          <MapPin className="w-5 h-5 text-primary-600 mr-2" />
          <h1 className="text-2xl sm:text-3xl font-bold">
            {filters.location ? `Stays in ${filters.location}` : 'All Stays'}
          </h1>
        </div>

        <PropertyFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onSearch={handleSearch}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No properties found</h2>
            <p className="text-neutral-600 mb-4">
              Try adjusting your search filters to find more properties.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-neutral-600">
              {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;