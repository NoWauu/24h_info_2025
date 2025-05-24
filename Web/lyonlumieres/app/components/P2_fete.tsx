import Image from "next/image";

export default function P2_fete() {
    return (
        <>
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
        </>
    );
}