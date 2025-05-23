"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import LumiereTimeline from "@/components/LumiereTimeline";
import RevealSection from "@/components/RevealSection";
import TorchRevealImage from "@/components/TorchRevealImage";
import lightStyles from "../../styles/light.module.css";
import AutoTorchRevealText from "@/components/AutoTorchRevealText";

export default function FreresLumierePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [grayscaleValue, setGrayscaleValue] = useState(0);
  const [revealRatio, setRevealRatio] = useState(0);

  const fullText =
    "Auguste et Louis Lumière sont deux inventeurs français nés à Besançon, mais c'est à Lyon qu'ils ont réalisé leurs travaux les plus marquants. En 1895, ils organisent la première projection publique payante d'un film, marquant la naissance du cinéma moderne. Leur cinématographe, à la fois caméra, projecteur et développeur, est un condensé d'ingéniosité. Leur héritage rayonne encore aujourd'hui dans la culture cinématographique mondiale.";
  const displayed = fullText.slice(
    0,
    Math.floor(fullText.length * revealRatio)
  );

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y < 800) {
      setGrayscaleValue(0);
    } else if (y > 1600) {
      setGrayscaleValue(1);
    } else {
      const ratio = (y - 800) / 800;
      setGrayscaleValue(ratio);
    }
  });

  return (
    <main className="bg-black text-white px-6 py-12 space-y-20">
      {/* 1. Header sobre */}
      <section className="text-center space-y-4">
        <AutoTorchRevealText
          text="Les Frères Lumière"
          fontSize="text-4xl"
          duration={2000}
        />
        <AutoTorchRevealText
          text="Inventeurs lyonnais du cinématographe, pionniers de l'image en mouvement, Auguste et Louis Lumière ont illuminé l'histoire du cinéma."
          fontSize="text-base"
          duration={2500}
          //   direction="right"
          delay={2000}
          className="max-w-2xl mx-auto text-gray-400 font-normal block"
        />
      </section>

      {/* 2. Présentation statique */}
      <RevealSection>
        <section className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div
            style={{
              filter: `grayscale(${grayscaleValue})`,
              transition: "filter 0.3s ease",
            }}
            className="rounded shadow-lg"
          >
            <TorchRevealImage
              src="/freres.jpg"
              width={400}
              height={400}
              grayscale={grayscaleValue}
              onRevealChange={setRevealRatio}
            />
          </div>
          <div className="text-lg text-gray-300 transition-all duration-300 max-w-xl">
            {displayed}
          </div>
        </section>
      </RevealSection>

      {/* 3. Cinématographe interactif */}
      <RevealSection>
        <section className="text-center">
          {!showVideo ? (
            <div className="relative flex justify-center items-center h-[250px]">
              {revealRatio < 1 ? (
                <p className="text-gray-400 mt-2">
                  Cliquez pour voir le cinéma naître...
                </p>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dx = e.clientX - (rect.left + rect.width / 2);
                    const dy = e.clientY - (rect.top + rect.height / 2);
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = Math.sqrt(
                      (rect.width / 2) ** 2 + (rect.height / 2) ** 2
                    );
                    const glow = 0.2 + Math.max(0, 1 - dist / maxDist);
                    e.currentTarget.style.boxShadow = `0 0 30px rgba(255, 255, 200, ${glow})`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => setShowVideo(true)}
                  className="text-5xl text-yellow-200 font-bold bg-black/40 backdrop-blur-md border border-yellow-400 rounded-full px-6 py-4 transition duration-300"
                >
                  ▶
                </motion.button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full max-w-4xl mx-auto"
            >
              <video
                src="/projection.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="rounded shadow-lg"
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded"
              >
                Fermer
              </button>
            </motion.div>
          )}
        </section>
      </RevealSection>

      {/* 4. Citation animée */}
      <RevealSection>
        <blockquote
          className={`text-center text-xl italic max-w-3xl mx-auto transition duration-300 ${lightStyles.quote}`}
        >
          « Le cinéma est une invention sans avenir. »
          <br />
          <span className="text-sm not-italic text-gray-500">
            &mdash; Louis Lumière
          </span>
        </blockquote>
      </RevealSection>

      {/* 5. Timeline lumineuse */}
      <RevealSection>
        <LumiereTimeline />
      </RevealSection>

      {/* 6. Section Siècle des Lumières */}
      <RevealSection>
        <section className="max-w-4xl mx-auto space-y-6 text-lg text-gray-200">
          <h2 className="text-2xl font-semibold text-white">
            Du Siècle des Lumières à la lumière projetée
          </h2>
          <p>
            Le siècle des Lumières prônait le savoir, la raison et la
            transmission des idées. Plus d’un siècle plus tard, à Lyon, les
            frères Lumière ont éclairé l’avenir à leur manière &mdash; par la
            lumière projetée sur écran.
          </p>
          <p>
            Une filiation symbolique, qui fait de Lyon le creuset de deux
            révolutions : celle des idées, puis celle des images.
          </p>
        </section>
      </RevealSection>
    </main>
  );
}
