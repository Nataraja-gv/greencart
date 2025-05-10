import { enqueueSnackbar, useSnackbar } from "notistack";
import { useState } from "react";
import { addAddresss } from "../services/address";
import { useNavigate } from "react-router";

const AddAddress = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!form.firstName || !form.lastName) return "Name fields are required.";
    if (!emailRegex.test(form.email)) return "Invalid email address.";
    if (!phoneRegex.test(form.phone)) return "Phone must be 10 digits.";
    if (!form.addressLine1) return "Address Line 1 is required.";
    if (!form.city || !form.state || !form.country)
      return "Location fields are required.";
    if (!form.zipCode || !/^\d{5,6}$/.test(form.zipCode))
      return "Zip Code must be 5 or 6 digits.";

    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }
    try {
      const resposne = await addAddresss(form);
      if (resposne) {
        enqueueSnackbar("address added successfully", { variant: "success" });
        navigate("/cart");
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Address</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          ["firstName", "First Name"],
          ["lastName", "Last Name"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["addressLine1", "Address Line 1"],
          ["addressLine2", "Address Line 2 (Optional)"],
          ["city", "City"],
          ["state", "State"],
          ["country", "Country"],
          ["zipCode", "Zip Code"],
        ].map(([name, label]) => (
          <div key={name} className="col-span-2">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              required={name !== "addressLine2"}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}
        <div className="col-span-2 text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
