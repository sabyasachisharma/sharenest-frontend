import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  CalendarClock, 
  GraduationCap, 
  Users, 
  Bed, 
  Warehouse,
  Train,
  Briefcase
} from 'lucide-react';

const categories = [
  {
    id: 'entire-flat',
    title: 'Entire Flats',
    description: 'Full apartments available for sublet',
    icon: <Building2 className="w-6 h-6" />,
    link: '/search?type=entire-flat'
  },
  {
    id: 'private-room',
    title: 'Private Rooms',
    description: 'Single rooms in shared apartments',
    icon: <Bed className="w-6 h-6" />,
    link: '/search?type=private-room'
  },
  {
    id: 'short-term',
    title: 'Short-term Sublets',
    description: '1-3 months temporary stays',
    icon: <CalendarClock className="w-6 h-6" />,
    link: '/search?duration=short-term'
  },
  {
    id: 'student',
    title: 'Student Housing',
    description: 'Perfect for university students',
    icon: <GraduationCap className="w-6 h-6" />,
    link: '/search?type=student'
  },
  {
    id: 'shared-living',
    title: 'Co-living Spaces',
    description: 'Community-focused shared living',
    icon: <Users className="w-6 h-6" />,
    link: '/search?type=co-living'
  },
  {
    id: 'near-transport',
    title: 'Near Transport',
    description: 'Well-connected locations',
    icon: <Train className="w-6 h-6" />,
    link: '/search?amenities=transport'
  },
  {
    id: 'professional',
    title: 'Professional Share',
    description: 'Ideal for working professionals',
    icon: <Briefcase className="w-6 h-6" />,
    link: '/search?type=professional'
  },
  {
    id: 'furnished',
    title: 'Furnished Flats',
    description: 'Ready to move in',
    icon: <Warehouse className="w-6 h-6" />,
    link: '/search?furnished=true'
  }
];

const CategoryBrowser: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Browse by Category</h2>
        <p className="text-lg text-neutral-600 mb-8">
          Find the perfect shared living space that matches your needs
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBrowser; 