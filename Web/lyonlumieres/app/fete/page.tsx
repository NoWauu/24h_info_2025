import Image from "next/image";
import Intro_fete from "../components/Intro_fete";
import P1_fete from "../components/P1_fete";
import P2_fete from "../components/P2_fete";
import CCL_fete from "../components/CCL_fete";

export default function Fete() {

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 text-gray-800">
        <Intro_fete />
        <P1_fete />
        <P2_fete />
        <CCL_fete />
    </div>
  );
}