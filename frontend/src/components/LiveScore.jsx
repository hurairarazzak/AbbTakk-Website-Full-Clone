import React from 'react'
import { useEffect, useState } from 'react';

const teamFlags = {
  "India": "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
  "Pakistan": "https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg",
  "England": "https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg",
  "Australia": "https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg",
  "South Africa": "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
  "Sri Lanka": "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",
  "Bangladesh": "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",
  "New Zealand": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
  "Afghanistan": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
  "West Indies": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_the_West_Indies_Cricket_Board.svg",
  "Zimbabwe": "https://upload.wikimedia.org/wikipedia/commons/6/6a/Flag_of_Zimbabwe.svg",
  "Ireland": "https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg",
  "Nepal": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg",
  "Netherlands": "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
};

const getFlag = (teamName) => teamFlags[teamName] || "";

const ODILiveScoreCard = () => {
  const [match, setMatch] = useState(null);

  const fetchODIMatch = async () => {
    try {
      const res = await fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8b49e500c3mshacabe2a256f5df0p14053bjsnabe36f2092f7',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      });

      const data = await res.json();
      const all = data?.typeMatches?.flatMap(t => t.seriesMatches || []);
      const allMatches = all.flatMap(series => series.seriesAdWrapper?.matches || []);
      const odiMatch = allMatches.find(
        m => m.matchInfo?.matchFormat === 'ODI' && m.matchScore
      );

      setMatch(odiMatch || null);
    } catch (err) {
      console.error('Error fetching ODI match:', err);
    }
  };

  useEffect(() => {
    fetchODIMatch();
    const interval = setInterval(fetchODIMatch, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!match) return null;

  const { team1, team2, matchFormat, status, tossResults } = match.matchInfo;
  const score1 = match.matchScore?.team1Score?.inngs1;
  const score2 = match.matchScore?.team2Score?.inngs1;

  return (
    <div className="bg-white border border-red-600 rounded-2xl p-6 max-w-4xl mx-auto mt-10 shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-red-600">
          {team1?.teamName} vs {team2?.teamName}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Team 1 */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src={getFlag(team1?.teamName)}
            alt={team1?.teamName}
            className="w-12 h-12 mb-1 rounded-full border"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <p className="font-semibold">{team1?.teamName}</p>
          <p className="text-xl font-bold text-gray-800">
            {score1 ? `${score1.runs}/${score1.wickets}` : 'Yet to bat'}
          </p>
          <p className="text-xs text-gray-500">
            {score1?.overs ? `(${score1.overs} ov)` : ''}
          </p>
        </div>

        {/* Center Info */}
        <div className="text-center w-full md:w-1/3 border-t md:border-t-0 md:border-x border-gray-300 py-3 md:py-0">
          <span className="inline-flex items-center justify-center bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
            ● Live
          </span>
          <p className="text-sm font-medium text-gray-700">{status}</p>
          <p className="text-xs text-gray-500 mt-1">
            {tossResults?.tossWinnerName
              ? `${tossResults.tossWinnerName} chose to ${tossResults.decision}`
              : 'Toss info N/A'}
          </p>
          <p className="text-xs mt-1 text-gray-400">{matchFormat} Match</p>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src={getFlag(team2?.teamName)}
            alt={team2?.teamName}
            className="w-12 h-12 mb-1 rounded-full border"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <p className="font-semibold">{team2?.teamName}</p>
          <p className="text-xl font-bold text-gray-800">
            {score2 ? `${score2.runs}/${score2.wickets}` : 'Yet to bat'}
          </p>
          <p className="text-xs text-gray-500">
            {score2?.overs ? `(${score2.overs} ov)` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ODILiveScoreCard;
