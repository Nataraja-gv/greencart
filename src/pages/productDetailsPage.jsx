import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getAllProduct,
  getProductsDetailsById,
} from "../services/getAllCategory";
import ProductCard from "../component/productCard";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../utils/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [selcetdImage, setSelectedImage] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const cartItem = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const _id = id;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await getProductsDetailsById(id);
        window.scrollTo(0, 0);
        if (res) {
          setProductData(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await getAllProduct();

        if (res) {
          setRelatedProducts(res?.data.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const categoryName = productData?.category?.category_name || "Category";
  const productName = productData?.productName || "Product";
  const productImages = productData?.ProductImages || [];

  useEffect(() => {
    if (productImages.length > 0) {
      setSelectedImage(productImages[0].image_link);
    }
  }, [productImages]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ item: _id, quantity: 1 }));
  };
  const handleIncQuantity = (e) => {
    e.stopPropagation();
    dispatch(incrementQuantity(_id));
  };

  const handleDecQuantity = (e) => {
    e.stopPropagation();
    dispatch(decrementQuantity(_id));
  };

  const existingQuantity = cartItem?.cartItems?.find(
    (item) => item.item === _id
  );

  return (
    <div className="w-[80%] mx-auto mt-[30px]">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        <ol className="list-reset flex">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/products" className="hover:underline">
              Products
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <span className="capitalize">{categoryName}</span>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-semibold capitalize text-black">{productName}</li>
        </ol>
      </nav>

      {/* Product Details Section */}
      <div className="flex gap-10 mt-10">
        {/* Image Thumbnails */}
        <div className="flex flex-col gap-4 w-[150px]">
          {productImages.map((img, i) => (
            <img
              key={i}
              src={img?.image_link}
              alt={`thumb-${i}`}
              className={`w-full h-25 object-cover border  not-[]: p-1  rounded cursor-pointer ${
                selcetdImage === img?.image_link
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img?.image_link)}
            />
          ))}
        </div>

        {/* Main Product Image and Info */}
        <div className="flex-1 flex gap-10">
          {/* Main Image */}
          <div className="w-1/2">
            <img
              src={selcetdImage}
              alt="main"
              className="w-full h-[400px] object-contain rounded"
            />
          </div>

          {/* Info */}
          <div className="w-1/2">
            <h1 className="text-2xl font-semibold mb-2">{productName}</h1>
            <div className="text-green-600 mb-2">⭐⭐⭐⭐ (4)</div>

            <div className="text-gray-500 line-through text-sm">
              MRP: ${productData?.price}
            </div>
            <div className="text-xl font-bold text-gray-800">
              MRP: ${productData?.offerPrice}
            </div>
            <p className="text-sm text-gray-500 mb-4">
              (inclusive of all taxes)
            </p>

            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">About Product</h3>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                <li>Fresh and organic</li>
                <li>Rich in carbohydrates</li>

                <li>{productData?.description}</li>
              </ul>
            </div>

            <div className="flex gap-4 mt-6">
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
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products (Mocked layout) */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-4 border-b-2 border-green-500 inline-block">
          Related Products
        </h2>
        <div className="grid grid-cols-4 gap-6 mt-6">
          {relatedProducts?.map((item, index) => (
            <div key={index}>
              <ProductCard
                _id={item._id}
                image={item?.ProductImages?.[0]?.image_link}
                name={item.productName}
                rating={4}
                reviews={4}
                price={item.offerPrice}
                originalPrice={item.price}
                category={item?.category?.category_name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
