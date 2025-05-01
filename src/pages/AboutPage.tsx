import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About TechStore</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to TechStore, your premier destination for cutting-edge technology and electronics. 
            We pride ourselves on offering the latest and greatest in tech innovations, backed by 
            exceptional customer service and competitive prices.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            To provide our customers with the best technology products and shopping experience, 
            making the latest innovations accessible to everyone.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Curated selection of premium tech products</li>
            <li>Competitive prices and regular deals</li>
            <li>Expert customer support</li>
            <li>Fast and reliable shipping</li>
            <li>Secure shopping experience</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;