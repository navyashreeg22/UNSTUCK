import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
          <Icon size={20} />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mt-4">{value}</h2>

      <p className="text-sm text-slate-500 mt-2">{description}</p>
    </div>
  );
}

export default StatCard;
