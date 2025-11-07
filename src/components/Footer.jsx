import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground p-4 border-t border-border mt-auto">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} RaffleDex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
