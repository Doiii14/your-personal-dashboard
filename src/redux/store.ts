import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import weatherReducer from "./weatherSlice";
import stocksReducer from "./stocksSlice"; 
import footballReducer from "./footballSlice";
import filmReducer from './filmSlice';
import recipeReducer from './recipeSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    weather: weatherReducer,
    stocks: stocksReducer, 
    football: footballReducer,
    film: filmReducer,
    recipe: recipeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
