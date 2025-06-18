import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  isFavorite = false,
  onToggleFavorite
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <Link
      to={`/properties/${property.id}`}
      className="card group animate-fade-in hover:scale-[1.02] transition-transform"
    >
      {/* Property Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white px-2 py-1 rounded text-xs font-medium text-neutral-800">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-accent-500 text-accent-500' : 'text-neutral-600'}`} />
          </button>
        )}
      </div>

      {/* Property Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{property.title}</h3>
          
          {property.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
              <span className="text-sm font-medium ml-1">{property.rating}</span>
              {property.reviewCount && (
                <span className="text-xs text-neutral-500 ml-1">({property.reviewCount})</span>
              )}
            </div>
          )}
        </div>
        
        <p className="text-neutral-600 text-sm mb-2">{property.location.city}, {property.location.country}</p>
        
        <div className="flex items-center text-sm text-neutral-600 mb-3">
          <span>{property.bedroomCount} beds</span>
          <span className="mx-1">•</span>
          <span>{property.bathroomCount} baths</span>
          <span className="mx-1">•</span>
          <span>Up to {property.maxGuestCount} guests</span>
        </div>
        
        <div className="font-medium">
          <span className="text-neutral-900">${property.pricePerNight}</span>
          <span className="text-neutral-600 text-sm"> / night</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;