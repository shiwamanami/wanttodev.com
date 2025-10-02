import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 pt-20 pb-5">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-xs">
          &copy; {new Date().getFullYear()} WantToDev. All rights reserved.
        </p>
        <div>
          <Link
            to="/privacy-policy"
            className="text-gray-400 hover:text-gray-100 transition-colors text-xs"
          >
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
