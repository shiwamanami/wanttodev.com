import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} WantToDev. All rights reserved.</p>
        <div className="mt-4">
          <Link
            to="/privacy-policy"
            className="text-blue-400 hover:text-blue-300 transition-colors text-xs"
          >
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
