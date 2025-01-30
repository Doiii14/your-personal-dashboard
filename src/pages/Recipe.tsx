import React from "react";

const Recipe: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Recipe Information
      </h1>
      <p className="mt-4 text-gray-600">
        Here you can check the latest recipe updates.
      </p>
    </div>
  );
};

export default Recipe;