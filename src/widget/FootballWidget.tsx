import React from 'react';

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

interface FootballWidgetProps {
  matches: Match[];
}

const FootballWidget: React.FC<FootballWidgetProps> = ({ matches }) => {
  const formatDateTime = (utcDate: string) => {
    const date = new Date(utcDate);
    return new Intl.DateTimeFormat('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Partite del Giorno</h2>
        <p className="text-sm text-gray-600 mt-1">Dati forniti da football-data.org</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {matches.map((match) => (
            <div
              key={match.id}
              className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {/* Competizione */}
              <div className="flex items-center gap-2 mb-3">
                <img
                  src={match.competition.emblem}
                  alt={match.competition.name}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <span className="text-sm font-medium text-gray-600">
                  {match.competition.name}
                </span>
              </div>

              {/* Partita */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2 flex-1">
                    <img
                      src={match.homeTeam.crest}
                      alt={match.homeTeam.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="font-medium">{match.homeTeam.name}</span>
                  </div>

                  <div className="px-4 py-2 bg-gray-100 rounded-lg min-w-[90px] text-center">
                    {match.status === 'FINISHED' ? (
                      <span className="font-bold">
                        {match.score.fullTime.home} - {match.score.fullTime.away}
                      </span>
                    ) : (
                      <span className="text-sm">{formatDateTime(match.utcDate)}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="font-medium">{match.awayTeam.name}</span>
                    <img
                      src={match.awayTeam.crest}
                      alt={match.awayTeam.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {match.venue && (
                <div className="mt-2 text-sm text-gray-600">📍 {match.venue}</div>
              )}

              <div className="mt-2 text-xs text-gray-500">
                Stato: {match.status === 'SCHEDULED' ? 'In programma' : match.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FootballWidget;
