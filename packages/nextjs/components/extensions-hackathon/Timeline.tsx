export const Timeline = () => {
  return (
    <div className="flex flex-col w-full bg-accent items-center justify-between border border-1 border-t-0 border-black p-12">
      <h1 className="text-4xl">Timeline</h1>
      <div className="min-w-full mt-32">
        <div className="flex justify-center space-x-5">
          <div className="w-[80%] bg-base-200 h-[20px] flex justify-between relative">
            <div className="flex flex-col space-y-2 items-center absolute -top-[68px] left-[10%]">
              <h2 className="m-0">Application open</h2>
              <p className="m-0 font-bold mb-4">Aug 21</p>
              <div className="!mt-8 bg-black min-w-[28px] min-h-[1px] rotate-90"></div>
            </div>

            <div className="flex flex-col space-y-2 items-center absolute -top-[68px] left-[45%]">
              <h2 className="m-0">Application open</h2>
              <p className="m-0 font-bold">Aug 23</p>
              <div className="!mt-8 bg-black min-w-[28px] min-h-[1px] rotate-90"></div>
            </div>

            <div className="flex flex-col space-y-2 items-center absolute -top-[68px] right-[10%]">
              <h2 className="m-0">Application open</h2>
              <p className="m-0 font-bold">Aug 24</p>
              <div className="!mt-8 bg-black min-w-[28px] min-h-[1px] rotate-90"></div>
            </div>
          </div>
          <div className="w-[20px] bg-base-200  min-h-[20px]"></div>
          <div className="w-[10px] bg-base-200  min-h-[20px]"></div>
        </div>
      </div>
    </div>
  );
};
