import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import CategoryBrowser from '../components/home/CategoryBrowser';
import HostCTA from '../components/home/HostCTA';
import { Property } from '../types';
import api from '../services/api';

const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Property[]>('/properties/featured');
        setFeaturedProperties(response.data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching featured properties:', err);
        setError('Failed to load featured properties. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

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
  ];

  return (
    <div>
      <Hero />
      
      <FeaturedProperties properties={
        isLoading 
          ? [] 
          : featuredProperties.length > 0 
            ? featuredProperties 
            : placeholderProperties
      } />
      
      <CategoryBrowser />
      
      <HostCTA />
    </div>
  );
};

export default HomePage;