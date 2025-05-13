import React, { useEffect, useState } from "react";
import { getUserOrders, getUserProfile } from "../services/getUserProfile";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, orderData] = await Promise.all([
          getUserProfile(),
          getUserOrders(),
        ]);
        setUser(userData);
        setOrders(orderData);
      } catch (error) {
        console.error("Error loading profile or orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-green-600 font-medium">
        Loading...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-500">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          👤 User Profile
        </h2>
        <p>
          <strong className="text-gray-700">Name:</strong> {user?.name}
        </p>
        <p>
          <strong className="text-gray-700">Email:</strong> {user?.email}
        </p>
        <p>
          <strong className="text-gray-700">Joined:</strong>{" "}
          {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Order History */}
      <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          🧾 Order History
        </h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 italic">
            You haven’t placed any orders yet.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600">{order.status}</span>
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentType}{" "}
                  {order.isPaid ? (
                    <span className="text-green-500">(Paid)</span>
                  ) : (
                    <span className="text-red-500">(Unpaid)</span>
                  )}
                </p>
              </div>
              <p>
                <strong>Address:</strong> {order.address.addressLine1},{" "}
                {order.address.city}, {order.address.state} -{" "}
                {order.address.zipCode}
              </p>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                <ul className="space-y-2">
                  {order.items.map(({ item, quantity }) => (
                    <li key={item._id} className="flex items-center gap-4">
                      <img
                        src={item.ProductImages[0]?.image_link}
                        alt={item.productName}
                        className="w-14 h-14 object-contain rounded border"
                      />
                      <div>
                        <p className="text-gray-800">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {quantity} | ₹{item.offerPrice}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
