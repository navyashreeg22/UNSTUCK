import { Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-5">
      {/* Page heading */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Welcome back!</h2>
        <p className="text-sm text-slate-500 mt-1">
          Let's make your next step easier.
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        <button className="text-slate-500 hover:text-blue-600">
          <Bell size={22} />
        </button>

        <div className="flex items-center gap-2">
          <UserCircle size={30} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-700">User</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
