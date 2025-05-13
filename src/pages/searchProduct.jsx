import { useEffect, useState } from "react";
import ProductCard from "../component/productCard";
import { getAllProduct } from "../services/getAllCategory";
import { useSelector } from "react-redux";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const searchTerm = useSelector((state) => state.search);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await getAllProduct();
        if (res) {
          const products = res?.data;
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, []);

  const filteredProducts = products
    .filter((item) => item.inStock === true)
    .filter((item) =>
      item.productName
        .toLowerCase()
        .includes(searchTerm.searchTerm.toLowerCase())
    );
  return (
    <div className="` w-[80%] mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-[35px]">Products</h1>

      <div className="mb-8">
        {filteredProducts?.length === 0 ? (
          <p className="text-gray-500 text-lg">No products found.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {filteredProducts?.map((item) => (
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
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
