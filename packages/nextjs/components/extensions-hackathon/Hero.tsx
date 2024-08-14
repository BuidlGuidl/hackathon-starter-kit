import Image from "next/image";

export const Hero = () => {
  return (
    <div className="flex flex-col pt-8 md:pt-0 md:flex-row w-full md:h-[60vh] font-spaceMono font-normal justify-between border border-1 border-black">
      <div className="flex flex-col items-start justify-center ml-6 md:ml-14 w-1/2">
        <Image src="/se-2-logo.svg" alt="Hero" width={200} height={200} />
        <h1 className="text-4xl md:text-4xl lg:text-7xl 2xl:text-8xl">
          Extensions
          <br />
          Hackathon
        </h1>
        <h2 className="text-xl md:text-3xl lg:text-2xl">August 21-30</h2>
        <div className="px-4 py-2 mt-2 bg-accent text-base md:text-xl">Onchain</div>
      </div>
      <div className="h-36 mt-4 md:mt-0 md:w-1/2 md:h-full relative">
        <Image src="/hero-image.jpg" alt="Hero" fill={true} style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
};
