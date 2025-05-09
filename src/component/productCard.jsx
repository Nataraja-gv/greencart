import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../utils/features/cartSlice";
import { updatePostCart } from "../services/cart/postcart";
import { enqueueSnackbar } from "notistack";

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
  const cartItem = useSelector((state) => state.cart);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const existingQuantity = cartItem?.cartItems?.find(
    (item) => item.item === _id
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!userData.name) {
      navigate("/login");
    } else {
      dispatch(addToCart({ item: _id, quantity: 1 }));
    }
  };
  const handleIncQuantity = (e) => {
    e.stopPropagation();
    dispatch(incrementQuantity(_id));
  };

  const handleDecQuantity = (e) => {
    e.stopPropagation();
    dispatch(decrementQuantity(_id));
  };

  useEffect(() => {
    const postUpdateCart = async () => {
      if (cartItem?.cartItems?.length > 0) {
        await updatePostCart(cartItem);
      }
    };

    postUpdateCart();
  }, [cartItem?.cartItems]);

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
          {existingQuantity ? (
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border rounded hover:bg-green-100"
                onClick={handleDecQuantity}
              >
                -
              </button>
              <span className="text-sm font-medium">
                {existingQuantity?.quantity}
              </span>
              <button
                className="px-2 py-1 border rounded hover:bg-green-100"
                onClick={handleIncQuantity}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="border border-green-400 text-green-600 rounded-md px-4 py-1 hover:bg-green-100"
              onClick={handleAddToCart}
            >
              🛒 Add
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default ProductCard;
