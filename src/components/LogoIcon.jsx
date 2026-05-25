import React from 'react';

const LogoIcon = ({ className = "w-8 h-8", glow = false }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={glow ? { filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.2))' } : {}}
    >
      <path d="M8.25 17.25L3 12L8.25 6.75L9.31 7.81L5.12 12L9.31 16.19L8.25 17.25ZM15.75 17.25L14.69 16.19L18.88 12L14.69 7.81L15.75 6.75L21 12L15.75 17.25ZM13.88 4.25L10.12 19.75L8.62 19.75L12.38 4.25L13.88 4.25Z" />
    </svg>
  );
};

export default LogoIcon;
