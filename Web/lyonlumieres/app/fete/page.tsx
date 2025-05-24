import Image from "next/image";

export default function Fete() {

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 text-gray-800">
        <h1 className="text-3xl text-center font-bold p-8">Fête des Lumières</h1>
            <div className="flex place-content-center flex-row items-center gap-6 p-7 rounded-2xl">
                <p className="text-lg w-1/2">
                Imaginez une ville qui, chaque hiver, se transforme en un théâtre de lumière. Les rues deviennent des toiles, les monuments se parent de couleurs féeriques, et des milliers de visages levés vers le ciel s’illuminent d’émerveillement. Bienvenue à Lyon, au cœur de l'une des plus grandes célébrations lumineuses du monde : la Fête des Lumières.
                </p>
                <Image
                    src="/Lyon.png"
                    alt="Vue de Lyon illuminée"
                    className="rounded-xl shadow-md"
                    width={300}
                    height={200}
                />
            </div>
            <p className="text-lg bold p-7 text-center">
                Mais pour comprendre cette explosion de lumière, il faut remonter le temps…
            </p>
        <section className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-blue-700">✨ 1852 : Le miracle des lumignons</h2>
                <p>
                    En 1852, lors de l’inauguration d’une statue de la Vierge sur la colline de Fourvière, la pluie menace. Les Lyonnais allument alors spontanément des bougies à leurs fenêtres. Une mer de lumière naît : c’est la naissance de la tradition des lumignons.
                </p>
            </section>
        <section className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-purple-700">🎨 De la tradition à l’art lumière</h2>
                <Image
                    src="/Proj.jpg"
                    alt="Projection artistique à Lyon"
                    className="rounded-xl shadow-md"
                    width={300}
                    height={200}
                />
                <p>
                À partir des années 1980, la ville transforme cette tradition en spectacle artistique. 
                Projections, installations lumineuses et créations visuelles métamorphosent Lyon chaque 8 décembre.
                </p>
            </section>
        <section className="bg-yellow-50 shadow-lg rounded-2xl p-6 text-center">
                <p className="text-lg italic">
                    Aujourd’hui, la Fête des Lumières, c’est la magie d’un geste simple devenu un poème lumineux.
                </p>
            </section>
    </div>
  );
}
