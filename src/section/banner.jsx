import React from "react";

const BannerPage = () => {
  return (
    <div className="w-full h-[420px] bg-[#E8F5E9] flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-2xl mt-5 relative">
      {/* Background Patterns */}
      <div className="absolute w-full">
        <img
          src="https://freshcartdev.s3.eu-north-1.amazonaws.com/banner.png"  
          alt="Background pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col gap-6 w-full relative z-10 p-5">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Freshness You Can Trust, <br />
          Savings You will Love!
        </h1>
        <div className="flex gap-4 mt-2">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
            Shop now
          </button>
          <button className="flex items-center gap-2 text-green-700 font-semibold hover:underline">
            Explore deals →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerPage;
