// src/pages/News.tsx
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const News = () => {
  const { news, status } = useSelector((state: RootState) => state.news);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ultime Notizie</h1>

      {/* Sezione di caricamento */}
      {status === "loading" && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Sezione di errore */}
      {status === "failed" && (
        <div className="text-center text-red-500 mt-4">
          <p className="font-semibold">Errore nel caricamento delle news.</p>
        </div>
      )}

      {/* Sezione di successivo stato (quando i dati sono disponibili) */}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Immagine del notizia */}
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-4 inline-block"
                >
                  Leggi di più
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
