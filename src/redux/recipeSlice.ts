// src/redux/recipeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Recipe {
  id: number;
  title: string;
  image: string;
  instructions: string;
  ingredients: string[];
  sourceUrl:string
}

interface RecipeState {
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipe: null,
  loading: true,
  error: null,
};

// Async thunk per recuperare la ricetta del giorno
export const fetchRecipeOfTheDay = createAsyncThunk(
  'recipe/fetchRecipeOfTheDay',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}&number=1`
      );
      return response.data.recipes[0]; // Restituisce la prima ricetta
    } catch (error) {
      return rejectWithValue('Errore nel recupero dei dati');
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    regenerateRecipe: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeOfTheDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeOfTheDay.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipeOfTheDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { regenerateRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
