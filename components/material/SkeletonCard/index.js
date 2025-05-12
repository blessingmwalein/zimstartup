const SkeletonCard = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center py-2 md:py-3 px-4 sm:px-7 border border-[#D9D9D9] rounded-lg m-4 animate-pulse">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-300" />
        </div>

        <div className="flex-1 text-center">
          <div className="h-4 bg-gray-300 mb-2" />
          <div className="h-4 bg-gray-300 mb-1" />
          <div className="h-4 bg-gray-300" />
        </div>

        <div className="flex-1 text-center">
          <div className="h-4 bg-gray-300 mb-2" />
          <div className="h-6 bg-gray-300" />
        </div>

        <button className="w-full md:w-[150px] py-4 xl:py-5 font-bold text-[13px] sm:text-[14px] xl:text-[17px] bg-gray text-white rounded-lg m-4 "></button>

        <button className="w-full md:w-[150px] py-4 xl:py-5 font-bold text-[13px] sm:text-[14px] xl:text-[17px] bg-gray rounded-lg "></button>
      </div>
    </div>
  );
};

export default SkeletonCard;
