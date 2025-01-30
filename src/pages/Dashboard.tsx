import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to the Dashboard!
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This is where you can view your data and analytics.
      </p>
      {/* Aggiungi altre informazioni o componenti relativi alla Dashboard qui */}
    </div>
  );
};

export default Dashboard;