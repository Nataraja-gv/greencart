import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MyPieChart = (data) => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      outerRadius={150}
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
);

export default MyPieChart;
