import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({
  image,
  category,
  name,
  rating,
  reviews,
  price,
  originalPrice,
  _id,
}) => {
  const navigate = useNavigate();
  {
    return (
      <div
        className="border rounded-2xl p-4 shadow-sm w-64"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-contain mb-4"
        />
        <p className="text-gray-400 text-[16px] font-bold mb-1 capitalize ">
          {category}
        </p>
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <div className="flex items-center text-green-600 mb-2">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
          <span className="text-gray-600 text-sm ml-1">({reviews})</span>
        </div>
        <div className="flex items-center  gap-5 mb-3">
          <div className="flex items-center justify-between ">
            <span className="text-green-600 text-xl font-bold mr-2">
              ${price}
            </span>
            <span className="line-through text-gray-400">${originalPrice}</span>
          </div>
          <button className="border border-green-400 text-green-600 rounded-md px-4 py-1 hover:bg-green-100">
            🛒 Add
          </button>
        </div>
      </div>
    );
  }
};

export default ProductCard;
