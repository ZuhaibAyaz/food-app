function Shimmer() {
  // Create an array of 12 shimmer elements
  const shimmerArray = Array(12).fill(null);

  return (
    <div className="w-[80%] mx-auto">
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {shimmerArray.map((_, index) => (
          <div key={index} className="my-4 p-2 max-w-[278px] mx-auto">
            <div className="relative">
              <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-b from-transparent to-stone-900"></div>
              </div>

              <div className="h-[147px] w-[220px] bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>

            <div className="p-2">
              <div className='w-[200px] bg-gray-300 h-6 mb-2 rounded animate-pulse'></div>

              <div className="flex gap-2">
                <div className="h-4 w-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-10 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="w-[200px] h-5 bg-gray-300 mt-2 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shimmer;
