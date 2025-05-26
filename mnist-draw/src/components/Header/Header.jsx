import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <>
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <h1 className="text-2xl">
        MNIST Sketch Recognition
      </h1>
      <p className='text-center text-gray-400 text-sm mt-2'>
        Draw | Experiment | Learn how CNNs work
      </p>
    </div>
    </>
  );
};

export default Header;
