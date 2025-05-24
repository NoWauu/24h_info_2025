import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  // Add your links here - just replace the URLs and titles
  const links = [
    {
      title: "Musée des Confluences",
      url: "/confluence",
      description: "Venez découvrir le musée des Confluences à Lyon, un lieu unique qui allie culture et nature."
    },
    {
      title: "La fête des Lumières", 
      url: "/fete",
      description: "Participez à la fête des Lumières, un événement incontournable de Lyon qui illumine la ville chaque année."
    },
    {
      title: "Les fréres Lumières",
      url: "/freres-lumiere",
      description: "Découvrez l'histoire fascinante des frères Lumière, pionniers du cinéma et inventeurs de la photographie."
    }
    // Add more links like this:
    // {
    //   title: "Your Link Title",
    //   url: "https://your-url.com",
    //   description: "Optional description"
    // }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4 flex items-center justify-center"
      style={{
        backgroundImage: "url(/confluence-expo.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay"
      }}
    >
      <div className="max-w-md w-full">
        {/* Links Section */}
        <div className="space-y-3 mb-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="block w-full p-4 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{link.title}</h3>
                  {link.description && (
                    <p className="text-sm text-gray-600 mt-1">{link.description}</p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
