import React, { useEffect, useState } from "react";
import { getAllCatgory } from "../services/getAllCategory";
import { useNavigate } from "react-router";

const SellerCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const res = await getAllCatgory();
        if (res) {
          setCategoryData(res?.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategoryDetails();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-lg font-medium">All Categories</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate("/seller/category/add")}
        >
          ADD Category
        </button>
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-2 text-[15px]">SL No</th>
              <th className="text-left p-2 text-[15px]">Category Image</th>
              <th className="text-left p-2 text-[15px]">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.length > 0 ? (
              categoryData.map((item, index) => (
                <tr key={item._id || index} className="border-b border-gray-200 ">
                  <td className="p-2 text-[15px] ">{index + 1}</td>
                  <td className="p-2 text-[15px]">
                    <img
                      src={item?.category_image}
                      alt={item?.category_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-2 text-[15px] capitalize">{item?.category_name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-4 text-center text-gray-500 text-[15px]"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerCategory;
