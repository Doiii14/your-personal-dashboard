import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
}

interface NewsState {
  news: NewsArticle[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: NewsState = {
  news: [],
  status: "idle",
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const response = await fetch(
      `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=it`
    );
    const data = await response.json();
    return data.data.slice(0, 9); 
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default newsSlice.reducer;
