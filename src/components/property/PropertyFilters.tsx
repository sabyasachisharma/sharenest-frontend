import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PropertyFilters as FilterType } from '../../types';
import { Search, X, Calendar, Users, DollarSign, Home } from 'lucide-react';

interface PropertyFiltersProps {
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
  onSearch: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFilterChange,
  onSearch,
}) => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  
  const propertyTypes = [
    { id: 'house', label: 'Houses' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'room', label: 'Rooms' },
    { id: 'unique', label: 'Unique' },
  ];
  
  const amenities = [
    { id: 'wifi', label: 'WiFi' },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'ac', label: 'Air Conditioning' },
    { id: 'pool', label: 'Pool' },
    { id: 'hot_tub', label: 'Hot Tub' },
    { id: 'free_parking', label: 'Free Parking' },
    { id: 'washer', label: 'Washer' },
    { id: 'dryer', label: 'Dryer' },
  ];

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleCheckInChange = (date: Date | null) => {
    onFilterChange({ ...filters, checkIn: date });
  };

  const handleCheckOutChange = (date: Date | null) => {
    onFilterChange({ ...filters, checkOut: date });
  };

  const handleGuestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, guests: parseInt(e.target.value) });
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, priceMin: parseInt(e.target.value) || undefined });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, priceMax: parseInt(e.target.value) || undefined });
  };

  const handlePropertyTypeChange = (typeId: string) => {
    const currentTypes = filters.propertyType || [];
    const updatedTypes = currentTypes.includes(typeId)
      ? currentTypes.filter(id => id !== typeId)
      : [...currentTypes, typeId];
    
    onFilterChange({ ...filters, propertyType: updatedTypes });
  };

  const handleAmenityChange = (amenityId: string) => {
    const currentAmenities = filters.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter(id => id !== amenityId)
      : [...currentAmenities, amenityId];
    
    onFilterChange({ ...filters, amenities: updatedAmenities });
  };

  const handleResetFilters = () => {
    onFilterChange({
      location: filters.location,
      checkIn: null,
      checkOut: null,
      guests: undefined,
      priceMin: undefined,
      priceMax: undefined,
      propertyType: [],
      amenities: [],
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label htmlFor="location" className="label">Location</label>
          <div className="relative">
            <input
              id="location"
              type="text"
              placeholder="Where are you going?"
              className="input pl-9"
              value={filters.location || ''}
              onChange={handleLocationChange}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label htmlFor="check-in" className="label">Check-in</label>
          <div className="relative datepicker-container">
            <DatePicker
              id="check-in"
              selected={filters.checkIn}
              onChange={handleCheckInChange}
              selectsStart
              startDate={filters.checkIn}
              endDate={filters.checkOut}
              minDate={new Date()}
              placeholderText="Add date"
              className="input pl-9"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* Check-out */}
        <div>
          <label htmlFor="check-out" className="label">Check-out</label>
          <div className="relative datepicker-container">
            <DatePicker
              id="check-out"
              selected={filters.checkOut}
              onChange={handleCheckOutChange}
              selectsEnd
              startDate={filters.checkIn}
              endDate={filters.checkOut}
              minDate={filters.checkIn || new Date()}
              placeholderText="Add date"
              className="input pl-9"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className="label">Guests</label>
          <div className="relative">
            <select
              id="guests"
              className="input pl-9 appearance-none"
              value={filters.guests || ''}
              onChange={handleGuestsChange}
            >
              <option value="">Any number</option>
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5">5 guests</option>
              <option value="6">6+ guests</option>
            </select>
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          className="text-primary-600 text-sm font-medium flex items-center"
          onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
        >
          {isAdvancedFiltersOpen ? 'Hide' : 'Show'} advanced filters
        </button>

        <div className="flex space-x-3">
          <button
            type="button"
            className="btn btn-secondary text-sm"
            onClick={handleResetFilters}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-primary text-sm"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isAdvancedFiltersOpen && (
        <div className="mt-6 pt-4 border-t border-neutral-200 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-neutral-500" />
                Price Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price-min" className="label">Min Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                    <input
                      id="price-min"
                      type="number"
                      min="0"
                      placeholder="0"
                      className="input pl-7"
                      value={filters.priceMin || ''}
                      onChange={handlePriceMinChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="price-max" className="label">Max Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                    <input
                      id="price-max"
                      type="number"
                      min="0"
                      placeholder="1000+"
                      className="input pl-7"
                      value={filters.priceMax || ''}
                      onChange={handlePriceMaxChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Home className="w-5 h-5 mr-2 text-neutral-500" />
                Property Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                      checked={(filters.propertyType || []).includes(type.id)}
                      onChange={() => handlePropertyTypeChange(type.id)}
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {amenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                    checked={(filters.amenities || []).includes(amenity.id)}
                    onChange={() => handleAmenityChange(amenity.id)}
                  />
                  <span>{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;