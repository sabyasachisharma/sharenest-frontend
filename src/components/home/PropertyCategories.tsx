import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Tent, Castle } from 'lucide-react';

interface CategoryProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  link: string;
}

const Category: React.FC<CategoryProps> = ({ title, icon, count, link }) => (
  <Link 
    to={link}
    className="flex flex-col items-center p-6 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors"
  >
    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-1">{title}</h3>
    <p className="text-neutral-500 text-sm">{count} properties</p>
  </Link>
);

const PropertyCategories: React.FC = () => {
  const categories = [
    { 
      title: 'Houses', 
      icon: <Home className="w-8 h-8 text-primary-600" />, 
      count: 1245, 
      link: '/search?type=house' 
    },
    { 
      title: 'Apartments', 
      icon: <Building className="w-8 h-8 text-primary-600" />, 
      count: 853, 
      link: '/search?type=apartment' 
    },
    { 
      title: 'Unique Stays', 
      icon: <Castle className="w-8 h-8 text-primary-600" />, 
      count: 432, 
      link: '/search?type=unique' 
    },
    { 
      title: 'Outdoors', 
      icon: <Tent className="w-8 h-8 text-primary-600" />, 
      count: 327, 
      link: '/search?amenities=outdoors' 
    },
  ];

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Browse by Category</h2>
        <p className="text-neutral-600 text-center mb-10">Explore our various types of accommodations</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Category
              key={category.title}
              title={category.title}
              icon={category.icon}
              count={category.count}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;