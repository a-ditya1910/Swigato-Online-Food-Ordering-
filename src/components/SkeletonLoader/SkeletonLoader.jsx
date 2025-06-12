import react from "react";

const SkeletonLoader = () => {
  return (
    <div className="w-full mx-auto rounded-lg shadow-sm bg-gray-100 overflow-hidden relative animate-pulse my-2">
      <div className="relative">
        <div className="w-full h-[150px] bg-gray-300 rounded-t-lg"></div>
      </div>

      <div className="p-5 space-y-2">
        <div className="h-5 w-3/5 bg-gray-300 rounded"></div>
        <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
        <div className="h-5 w-2/5 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
