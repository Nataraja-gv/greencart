import { CloudUpload, X } from "lucide-react";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { addCategory } from "../services/postCategory";
import { useNavigate } from "react-router";

const AddCategory = () => {
  const [categoryData, setCatgoryData] = useState({
    category_image: "",
    category_name: "",
  });
  const [selectedImage, setSelectedImages] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleInputChange = (key, value) => {
    setCatgoryData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImages = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImages(file);
      setCatgoryData((prev) => ({
        ...prev,
        category_image: URL.createObjectURL(file), // Preview purpose
      }));
    }
  };

  const handleRemoveImages = () => {
    setSelectedImages(null);
    setCatgoryData((prev) => ({
      ...prev,
      category_image: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("category_name", categoryData?.category_name);
    formData.append("category_image", selectedImage);
    try {
      const res = await addCategory(formData);
      if (res) {
        enqueueSnackbar("category added successfully", { variant: "success" });
        navigate("/seller/category");
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <main className="flex-1 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Add Category</h1>
      </div>
      <form className="bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
          </label>
          {!categoryData.category_image && (
            <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-green-50">
              <CloudUpload className="w-6 h-6 text-green-500" />
              <span className="text-xs text-gray-500 mt-1">Upload</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImages}
              />
            </label>
          )}
          {categoryData.category_image && (
            <div className="relative h-24 w-24 border rounded overflow-hidden">
              <img
                src={categoryData.category_image}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={handleRemoveImages}
                className="absolute top-0 right-0 bg-white rounded-bl px-1"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={categoryData?.category_name}
            onChange={(e) => handleInputChange("category_name", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Type category name"
          />
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Category
        </button>
      </form>
    </main>
  );
};

export default AddCategory;
