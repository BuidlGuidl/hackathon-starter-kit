import Image from "next/image";
import { CommandDisplay } from "./CommandDisplay";

export const HackathonInfo = () => {
  return (
    <div className="flex flex-col w-full border border-1 border-t-0 border-black">
      <div className="p-4 md:p-12 border-b border-black flex flex-col md:flex-row">
        <div className="flex-1 md:p-12 pr-0 md:pr-6 order-2 md:order-1">
          <h2 className="text-3xl md:text-6xl mb-8 md:mb-16">
            What is <br /> Scaffold-ETH 2?
          </h2>
          <div className="md:text-xl mb-8 md:mb-16">
            <p className="mb-4">
              Scaffold-ETH 2 is a open-source toolkit for building decentralized applications on Ethereum.
            </p>
            <p className="mb-4">
              Built using NextJS, RainbowKit, Wagmi, Viem and TypeScript, supporting both Hardhat and Foundry.
            </p>
            <p className="mb-4">
              With live-updating frontends, pre-built components, custom hooks, and a built-in block explorer, it
              accelerates development from prototype to production-ready dApps.
            </p>
          </div>
          <CommandDisplay command="npx create-eth@latest" />
          <div className="flex flex-wrap justify-center md:justify-start gap-12">
            <a href="https://scaffoldeth.io/" target="_blank" className="underline pl-0 font-medium md:text-2xl">
              Website
            </a>
            <a href="https://docs.scaffoldeth.io/" target="_blank" className="underline font-medium md:text-2xl">
              Docs
            </a>
            <a
              href="https://github.com/scaffold-eth/scaffold-eth-2"
              target="_blank"
              className="underline font-medium md:text-2xl"
            >
              Github
            </a>
          </div>
        </div>
        <div className="flex-1 xl:p-12 mt-6 md:mt-0 mb-6 md:mb-0 order-1 md:order-2">
          <Image
            src="/se-2-sneak-peek.png"
            alt="Scaffold-ETH 2 Sneak Peek"
            width={1000}
            height={500}
            layout="responsive"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-12 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 mb-8 lg:mb-0 lg:pr-8">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {" "}
            {/* 16:9 Aspect Ratio */}
            <iframe
              src="https://www.youtube.com/embed/XQCv533XGZk"
              title="Scaffold-ETH 2 Extensions Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 lg:mb-8">What are extensions?</h2>
          <div className="text-base md:text-lg lg:text-xl mb-6 lg:mb-8">
            <p className="mb-4">
              Extensions are modular add-ons for Scaffold-ETH 2, allowing developers to enhance and customize their
              dApps easily.
            </p>
            <p className="mb-4">
              They are not meant to be final products, but rather starting points that developers can build upon and
              customize for their specific needs.
            </p>
            <p className="mb-4">
              They integrate seamlessly with the base project, enabling quick addition of new features, pages, contracts
              or components.
            </p>
            <p className="mb-4">Extensions maintain compatibility with Scaffold-ETH 2 core updates and improvements.</p>
            <p className="mb-4">Example usage:</p>
          </div>
          <CommandDisplay command="npx create-eth@latest -e gitHubUsername/repoName" />
          <div className="flex flex-wrap justify-center md:justify-start gap-12 mt-8">
            <a
              href="https://docs.scaffoldeth.io/extensions"
              target="_blank"
              className="underline pl-0 font-medium md:text-2xl"
            >
              Docs
            </a>
            <a
              href="https://github.com/scaffold-eth/create-eth-extensions"
              target="_blank"
              className="underline pl-0 font-medium md:text-2xl"
            >
              Examples
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
