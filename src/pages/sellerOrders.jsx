import React, { useEffect, useState } from "react";
import { getSellerOrders } from "../services/cart/getOrders";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getSellerOrders();
      if (res) {
        setOrders(res);
      }
    };
    fetchOrders();
  }, []);
  console.log(orders, "orders");
  return <div>seller order</div>;
};

export default SellerOrders;
