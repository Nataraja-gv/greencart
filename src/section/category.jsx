import React, { useEffect, useState } from "react";
 import CategoryCard from "../component/categoryCard"
 import {getAllCatgory} from "../services/getAllCategory"
 

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const res = await getAllCatgory();
        if (res) {
          setCategoryData(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryDetails();
  }, []);

  

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold  mb-4 mt-[35px]">Categories</h1>
        <div className=" flex gap-3  ">
          {categoryData?.map((item, index) => {
            return (
              <CategoryCard
                key={index}
                name={item.category_name}
                image={item.category_image}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
