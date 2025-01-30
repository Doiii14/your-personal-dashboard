import React from "react";
import { Link } from "react-router-dom"; 

// Sidebar component
const Sidebar: React.FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 z-50 bg-gray-800 w-64 p-5 shadow-lg h-screen">
      <h2 className="text-lg font-semibold text-gray-200 mb-6">
        Your Dashboard
      </h2>
      <ul className="mt-4 space-y-4">
        <li>
          <Link
            to="/weather"
            className="block p-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 w-full text-center text-xl font-semibold transition-all"
          >
            Weather
          </Link>
        </li>
        <li>
          <Link
            to="/stock-market"
            className="block p-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 w-full text-center text-xl font-semibold transition-all"
          >
            Stock Market
          </Link>
        </li>
        <li>
          <Link
            to="/football"
            className="block p-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 w-full text-center text-xl font-semibold transition-all"
          >
            Football
          </Link>
        </li>
        <li>
          <Link
            to="/news"
            className="block p-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 w-full text-center text-xl font-semibold transition-all"
          >
            News
          </Link>
        </li>
        <li>
          <Link
            to="/recommended-film"
            className="block p-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 w-full text-center text-xl font-semibold transition-all"
          >
            Recommended Film
          </Link>
        </li>
        <li>
          <Link
            to="/recipe-tips"
            className="block p-4 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 w-full text-center text-xl font-semibold transition-all"
          >
            Recipe Tips
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
