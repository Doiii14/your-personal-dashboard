// src/pages/RecipePage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchRecipeOfTheDay, regenerateRecipe } from '../redux/recipeSlice';

const RecipePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipe, loading, error } = useSelector((state: RootState) => state.recipe);

  // Carica la ricetta del giorno all'avvio
  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipeOfTheDay());
    }
  }, [dispatch, recipe]);

  // Funzione per rigenerare la ricetta
  const handleRegenerate = () => {
    dispatch(regenerateRecipe());
    dispatch(fetchRecipeOfTheDay());
  };

  // Funzione per rimuovere i tag HTML dalle istruzioni
  const removeHtmlTags = (text: string) => {
    return text.replace(/<\/?[^>]+(>|$)/g, ""); // Rimuove i tag HTML
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="text-red-500">
          <p className="font-bold">Errore:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Ricetta del Giorno</h1>
      <p className="text-lg text-gray-600 text-center mb-8">Scopri una ricetta interessante per oggi!</p>
      {recipe && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Immagine della ricetta */}
          <div className="relative mb-4">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {/* Titolo ricetta */}
          <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>

          {/* Link alla ricetta completa */}
          <p className="text-sm mt-4">
            {recipe.sourceUrl ? (
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Clicca qui per vedere la ricetta completa
              </a>
            ) : (
              <span>Link non disponibile</span>
            )}
          </p>

          {/* Istruzioni senza tag HTML */}
          <div className="text-sm mt-4 text-gray-700">
            {removeHtmlTags(recipe.instructions)}
          </div>
        </div>
      )}

      {/* Bottone per generare una nuova ricetta */}
      <div className="text-center mt-6">
        <button
          onClick={handleRegenerate}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Genera un'altra ricetta
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
