
import React from 'react';

const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className="fixed top-0 left-0 p-3 m-3 bg-luxury-gold text-luxury-navy font-medium -translate-y-full focus:translate-y-0 z-50 transition-transform duration-300 ease-in-out"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
