import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Weather from "./pages/Weather";
import StockMarket from "./pages/Stocks";
import Football from "./pages/Football";
import News from "./pages/News";
import RecommendedFilm from "./pages/Film";
import RecipeTips from "./pages/Recipe";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar /> {}
        <div className="ml-64 p-6 flex-1">
          <Routes>
            <Route path="/weather" element={<Weather />} />
            <Route path="/stock-market" element={<StockMarket />} />
            <Route path="/football" element={<Football />} />
            <Route path="/news" element={<News />} />
            <Route path="/recommended-film" element={<RecommendedFilm />} />
            <Route path="/recipe-tips" element={<RecipeTips />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
