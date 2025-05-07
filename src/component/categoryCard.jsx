import React from "react";

const backgroundColors = [
  "bg-yellow-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-orange-100",
];

const CategoryCard = ({ name, image, index }) => {
  const bgColor = backgroundColors[index % backgroundColors.length];

  return (
    <div className={`rounded-2xl shadow-md p-2 w-42 text-center ${bgColor}`}>
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto  object-contain"
      />
      <p className="text-lg font-semibold text-gray-800 capitalize">{name}</p>
    </div>
  );
};

export default CategoryCard;
