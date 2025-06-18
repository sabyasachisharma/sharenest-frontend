import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Property } from '../../types';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Stays</h2>
            <p className="text-neutral-600">Handpicked homes for your next getaway</p>
          </div>
          <Link to="/search" className="mt-4 sm:mt-0 text-primary-600 font-medium hover:text-primary-700">
            View all properties →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
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
                
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white px-2 py-1 rounded text-xs font-medium text-neutral-800">
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg line-clamp-1">{property.title}</h3>
                  
                  {property.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                      <span className="text-sm font-medium ml-1">{property.rating}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-neutral-600 text-sm mb-2">{property.location.city}, {property.location.country}</p>
                
                <div className="flex items-center text-sm text-neutral-600 mb-3">
                  <span>{property.bedroomCount} beds</span>
                  <span className="mx-1">•</span>
                  <span>{property.bathroomCount} baths</span>
                </div>
                
                <div className="font-medium">
                  <span className="text-neutral-900">${property.pricePerNight}</span>
                  <span className="text-neutral-600 text-sm"> / night</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;