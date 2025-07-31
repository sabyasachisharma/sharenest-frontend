export interface User {
  id: string;
  email: string;
  role: 'tenant' | 'landlord';
  firstName: string;
  lastName: string;
  profileImage?: string | null;
  phoneNumber?: string;
  bio?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
  };
  pricePerNight: number;
  images: string[];
  amenities: string[];
  type: 'house' | 'apartment' | 'room' | 'unique';
  bedroomCount: number;
  bathroomCount: number;
  maxGuestCount: number;
  hostId: string;
  host?: User;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  location?: string;
  checkIn?: Date | null;
  checkOut?: Date | null;
  guests?: number;
  priceMin?: number;
  priceMax?: number;
  propertyType?: string[];
  amenities?: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  property?: Property;
  guestId: string;
  guest?: User;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  guestCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  property?: Property;
  bookingId: string;
  guestId: string;
  guest?: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  bookingId: string;
  senderId: string;
  sender?: User;
  recipientId: string;
  recipient?: User;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}