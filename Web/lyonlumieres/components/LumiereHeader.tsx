"use client";

import { motion } from "framer-motion";

const events = [
  {
    year: "1895",
    title: "Première projection",
    desc: "Les Frères Lumière présentent leur premier film au Salon Indien du Grand Café à Paris, mais c’est à Lyon que tout a commencé.",
  },
  {
    year: "1892",
    title: "Invention du cinématographe",
    desc: "Un appareil capable de filmer, projeter et développer. Une avancée technologique majeure née à Lyon.",
  },
  {
    year: "Aujourd’hui",
    title: "Un héritage lumineux",
    desc: "La ville rend hommage chaque année avec la Fête des Lumières, un clin d’œil à leur nom et leur génie.",
  },
];

export default function LumiereTimeline() {
  return (
    <section className="relative border-l-4 border-white pl-6 ml-4 my-16">
      {events.map((e, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="text-white">
            <h3 className="text-2xl font-bold">
              {e.year} — {e.title}
            </h3>
            <p className="text-gray-300 mt-2">{e.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
