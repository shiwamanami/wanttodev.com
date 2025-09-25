import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        isScrolled ? "bg-gray-900/60" : "bg-gray-900/30"
      } sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4">
        <Link
          to="/"
          className="flex items-center text-xl md:text-2xl font-bold no-underline mb-4 md:mb-0"
        >
          <img src={logo} className="h-8 md:h-10" alt="logo" />
          <span className="font-mincho">WantToDev</span>
        </Link>
        <div className="flex gap-4 md:gap-8">
          <Link
            to="/works"
            className="no-underline px-3 md:px-4 py-2 rounded hover:bg-white/20 transition-colors"
          >
            Works
          </Link>
          <Link
            to="/blog"
            className="no-underline px-3 md:px-4 py-2 rounded hover:bg-white/20 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="no-underline px-3 md:px-4 py-2 rounded hover:bg-white/20 transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
