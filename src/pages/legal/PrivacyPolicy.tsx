import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-neutral-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            This Privacy Policy describes how ShareNest ("we," "us," or "our") collects, uses, and protects your personal information. 
            By using our platform, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Basic profile information (name, email)</li>
            <li>Contact information for communication purposes</li>
            <li>Property listing details provided by hosts</li>
            <li>Search preferences and browsing activity</li>
            <li>Messages between users on our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Facilitate property listings and bookings</li>
            <li>Enable communication between users</li>
            <li>Improve our services and user experience</li>
            <li>Send important updates about our services</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Encryption of sensitive data</li>
            <li>Regular security assessments</li>
            <li>Secure data storage practices</li>
            <li>Limited access to personal information</li>
            <li>Regular data protection training for our team</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Receive your data in a portable format</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@sharenest.com" className="text-primary-600 hover:text-primary-700">
              support@sharenest.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 