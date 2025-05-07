import React from "react";

const AdsPage = () => {
  return (
    <div
      className="bg-cover bg-center py-20 px-6"
      style={{
        backgroundImage: `url('https://freshcartdev.s3.eu-north-1.amazonaws.com/adsbanner.png')`,
      }}
    >
      <div className="  rounded-xl p-10 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 ">
        {/* Left Content */}
        <div className="relative">
          <div className=" rounded-full shadow-md px-4 py-2 inline-flex items-center gap-2 mb-6">
            {/* <span className="text-purple-600 text-xl">🚚</span>
            <div>
              <p className="text-sm text-purple-600 font-semibold">
                Fast Delivery
              </p>
              <p className="text-xs text-gray-500">In 30 Min</p>
            </div> */}
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
            Why We Are the Best?
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <span className="text-green-600 text-xl">🚚</span>
              <div>
                <h4 className="text-md font-semibold">Fastest Delivery</h4>
                <p className="text-sm text-gray-700">
                  Groceries delivered in under 30 minutes.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-600 text-xl">🥬</span>
              <div>
                <h4 className="text-md font-semibold">Freshness Guaranteed</h4>
                <p className="text-sm text-gray-700">
                  Fresh produce straight from the source.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-600 text-xl">💰</span>
              <div>
                <h4 className="text-md font-semibold">Affordable Prices</h4>
                <p className="text-sm text-gray-700">
                  Quality groceries at unbeatable prices.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-green-600 text-xl">❤️</span>
              <div>
                <h4 className="text-md font-semibold">Trusted by Thousands</h4>
                <p className="text-sm text-gray-700">
                  Loved by 10,000+ happy customers.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
