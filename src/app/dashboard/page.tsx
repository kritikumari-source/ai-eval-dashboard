import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
// import fetchEvals from "../evals/page"; 
import Page from "../page";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Dashboard({data}: any) {
    console.log(data);
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 font-semibold">Performance Dashboard</h1>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="avg_score" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
