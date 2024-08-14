import Image from "next/image";

export const Hero = () => {
  return (
    <div className="flex w-full h-[60vh] font-spaceMono font-normal justify-between border border-1 border-black">
      <div className="flex flex-col items-start justify-center ml-14 w-1/2">
        <Image src="/se-2-logo.svg" alt="Hero" width={200} height={200} />
        <h1 className="text-7xl ">Extensions Hackathon</h1>
        <h2 className="text-2xl">August 21-30</h2>
        <div className="px-4 py-2 mt-2 bg-accent">Onchain</div>
      </div>
      <div className="w-1/2 h-full relative">
        <Image src="/hero-image.png" alt="Hero" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};
