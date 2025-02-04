import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherState {
  city: string;
  weatherData: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Stato iniziale
const initialState: WeatherState = {
  city: "",
  weatherData: null,
  status: "idle",
  error: null,
};

// Thunk per chiamare l'API
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city: string) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
  );
  return { city, data: response.data };
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.city = action.payload.city;
        state.weatherData = action.payload.data;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
