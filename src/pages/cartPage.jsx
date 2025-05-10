import { useEffect, useState } from "react";
import { getCartItems } from "../services/cart/getCart";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../utils/features/cartSlice";
import { patchCartItems } from "../services/cart/deleteCart";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { getUserAddress } from "../services/cart/getAddress";

const CartPage = () => {
  const [cartData, setCartData] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [refershCart, setRefershCart] = useState(false);
  const [address, setAddress] = useState();

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await getCartItems();
      setCartData(response);
    };
    fetchCartData();
  }, [refershCart]);

  useEffect(() => {
    const fetchAddressData = async () => {
      const response = await getUserAddress();
      setAddress(response);
    };
    fetchAddressData();
  }, []);
  const [selectedAddress, setSelectedAddress] = useState(address);

  const dispatch = useDispatch();
  // const handleRemoveFromCart = (productId) => {
  //   dispatch(removeFromCart(productId));
  // };

  const deleteCartItems = async (itemId) => {
    const data = {
      itemId: itemId,
    };

    const response = await patchCartItems(data);
    if (response) {
      setRefershCart(true);
      enqueueSnackbar("Item removed from cart", { variant: "success" });
      setTimeout(() => {
        setRefershCart(false);
      }, 2000);
    }
  };

  const totalItemsInCart = cartData?.cartItems?.length;
  const handleChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {totalItemsInCart} Items
          </span>
        </h1>

        {cartData?.cartItems?.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <img
              src="https://captabs.com/images/Empty_Cart_Image_new.jpg"
              alt="Empty cart"
              className="w-60 h-60 object-contain"
            />
            <p className="text-gray-500 mt-4">Your cart is empty.</p>
          </div>
        ) : (
          <>
            {" "}
            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>
            {cartData?.cartItems.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                    <img
                      className="max-w-full h-full object-cover"
                      src={product?.item?.ProductImages?.[0]?.image_link}
                      alt="product image"
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold">
                      {product?.item?.productName}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <div className="flex items-center">
                        <p>Qty:{product?.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  ${product?.item?.offerPrice * product?.quantity}
                </p>
                <button
                  className="cursor-pointer mx-auto"
                  onClick={() => deleteCartItems(product?._id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium"
              onClick={() => navigate("/")}
            >
              <svg
                width="15"
                height="11"
                viewBox="0 0 15 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="#615fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Continue Shopping
            </button>
          </>
        )}
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex flex-col justify-between items-center mt-2">
            <div className="flex flex-col gap-2">
              <select
                className="select select-success w-full max-w-xs"
                value={selectedAddress}
                onChange={handleChange}
              >
                <option value="" disabled>
                  -- Select an Address --
                </option>
                {address?.map((item, index) => (
                  <option key={item._id} value={item._id}>
                    {item.addressLine1}, {item.city}, {item.state},{" "}
                    {item.country} - {item.zipCode}
                  </option>
                ))}
              </select>
            </div>

            <p
              onClick={() => navigate("/add/address")}
              className="text-green-500 text-center cursor-pointer mt-4 p-2 hover:bg-indigo-500/10"
            >
              Add address
            </p>
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>$20</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>$20</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
