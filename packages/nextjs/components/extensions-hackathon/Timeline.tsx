export const Timeline = () => {
  return (
    <div className="flex flex-col w-full bg-accent items-center justify-between border border-1 border-t-0 border-black p-12">
      <h1 className="text-4xl">Timeline</h1>
      <div className="min-w-full mt-32">
        <div className="flex justify-center space-x-5">
          <div className="w-[80%] bg-base-200  min-h-[20px]"></div>
          <div className="w-[20px] bg-base-200  min-h-[20px]"></div>
          <div className="w-[10px] bg-base-200  min-h-[20px]"></div>
        </div>
      </div>
    </div>
  );
};
