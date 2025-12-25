"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ranges = ["day", "week", "month", "year"] as const;

export default function DashboardChart() {
  const [range, setRange] = useState("week");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/dashboard/stats?range=${range}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    load();
  }, [range]);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Applications ({range})
        </h2>

        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded-md bg-black border border-white/10 px-3 py-1 text-sm"
        >
          {ranges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      {loading ? (
        <p className="text-gray-400">Loading chart...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-400">No data for this range</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
