"use client";

import { motion } from "framer-motion";

const events = [
  {
    year: "1892",
    title: "Invention du cinématographe",
    desc: "Les frères Lumière conçoivent un appareil révolutionnaire : il filme, développe et projette. Une invention née à Lyon.",
  },
  {
    year: "1895",
    title: "Première projection publique",
    desc: "Le 28 décembre, à Paris, les Lumière montrent leur film au monde. Mais tout a commencé dans leur institut lyonnais.",
  },
  {
    year: "Aujourd’hui",
    title: "Un héritage toujours vivant",
    desc: "Lyon rend hommage chaque année avec la Fête des Lumières. Un clin d'œil lumineux à leur nom et leur génie.",
  },
];

export default function LumiereTimeline() {
  return (
    <section className="relative border-l-4 border-white/30 pl-6 ml-4 my-16">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="mb-12 relative"
        >
          <div className="absolute -left-[28px] top-1 w-4 h-4 bg-white rounded-full border border-white shadow-lg" />
          <h3 className="text-xl font-bold text-white">
            {event.year} — {event.title}
          </h3>
          <p className="text-gray-300 mt-2 text-sm md:text-base max-w-xl">
            {event.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
