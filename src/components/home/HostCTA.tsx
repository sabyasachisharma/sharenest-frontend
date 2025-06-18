import React from 'react';
import { Link } from 'react-router-dom';

const HostCTA: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="bg-primary-50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Earn money as a host
              </h2>
              <p className="text-lg text-primary-800 mb-6">
                Share your space, earn extra income, and connect with guests from around the world.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center mr-3">
                    <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                  </span>
                  <span className="text-primary-800">List your property for free</span>
                </li>
                <li className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center mr-3">
                    <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                  </span>
                  <span className="text-primary-800">Set your own schedule and prices</span>
                </li>
                <li className="flex items-center">
                  <span className="h-6 w-6 rounded-full bg-primary-200 flex items-center justify-center mr-3">
                    <span className="h-2 w-2 rounded-full bg-primary-600"></span>
                  </span>
                  <span className="text-primary-800">We handle payments and provide support</span>
                </li>
              </ul>
              <div>
                <Link to="/register?role=host" className="btn btn-primary px-8 py-3 text-base">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="hidden md:block h-full">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Home hosting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostCTA;