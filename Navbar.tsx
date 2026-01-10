
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-20">
          <div className="flex items-center">
            {/* Reproduced Logo from Image moved to the right */}
            <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
              <path d="M21.5 5L38 14.5V33.5L21.5 43L5 33.5V14.5L21.5 5Z" stroke="url(#paint0_linear)" strokeWidth="3" />
              <path d="M14 15V33M14 24L26 15M14 24L26 33" stroke="url(#paint0_linear)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <text x="55" y="34" fill="#0F172A" style={{ font: 'bold 28px Inter, sans-serif', letterSpacing: '0.05em' }}>KRYPTA</text>
              <defs>
                <linearGradient id="paint0_linear" x1="5" y1="5" x2="38" y2="43" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0EA5E9" />
                  <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
