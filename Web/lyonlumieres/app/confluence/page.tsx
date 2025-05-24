'use client';

import { useState, useEffect } from 'react';

export default function Confluence() {
  const [divedIn, setDivedIn] = useState(false);
  const [storyStep, setStoryStep] = useState(0);

  // Show storytelling steps over time
  useEffect(() => {
    if (divedIn) {
      const timings = [1000, 3000, 5000]; // ms for each text step
      timings.forEach((delay, index) => {
        setTimeout(() => setStoryStep(index + 1), delay);
      });
    } else {
      setStoryStep(0);
    }
  }, [divedIn]);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* Immersive Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-5000 ease-in-out" 
        style={{
          backgroundImage: `url('/confluence-night.jpg')`,
          transform: divedIn ? 'scale(1.8)' : 'scale(1)',
        }} 
      />

      {/* Zoomable Foreground Image */}
      <img 
        src="/confluece-night.jpg" 
        alt="Immersive" 
        className={`
          absolute top-1/2 left-1/2 max-w-none w-[120vw] h-auto
          -translate-x-1/2 -translate-y-[60%] 
          transition-transform duration-5000 ease-in-out 
          ${divedIn ? 'scale-150' : 'scale-100'} 
          transform-origin-bottom cursor-pointer select-none z-10
        `} 
        onClick={() => !divedIn && setDivedIn(true)}
        draggable={false}
      />

      {/* Overlay */}
      <div 
        className={`
          absolute inset-0 bg-black transition-opacity duration-1000 
          ${divedIn ? 'opacity-0 pointer-events-none' : 'opacity-60'}
        `} 
      />

      {/* Initial Content */}
      {!divedIn && (
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Dive Into the Image</h1>
          <p className="mb-8 text-lg drop-shadow-md max-w-md mx-auto">
            Click the image to zoom in and explore.
          </p>
          <button 
            onClick={() => setDivedIn(true)}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded shadow-lg hover:bg-yellow-500 transition"
          >
            Dive In
          </button>
        </div>
      )}

      {/* Storytelling Text - only shows after diving in with larger text boxes */}
      {divedIn && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center px-8 max-w-4xl z-20 space-y-6">
          <p className={`
            bg-slate-700 bg-opacity-80 text-yellow-200 text-lg
            px-8 py-6 rounded-lg
            transition-opacity duration-1500 ease-in-out
            ${storyStep >= 1 ? 'opacity-100' : 'opacity-0'}
          `}>
            Après avoir exploré le siècle des Lumières qui fit rayonner Lyon comme foyer intellectuel, puis la Fête des Lumières qui illumine chaque année la ville de créativité et de ferveur populaire, un dernier regard s&apos;impose vers un lieu où ces deux héritages se rejoignent : le Musée des Confluences.
          </p>

          <p className={`
            text-yellow-200 text-lg bg-slate-700 
            px-6 py-4 rounded-lg
            transition-opacity duration-1500 ease-in-out
            ${storyStep >= 2 ? 'opacity-100' : 'opacity-0'}
          `}>
            Situé à la pointe sud de la Presqu&apos;île, à la jonction du Rhône et de la Saône, ce musée ouvert en 2014 ne se contente pas d&apos;exposer des objets. Il raconte le monde. Dans son architecture audacieuse, œuvre du cabinet Coop Himmelb(l)au, se lit déjà une ambition : déconstruire les cadres établis pour mieux relier les savoirs. Les vastes espaces internes accueillent des collections allant des origines de l&apos;univers aux cultures contemporaines, de la biologie à la mythologie. Chaque exposition est pensée comme un récit : celui de la complexité du réel et de notre place en son sein. On y vient non pas pour apprendre de manière linéaire, mais pour comprendre en réseau, à la manière des encyclopédistes du XVIIIe siècle.
          </p>

          <p className={`
            text-yellow-200 text-lg bg-slate-700 
            px-6 py-4 rounded-lg
            transition-opacity duration-1500 ease-in-out
            ${storyStep >= 3 ? 'opacity-100' : 'opacity-0'}
          `}>
            Lumière naturelle, artificielle, symbolique : au Musée des Confluences, elle circule partout. À travers les verrières du Cristal, dans les dispositifs interactifs, dans les parcours scénographiés. C’est un lieu de transition et de transformation, qui prolonge les Lumières du passé par celles du savoir contemporain. Même au-delà des murs, l’institution rayonne : par ses publications, ses partenariats avec la recherche, et son ouverture à tous les publics. En choisissant de conclure notre parcours lyonnais par cette halte, nous faisons le pari que la lumière, aujourd’hui encore, éclaire la connaissance — et qu’à Lyon, elle le fait avec éclat.
          </p>
        </div>
      )}
    </div>
  );
}
