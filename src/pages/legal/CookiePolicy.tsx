import React, { useEffect } from 'react';

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-neutral-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and 
            understanding how you use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
              <p className="mb-2">Required for the platform to function properly:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Authentication and security</li>
                <li>Basic platform functionality</li>
                <li>Session management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Preference Cookies</h3>
              <p className="mb-2">Remember your choices and settings:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Language preferences</li>
                <li>Search history</li>
                <li>User interface customization</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
              <p className="mb-2">Help us understand how users interact with our platform:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Page visit statistics</li>
                <li>User behavior patterns</li>
                <li>Performance monitoring</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookie Management</h2>
          <p className="mb-4">You can manage cookies through your browser settings:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Block all or certain types of cookies</li>
            <li>Delete existing cookies</li>
            <li>Set preferences for different websites</li>
            <li>Receive notifications when cookies are set</li>
          </ul>
          <p className="mb-4">
            Please note that blocking some types of cookies may impact your experience on our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p className="mb-4">We protect your data by:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Using secure encryption for cookie data</li>
            <li>Regularly reviewing our cookie practices</li>
            <li>Only collecting necessary information</li>
            <li>Not sharing cookie data with third parties</li>
            <li>Maintaining transparent cookie policies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy periodically. Any changes will be posted on this page 
            with an updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our Cookie Policy, please contact us at{' '}
            <a href="mailto:support@sharenest.com" className="text-primary-600 hover:text-primary-700">
              support@sharenest.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicy; 