import React from 'react';

const LiveTv = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-white text-3xl font-bold mb-6 border-b-2 border-red-600 pb-2">
        Live News
      </h1>

      <div className="w-full max-w-3xl aspect-video rounded overflow-hidden shadow-lg">
        <iframe
          src="https://www.mjunoon.tv/embedplayer/abb-takk-news-live.html"
          className="w-full h-full border-none"
          allowFullScreen
          title="Live TV Stream"
        ></iframe>
      </div>
    </div>
  );
};

export default LiveTv;
