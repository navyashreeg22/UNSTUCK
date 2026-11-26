import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Building2,
  ClipboardList,
} from "lucide-react";

function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Find Schemes",
      path: "/schemes",
      icon: Search,
    },
    {
      name: "Public Services",
      path: "/services",
      icon: Building2,
    },
    {
      name: "My Applications",
      path: "/applications",
      icon: ClipboardList,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6">
      {/* Logo and brand */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide">UNSTUCK</h1>
        <p className="text-sm text-slate-400 mt-1">
          From Confusion to Completion.
        </p>
      </div>

      {/* Navigation links */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
