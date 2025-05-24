import Image from "next/image";

export default function Intro_fete() {
    return (
        <>
            <h1 className="text-3xl text-center font-bold p-8">Fête des Lumières</h1>
            <div className="flex place-content-center flex-row items-center gap-6 p-7 rounded-2xl">
                <p className="text-lg w-1/2">
                Imaginez une ville qui, chaque hiver, se transforme en un théâtre de lumière. Les rues deviennent des toiles, les monuments se parent de couleurs féeriques, et des milliers de visages levés vers le ciel s’illuminent d’émerveillement. Bienvenue à Lyon, au cœur de l'une des plus grandes célébrations lumineuses du monde : la Fête des Lumières.
                </p>
                <Image
                    src="/Lyon.jpg"
                    alt="Vue de Lyon illuminée"
                    className="rounded-xl shadow-md"
                    width={300}
                    height={200}
                />
            </div>
            <p className="text-lg bold p-7 text-center">
                Mais pour comprendre cette explosion de lumière, il faut remonter le temps…
            </p>
        </>
    );
}