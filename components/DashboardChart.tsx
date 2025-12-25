"use client";

import { getBaseUrl } from "@/lib/getBaseUrl";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ranges = ["day", "week", "month", "year"] as const;

export default function DashboardChart() {
  const [range, setRange] = useState("week");
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/dashboard/stats/${range}`);

      if (!res.ok) {
        throw new Error("Failed to fetch stats");
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  fetchStats();
}, [range]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-medium">Applications</h2>

        <select
          value={range}
          onChange={e => setRange(e.target.value)}
          className="bg-black border border-white/10 px-3 py-1 rounded text-sm text-white"
        >
          {ranges.map(r => (
            <option key={r} value={r}>
              Last {r}
            </option>
          ))}
        </select>
      </div>

      {/* 🔥 THIS IS THE KEY FIX */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
