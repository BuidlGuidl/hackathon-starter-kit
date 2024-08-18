export const PrizeInfo = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-[30vh] bg-accent border border-1 border-t-0 border-black">
      <div className="flex flex-col items-center justify-center w-full md:w-2/3 py-4 md:py-0 md:border-r border-black">
        <h2 className="text-5xl md:text-7xl">$10,000</h2>
        <p className="text-2xl md:text-3xl text-center mt-2">Available in prizes</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/3 pt-0 pb-4 md:py-0 border-t md:border-t-0 border-black">
        <p className="text-lg md:text-xl 2xl:text-2xl text-center mb-1 md:mb-2">In collaboration with</p>
        <img src="/ens-logo-dao.png" alt="ENS DAO Logo" className="w-20 md:w-32" />
      </div>
    </div>
  );
};
