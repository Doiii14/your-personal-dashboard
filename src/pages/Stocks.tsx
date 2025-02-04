import React from "react";
import StockWidget from "../widget/StockWidget"; // Importiamo il widget

const Stocks: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">📊 Stock Market</h1>
      <p className="text-lg text-gray-600 mb-6">
        Check the latest stock market updates for major companies.
      </p>

      <StockWidget />
    </div>
  );
};

export default Stocks;
