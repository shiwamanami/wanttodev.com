import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Header: React.FC = () => {
  return (
    <nav className="bg-gray-800/5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4">
        <Link
          to="/"
          className="flex items-center text-white text-xl md:text-2xl font-bold no-underline mb-4 md:mb-0"
        >
          <img src={logo} className="h-8 md:h-10 mr-2" alt="logo" />
          <span>WantToDev</span>
        </Link>
        <div className="flex gap-4 md:gap-8">
          <Link
            to="/works"
            className="text-white no-underline px-3 md:px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Works
          </Link>
          <Link
            to="/blog"
            className="text-white no-underline px-3 md:px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="text-white no-underline px-3 md:px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
