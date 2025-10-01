import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-end items-center px-4 md:px-0 py-3 md:py-4">
        <div className="flex gap-4 md:gap-5">
          <Link
            to="/"
            className="no-underline px-3 md:px-4 py-2 hover:bg-white/20 transition-colors"
          >
            Top
          </Link>
          <Link
            to="/works"
            className="no-underline px-3 md:px-4 py-2 hover:bg-white/20 transition-colors"
          >
            Works
          </Link>
          <Link
            to="/blog"
            className="no-underline px-3 md:px-4 py-2 hover:bg-white/20 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="no-underline px-3 md:px-4 py-2 hover:bg-white/20 transition-colors"
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              to="/admin"
              className="no-underline px-3 md:px-4 py-2 hover:bg-white/20 transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
