import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAssets } from "../redux/stocksSlice";

const StockWidget: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { assets, status, error } = useSelector((state: RootState) => state.stocks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAssets());
    }

    const interval = setInterval(() => {
      dispatch(fetchAssets());
    }, 60000); // Aggiorna ogni 60 secondi

    return () => clearInterval(interval);
  }, [dispatch, status]);

  if (status === "loading") return <div className="text-center text-gray-600">Loading assets...</div>;
  if (status === "failed") return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-8">
      {/* Sezione Stocks */}
      <div>
        <h2 className="text-2xl font-bold mb-4">📈 Stocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets
            .filter((asset) => asset.type === "stock")
            .map((asset) => (
              <div
                key={asset.symbol}
                className="p-6 border rounded-lg shadow-md bg-white text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold">{asset.symbol}</h3>
                <p className="text-xl font-semibold mt-2">💰 ${asset.currentPrice.toFixed(2)}</p>
                <p className={asset.change >= 0 ? "text-green-500 mt-2" : "text-red-500 mt-2"}>
                  {asset.change >= 0 ? "🔼" : "🔽"} {asset.change.toFixed(2)} ({asset.changePercent.toFixed(2)}%)
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Sezione Crypto */}
      <div>
        <h2 className="text-2xl font-bold mb-4">₿ Cryptocurrencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets
            .filter((asset) => asset.type === "crypto")
            .map((asset) => (
              <div
                key={asset.symbol}
                className="p-6 border rounded-lg shadow-md bg-white text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold">{asset.symbol}</h3>
                <p className="text-xl font-semibold mt-2">💰 ${asset.currentPrice.toFixed(2)}</p>
                <p className={asset.change >= 0 ? "text-green-500 mt-2" : "text-red-500 mt-2"}>
                  {asset.change >= 0 ? "🔼" : "🔽"} {asset.change.toFixed(2)} ({asset.changePercent.toFixed(2)}%)
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StockWidget;
