import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface FilmState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: FilmState = {
  movie: null,
  loading: true,
  error: null,
};

// Async thunk per recuperare il film del giorno
export const fetchFilmOfTheDay = createAsyncThunk(
  'film/fetchFilmOfTheDay',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMBD_API_KEY}&language=it-IT`
      );
      const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
      return randomMovie;
    } catch (error) {
      return rejectWithValue('Errore nel recupero dei dati');
    }
  }
);

const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    regenerateFilm: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmOfTheDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilmOfTheDay.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchFilmOfTheDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { regenerateFilm } = filmSlice.actions;

export default filmSlice.reducer;
