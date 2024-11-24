import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-zinc-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Student Management System</div> 

        
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        
        <ul className={`md:flex items-center ${isOpen ? "block" : "hidden"} md:block`}>
          <li className="ml-6">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li className="ml-6">
            <Link
              to="/saveStudent"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              Add
            </Link>
          </li>

          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
