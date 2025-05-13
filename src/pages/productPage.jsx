import React, { useEffect, useState } from "react";
import { getAllProduct } from "../services/getAllCategory";

import { useNavigate } from "react-router";
import ProductCard from "../component/productCard";

const ProductPage = () => {
  const [groupProductData, setGroupProductData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await getAllProduct();

        if (res) {
          const products = res?.data;
          const groupData = products.reduce((acc, products) => {
            const category = products?.category?.category_name;

            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(products);
            return acc;
          }, {});
          setGroupProductData(groupData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 mt-[35px]">Products</h1>
      {Object.entries(groupProductData).map(([categoryName, products]) => {
        const inStockProducts = products.filter(
          (item) => item?.inStock !== false
        );
        if (inStockProducts.length === 0) return null;

        return (
          <div key={categoryName} className="mb-8">
            <h2 className="text-xl font-semibold mb-3 capitalize">
              {categoryName}
            </h2>
            <div className="flex flex-wrap gap-4">
              {inStockProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  _id={item._id}
                  image={item?.ProductImages?.[0]?.image_link}
                  name={item.productName}
                  rating={4}
                  reviews={4}
                  price={item.offerPrice}
                  originalPrice={item.price}
                  category={item?.category?.category_name}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductPage;
