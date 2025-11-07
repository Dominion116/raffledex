import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Raffle DApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;