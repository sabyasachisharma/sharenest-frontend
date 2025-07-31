import React, { useEffect } from 'react';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="text-neutral-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using ShareNest, you agree to be bound by these Terms of Service. 
            If you disagree with any part of these terms, you may not access our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <p className="mb-4">As a user of our platform, you agree to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and truthful information</li>
            <li>Maintain the security of your account</li>
            <li>Respect other users' privacy and rights</li>
            <li>Not engage in fraudulent or harmful activities</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Listing and Booking Rules</h2>
          <p className="mb-4">When using our platform:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>List only properties you have the right to sublet</li>
            <li>Provide accurate descriptions of your space</li>
            <li>Respect booking agreements and cancellation policies</li>
            <li>Communicate promptly with other users</li>
            <li>Follow local housing and subletting regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Platform Rules</h2>
          <p className="mb-4">Users must not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any laws or regulations</li>
            <li>Harass or discriminate against other users</li>
            <li>Share false or misleading information</li>
            <li>Attempt to manipulate our platform</li>
            <li>Use our service for unauthorized purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="mb-4">
            ShareNest serves as a platform connecting users and does not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Guarantee the accuracy of listings</li>
            <li>Act as a real estate agent or broker</li>
            <li>Provide legal or professional advice</li>
            <li>Assume responsibility for user transactions</li>
            <li>Guarantee the quality of accommodations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:support@sharenest.com" className="text-primary-600 hover:text-primary-700">
              support@sharenest.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 