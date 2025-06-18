import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Users, Star, Heart, Share2, MapPin, Home, Wifi, Coffee, Wind } from 'lucide-react';
import { Property, Booking } from '../types';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: null,
    checkOut: null,
  });
  const [guestCount, setGuestCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Property>(`/properties/${id}`);
        setProperty(response.data || null);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError('Failed to load property details. Please try again later.');
        // Use placeholder data during development
        setProperty(placeholderProperty);
      } finally {
        setIsLoading(false);
      }
    };

    const checkFavoriteStatus = async () => {
      if (isAuthenticated && id) {
        try {
          const response = await api.get<{ isFavorite: boolean }>(`/users/favorites/${id}/status`);
          setIsFavorite(response.data?.isFavorite || false);
        } catch (err) {
          console.error('Error checking favorite status:', err);
        }
      }
    };

    fetchProperty();
    checkFavoriteStatus();
  }, [id, isAuthenticated]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setSelectedDates({
      checkIn: start,
      checkOut: end,
    });
  };

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGuestCount(parseInt(e.target.value));
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      setBookingError('Please log in to book this property');
      return;
    }

    if (!selectedDates.checkIn || !selectedDates.checkOut) {
      setBookingError('Please select check-in and check-out dates');
      return;
    }

    try {
      const booking: Partial<Booking> = {
        propertyId: id!,
        checkInDate: selectedDates.checkIn.toISOString(),
        checkOutDate: selectedDates.checkOut.toISOString(),
        guestCount,
      };

      await api.post('/bookings', booking);
      // Redirect to booking confirmation or guest dashboard
    } catch (err: any) {
      setBookingError(err.message || 'Failed to create booking. Please try again.');
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) return;

    try {
      if (isFavorite) {
        await api.delete(`/users/favorites/${id}`);
      } else {
        await api.post(`/users/favorites/${id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Placeholder property for development
  const placeholderProperty: Property = {
    id: '1',
    title: 'Modern Beachfront Villa',
    description: 'Experience luxury living in this stunning beachfront villa. Wake up to panoramic ocean views and enjoy direct beach access. This modern property features high-end finishes, a fully equipped kitchen, and a private infinity pool overlooking the Pacific. Perfect for families or groups looking for an unforgettable coastal getaway.',
    location: {
      address: '123 Ocean Drive',
      city: 'Malibu',
      state: 'California',
      country: 'USA',
      zipCode: '90265',
    },
    pricePerNight: 350,
    images: [
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    amenities: ['wifi', 'pool', 'kitchen', 'ac', 'beach_access', 'parking'],
    type: 'house',
    bedroomCount: 3,
    bathroomCount: 2,
    maxGuestCount: 6,
    hostId: 'host1',
    rating: 4.9,
    reviewCount: 124,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error || 'Property not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-custom py-8">
        {/* Property Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-accent-500 fill-accent-500" />
                <span className="ml-1 font-medium">{property.rating}</span>
                <span className="mx-1">·</span>
                <span className="text-neutral-600">{property.reviewCount} reviews</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-neutral-500" />
                <span className="ml-1 text-neutral-600">
                  {property.location.city}, {property.location.country}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleToggleFavorite}
                className="p-2 rounded-full hover:bg-neutral-100"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-accent-500 text-accent-500' : 'text-neutral-700'}`} />
              </button>
              <button
                className="p-2 rounded-full hover:bg-neutral-100"
                aria-label="Share property"
              >
                <Share2 className="w-6 h-6 text-neutral-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Property Images */}
        <div className="grid grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden">
          <div className="col-span-2 sm:col-span-1">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="hidden sm:grid grid-cols-2 gap-4">
            {property.images.slice(1, 3).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} - Image ${index + 2}`}
                className="w-full h-[195px] object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="border-b pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Hosted by {property.host?.firstName || 'Host'}
                  </h2>
                  <div className="flex items-center text-neutral-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{property.maxGuestCount} guests</span>
                    <span className="mx-2">·</span>
                    <span>{property.bedroomCount} bedrooms</span>
                    <span className="mx-2">·</span>
                    <span>{property.bathroomCount} baths</span>
                  </div>
                </div>
                {property.host?.avatar ? (
                  <img
                    src={property.host.avatar}
                    alt={property.host.firstName}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary-600" />
                  </div>
                )}
              </div>
            </div>

            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-neutral-600 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.includes('wifi') && (
                  <div className="flex items-center">
                    <Wifi className="w-5 h-5 text-neutral-600 mr-2" />
                    <span>WiFi</span>
                  </div>
                )}
                {property.amenities.includes('kitchen') && (
                  <div className="flex items-center">
                    <Coffee className="w-5 h-5 text-neutral-600 mr-2" />
                    <span>Kitchen</span>
                  </div>
                )}
                {property.amenities.includes('ac') && (
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 text-neutral-600 mr-2" />
                    <span>Air conditioning</span>
                  </div>
                )}
                {/* Add more amenities here */}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl border shadow-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-bold">${property.pricePerNight}</span>
                    <span className="text-neutral-600"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                    <span className="ml-1">{property.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <DatePicker
                    selected={selectedDates.checkIn}
                    onChange={handleDateChange}
                    startDate={selectedDates.checkIn}
                    endDate={selectedDates.checkOut}
                    selectsRange
                    inline
                    minDate={new Date()}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="guests" className="block text-sm font-medium text-neutral-700 mb-1">
                    Guests
                  </label>
                  <select
                    id="guests"
                    className="input"
                    value={guestCount}
                    onChange={handleGuestCountChange}
                  >
                    {Array.from({ length: property.maxGuestCount }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {bookingError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                    {bookingError}
                  </div>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={handleBooking}
                    className="btn btn-primary w-full"
                    disabled={!selectedDates.checkIn || !selectedDates.checkOut}
                  >
                    Book now
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-primary w-full text-center">
                    Log in to book
                  </Link>
                )}

                <p className="text-center text-sm text-neutral-500 mt-4">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;