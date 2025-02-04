// src/pages/FilmPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchFilmOfTheDay, regenerateFilm } from '../redux/filmSlice'; // Assicurati di usare il nome corretto

const FilmPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movie, loading, error } = useSelector((state: RootState) => state.film);

  useEffect(() => {
    if (!movie) {
      dispatch(fetchFilmOfTheDay());
    }
  }, [dispatch, movie]);

  const handleRegenerate = () => {
    dispatch(regenerateFilm());
    dispatch(fetchFilmOfTheDay());
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
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Film del Giorno</h1>
      <p className="text-lg text-gray-600 text-center mb-8">Scopri un film consigliato per oggi.</p>
      {movie && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Immagine del film */}
          <div className="relative mb-6">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Dettagli del film */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">{movie.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{movie.release_date}</p>
            <p className="text-sm text-gray-700 mt-4">{movie.overview}</p>
            <div className="mt-4 text-sm text-yellow-500">
              <span>Voto: {movie.vote_average}</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottone per generare un altro film */}
      <div className="text-center mt-6">
        <button
          onClick={handleRegenerate}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Genera un altro film
        </button>
      </div>
    </div>
  );
};

export default FilmPage;
