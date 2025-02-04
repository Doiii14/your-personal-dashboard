import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../redux/footballSlice';
import { RootState, AppDispatch } from '../redux/store'; // Importa AppDispatch
import FootballWidget from '../widget/FootballWidget';

const Football: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Usa il tipo AppDispatch
  const { matches, status, error } = useSelector((state: RootState) => state.football);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMatches());
    }
  }, [dispatch, status]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Football Information</h1>
      <p className="mt-4 text-gray-600">
        Here you can check the latest football match updates.
      </p>
      {status === 'loading' && (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      )}
      {status === 'failed' && (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="text-red-500">
            <p className="font-bold">Errore:</p>
            <p>{error}</p>
          </div>
        </div>
      )}
      {status === 'succeeded' && <FootballWidget matches={matches} />}
    </div>
  );
};

export default Football;
