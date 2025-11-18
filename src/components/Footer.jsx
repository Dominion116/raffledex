import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-card/90 text-card-foreground p-6 border-t border-border mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} RaffleDex. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-card-foreground">Privacy</a>
          <a href="#" className="text-muted-foreground hover:text-card-foreground">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
