import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AssetData {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  type: "stock" | "crypto";
}

interface StocksState {
  assets: AssetData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Stato iniziale
const initialState: StocksState = {
  assets: [],
  status: "idle",
  error: null,
};

// Thunk per chiamare l'API
export const fetchAssets = createAsyncThunk("stocks/fetchAssets", async (_, { rejectWithValue }) => {
  try {
    const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
    if (!apiKey) throw new Error("API Key is missing");

    const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN"];
    const cryptos = ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "BINANCE:BNBUSDT", "BINANCE:ADAUSDT"];
    const fetchedAssets: AssetData[] = [];

    // Fetch stocks
    for (const symbol of stocks) {
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
      const data = response.data;
      if (data) {
        fetchedAssets.push({
          symbol,
          currentPrice: data.c,
          change: data.d,
          changePercent: data.dp,
          type: "stock",
        });
      }
    }

    // Fetch cryptos
    for (const symbol of cryptos) {
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
      const data = response.data;
      if (data) {
        fetchedAssets.push({
          symbol: symbol.replace("BINANCE:", ""),
          currentPrice: data.c,
          change: data.d,
          changePercent: data.dp,
          type: "crypto",
        });
      }
    }

    return fetchedAssets;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch assets");
  }
});

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action: PayloadAction<AssetData[]>) => {
        state.status = "succeeded";
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default stocksSlice.reducer;
