function ShimmerItemCard() {
  return (
    <div className="w-[60%] m-auto">
      {/* Create multiple shimmer placeholders */}
      {Array(6).fill(null).map((_, index) => (
        <div key={index} className="text-left py-4 pb-10 border-b-2 border-neutral-200 flex justify-between">
          <div className="px-4 mt-2 flex-1">
            <div className="h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-24"></div>
            <div className="h-4 bg-gray-300 rounded animate-pulse mb-2 w-36"></div>
          </div>

          <div className="relative flex-shrink-0">
            <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 mb-2">
              <button className="shadow-lg text-green-700 flex w-[120px] h-[38px] justify-center font-extrabold text-base items-center rounded-lg border bg-gray-300 animate-pulse"></button>
            </div>
            <div className="w-[156px] h-[144px] bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShimmerItemCard;
