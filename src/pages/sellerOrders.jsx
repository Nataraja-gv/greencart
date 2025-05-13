import React, { useEffect, useState } from "react";
import { getSellerOrders, patchOrderUpdate } from "../services/cart/getOrders";
import { useSnackbar } from "notistack";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getSellerOrders(page,limit);
      if (res) {
        setOrders(res?.data);
        setTotalPages(res?.totalPages);
      }
    };
    fetchOrders();
  }, [page]);

  const handleChangeStatus = (index, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = { ...updatedOrders[index], status: value };
    setOrders(updatedOrders);
  };

  const handleChangeIsPaid = (index, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      isPaid: value === "true",
    };
    setOrders(updatedOrders);
  };

  const handleUpdateSubmit = async (id, index) => {
    try {
      const payload = {
        status: orders[index].status,
        isPaid: orders[index].isPaid,
      };
      const res = await patchOrderUpdate(id, payload);
      if (res) {
        enqueueSnackbar("Order updated successfully", {
          variant: "success",
        });
      }
    } catch (error) {
      console.error(error.message);
      enqueueSnackbar("Failed to update order", { variant: "error" });
    }
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-[10px] border border-gray-200">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-2 text-[15px]">SL.No</th>
              <th className="text-left p-2 text-[15px]">User Name</th>
              <th className="text-left p-2 text-[15px]">Product</th>
              <th className="text-left p-2 text-[15px]">Quantity</th>
              <th className="text-left p-2 text-[15px]">Total Amount</th>
              <th className="text-left p-2 text-[15px]">Address</th>
              <th className="text-left p-2 text-[15px]">Status</th>
              <th className="text-left p-2 text-[15px]">isPaid</th>
              <th className="text-left p-2 text-[15px]">Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-200">
                <td className="p-2 text-[15px]">{index + 1}</td>
                <td className="p-2 text-[15px]">{item?.userId?.name}</td>
                <td className="p-2 text-[15px]">
                  {item?.items?.map((it) => it?.item?.productName).join(", ")}
                </td>
                <td className="p-2 text-[15px]">
                  {item?.items?.map((it) => it?.quantity).join(", ")}
                </td>
                <td className="p-2 text-[15px]">Rs. {item?.totalAmount}</td>
                <td className="p-2 text-[15px]">
                  {item?.address?.addressLine1}, {item?.address?.city},{" "}
                  {item?.address?.state}, {item?.address?.country} -{" "}
                  {item?.address?.zipCode}
                </td>
                <td className="p-2 text-[15px]">
                  <select
                    value={item.status}
                    className="select select-bordered w-full"
                    onChange={(e) => handleChangeStatus(index, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2 text-[15px]">
                  <select
                    value={item.isPaid}
                    className="select select-bordered w-full"
                    onChange={(e) => handleChangeIsPaid(index, e.target.value)}
                  >
                    <option value={true}>Paid</option>
                    <option value={false}>Not paid</option>
                  </select>
                </td>
                <td className="p-2 text-[15px]">
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateSubmit(item._id, index)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center p-4 gap-2">
        <button
          className="btn"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          «
        </button>
        <span className="px-4">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default SellerOrders;
