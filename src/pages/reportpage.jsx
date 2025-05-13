import React, { useEffect, useState } from "react";
import { getReport } from "../services/getReport";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Reportpage = () => {
  const [report, setReport] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    const fetchReportData = async () => {
      const response = await getReport();
      setReport(response);
    };
    fetchReportData();
  }, []);

 if (!report) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" // Example placeholder image
        alt="No Data"
        className="w-64 h-64 mb-6"
      />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Report Not Available
      </h2>
      <p className="text-gray-500">There is no report data to display at the moment.</p>
    </div>
  );
}

  
  const paymentData = [
    { name: "Cash on Delivery", value: report.paymentTypes.cod },
    { name: "Online Payment", value: report.paymentTypes.online },
  ];

  const stockData = [
    { name: "In Stock", value: report.ItemsStocks.inStock },
    { name: "Out of Stock", value: report.ItemsStocks.outOfStock },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Admin Report</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Total Orders" value={report.totalOrders} />
        <Card
          title="Total Revenue"
          value={`₹${report.totalRevenue.toFixed(2)}`}
        />
        <Card title="Total Products" value={report.totalProducts} />
        <Card title="Total Users" value={report.totalUsers} />
      </div>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ChartCard title="Payment Types" data={paymentData} COLORS={COLORS} />
        <ChartCard title="Item Stock Status" data={stockData} COLORS={COLORS} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-5 rounded-lg shadow-md">
    <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const ChartCard = ({ title, data, COLORS }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <PieChart width={600} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) =>
          `${name}: ${(percent * 100).toFixed(0)}%`
        }
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default Reportpage;
