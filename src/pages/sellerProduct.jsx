import React, { use, useEffect, useState } from "react";
import { getAllProduct } from "../services/getAllCategory";
import { useSnackbar } from "notistack";
import { Switch } from "@radix-ui/themes";
import { ProductCheckInStack } from "../services/productCheckInStack";
import { useNavigate } from "react-router";

const SellerProduct = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await getAllProduct();
        if (res) {
          setProductData(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductDetails();
  }, []);

  const handleInStockChange = async (id, newValue) => {
    const data = {
      _id: id,
      inStock: newValue,
    };

    try {
      const res = await ProductCheckInStack(data);
      if (res) {
        const updateProductData = productData.map((item) => {
          return item._id === id ? { ...item, inStock: newValue } : item;
        });
        setProductData(updateProductData);
        enqueueSnackbar("Product stock updated successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-lg font-medium">All Product</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate("/seller/product/add")}
        >
          ADD Product
        </button>
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <table className=" w-full bg-white    ">
          <thead className="">
            <tr className="border-gray-200 border-b">
              <th className="text-left p-2  text-[15px]">Product</th>
              <th className="text-left p-2   text-[15px]">Category</th>
              <th className="text-left p-2   text-[15px]">Selling Price</th>
              <th className="text-left p-2   text-[15px]">In Stock</th>
              <th className="text-left p-2   text-[15px]">Update</th>
            </tr>
          </thead>
          <tbody>
            {productData?.map((item, index) => {
              return (
                <tr key={index} className="border-gray-200 border-b  ">
                  <td className="p-2 text-[15px]">{item?.productName}</td>
                  <td className="p-2 text-[15px] ">
                    {item?.category?.category_name}
                  </td>
                  <td className="p-2 text-[15px] ">{item?.offerPrice}</td>
                  <td className="p-2 text-[15px] ">
                    <Switch
                      color="success"
                      checked={item.inStock}
                      onCheckedChange={(newValue) =>
                        handleInStockChange(item?._id, newValue)
                      }
                    />
                  </td>
                  <td className="p-2 text-[15px] ">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(`/seller/product/edit/${item?._id}`, {
                          state: item,
                        })
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProduct;
