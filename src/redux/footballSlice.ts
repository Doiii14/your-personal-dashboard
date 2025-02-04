import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Team {
  id: number;
  name: string;
  crest: string;
}

interface Match {
  id: number;
  utcDate: string;
  status: string;
  venue: string;
  homeTeam: Team;
  awayTeam: Team;
  competition: {
    name: string;
    emblem: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
}

interface FootballState {
  matches: Match[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FootballState = {
  matches: [],
  status: 'idle',
  error: null,
};

// Creazione dell'async thunk per chiamare l'API
export const fetchMatches = createAsyncThunk('football/fetchMatches', async () => {
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.football-data.org/v4/matches';

  const response = await axios.get(corsProxy + apiUrl, {
    headers: {
      'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
    },
  });

  return response.data.matches;
});

const footballSlice = createSlice({
  name: 'football',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Errore nel caricamento dei dati';
      });
  },
});

export default footballSlice.reducer;
