import React from "react";

type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div
      className="
        rounded-xl
        bg-white/5
        p-5
        transition
        hover:bg-white/10
        hover:-translate-y-0.5
      "
    >
      <p className="text-sm text-gray-400">{title}</p>
      <p className="mt-2 text-4xl font-semibold text-white">{value}</p>
    </div>
  );
}
