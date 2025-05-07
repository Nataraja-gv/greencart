import { CloudUpload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllCatgory } from "../services/getAllCategory";
import { RadioGroup } from "@radix-ui/themes";
import RadioGroups from "../component/radioGroup";
import { useSnackbar } from "notistack";
import { addProduct } from "../services/product/postProduct";
import { useLocation, useNavigate } from "react-router";
import { UpdateProduct } from "../services/product/updtaeProduct";

const AddProduct = () => {
  const location = useLocation();
  const product = location?.state;
  const isEditMode = Boolean(product?._id);

  const [productData, setProductData] = useState({
    productName: "",
    ProductImages: [],
    category: "",
    description: "",
    price: "",
    offerPrice: "",
    inStock: true,
  });

  useEffect(() => {
    if (product) {
      setProductData({
        productName: product.productName || "",
        description: product.description || "",
        price: product.price || "",
        offerPrice: product.offerPrice || "",
        inStock: product.inStock,
        category: product.category?._id || product.category || "",
        ProductImages: product.ProductImages || [],
      });
      const existingImages = product?.ProductImages?.map((item) => ({
        preview: item?.image_link,
        existing: true,
      }));
      setSelectedImages(existingImages);
    }
  }, [product]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

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

  const handleInputChange = (key, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleMultiImages = (e) => {
    const files = Array.from(e.target.files);
    const total = files.length + selectedImages.length;

    if (total > 5) {
      enqueueSnackbar("You can only upload a maximum of 5 media files.", {
        variant: "error",
      });
    }

    const newImages = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
      name: file.name,
      type: file.type,
    }));
    const uploadImages = [...selectedImages, ...newImages];
    setSelectedImages(uploadImages);
    setProductData((prev) => ({
      ...prev,
      ProductImages: uploadImages.map((item) => item.file || item.preview),
    }));
  };

  const handleRemoveImages = (index) => {
    const uploadedImages = [...selectedImages];
    uploadedImages.splice(index, 1);
    setSelectedImages(uploadedImages);
    setProductData((prev) => ({
      ...prev,
      ProductImages: uploadedImages.map((item) => item.file || item.preview),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛡️ Validation
    if (!productData.productName) {
      enqueueSnackbar("Product name is required", { variant: "warning" });
      return;
    }
    if (!productData.ProductImages.length) {
      enqueueSnackbar("At least one product image is required", {
        variant: "warning",
      });
      return;
    }
    if (!productData.category) {
      enqueueSnackbar("Please select a category", { variant: "warning" });
      return;
    }
    if (!productData.price || Number(productData.price) <= 0) {
      enqueueSnackbar("Price must be greater than 0", { variant: "warning" });
      return;
    }

    if (Number(productData.offerPrice) >= Number(productData.price)) {
      enqueueSnackbar("offer Price less than Product Price", {
        variant: "error",
      });
      return;
    }

    // 📦 FormData
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("offerPrice", productData.offerPrice);
    formData.append("category", productData.category);
    formData.append("inStock", productData.inStock);

    // multiple images
    selectedImages?.forEach((item) => {
      if (item.file) {
        formData.append("ProductImages", item.file);
      } else if (item.preview && item.existing) {
        formData.append("ProductImages", item.preview);
      }
    });

    try {
      let res;
      if (isEditMode) {
        res = await UpdateProduct(product._id, formData);
        enqueueSnackbar("Product updated successfully!", {
          variant: "success",
        });
      } else {
        res = await addProduct(formData);
        enqueueSnackbar("Product added successfully!", { variant: "success" });
      }

      if (res) navigate("/seller/product");
    } catch (error) {
      enqueueSnackbar(error.message || "Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          {isEditMode ? "Update Product" : "Add Product"}{" "}
        </h1>
      </div>

      <form className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image
          </label>

          <div className="grid grid-cols-5 gap-4">
            {selectedImages.map((media, index) => (
              <div
                key={index}
                className="relative h-24 w-24 border rounded overflow-hidden"
              >
                <img
                  src={media.preview}
                  alt={media.name}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImages(index)}
                  className="absolute top-0 right-0 bg-white rounded-bl px-1"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
            {selectedImages?.length < 5 && (
              <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-green-50">
                <CloudUpload className="w-6 h-6 text-green-500" />
                <span className="text-xs text-gray-500 mt-1">Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleMultiImages}
                />
              </label>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productData?.productName}
            onChange={(e) => handleInputChange("productName", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Type here"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 mt-[15px]">
            Category
          </label>
          <select
            value={productData?.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-green-500 focus:border-green-500"
          >
            <option>Select Category</option>
            {categoryData?.map((item, index) => (
              <option key={index} value={item._id}>
                {item.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 mt-[15px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            value={productData?.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-24 focus:ring-green-500 focus:border-green-500"
            placeholder="Type here"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 mt-[15px]">
            Product Price
          </label>
          <input
            type="number"
            value={productData?.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 mt-[15px]">
            Offer Price
          </label>
          <input
            type="number"
            value={productData?.offerPrice}
            onChange={(e) => handleInputChange("offerPrice", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <RadioGroups
          label="In Stock"
          name="inStock"
          value={productData?.inStock}
          options={[
            { value: true, label: "In Stock" },
            { value: false, label: "Not In Stock" },
          ]}
          onChange={(e) =>
            handleInputChange("inStock", e.target.value === "true")
          }
        />

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          {isEditMode ? "Update" : "Add"}
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
