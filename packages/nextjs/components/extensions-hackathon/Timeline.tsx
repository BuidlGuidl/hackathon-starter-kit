export const Timeline = () => {
  return (
    <div className="flex flex-col w-full min-h-[120vh] lg:min-h-[400px] gap-3 lg:gap-5 bg-accent items-center border border-1 border-t-0 border-black p-12">
      <h1 className="text-4xl">Timeline</h1>
      <div className="min-w-full lg:mt-32 flex flex-1 lg:flex-grow-0">
        <div className="flex flex-col items-center lg:flex-row justify-center gap-3 lg:gap-5 flex-1">
          <div className="h-[80%] w-[20px] lg:w-[80%] lg:h-[20px]  bg-base-200 flex justify-between relative">
            <div className="flex flex-col space-y-2 items-center absolute rotate-90 text-center lg:rotate-0 lg:-top-[68px] lg:left-[10%]">
              <h2 className="m-0">Hackathon Starts</h2>
              <p className="m-0 font-bold mb-4">Aug 20</p>
              <div className="!mt-8 bg-black min-w-[28px] min-h-[1px] rotate-90"></div>
            </div>
            <div className="flex flex-col space-y-2 items-center absolute rotate-90 text-center top-[55%] lg:rotate-0 lg:-top-[68px] lg:left-[39%] xl:left-[50%]">
              <h2 className="m-0">Submission Closed</h2>
              <p className="m-0 font-bold">Sep 2</p>
              <div className="!mt-8 bg-black min-w-[28px] min-h-[1px] rotate-90"></div>
            </div>
            <div className="flex flex-col space-y-2 items-center absolute rotate-90 text-center bottom-0 -right-[86px] lg:rotate-0 lg:-top-[68px] lg:right-[10%]">
              <h2 className="m-0">Winners Announcement</h2>
              <p className="m-0 font-bold">Sep 6</p>
              <div className="!mt-8 bg-black min-w-[28px] min-h-[1px] rotate-90"></div>
            </div>
          </div>
          <div className="w-[20px] min-h-[20px] bg-base-200"></div>
          <div className="w-[20px] min-h-[10px] lg:w-[10px] lg:min-h-[20px] bg-base-200 "></div>
        </div>
      </div>
    </div>
  );
};
