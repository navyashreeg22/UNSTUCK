import {
  ClipboardList,
  Clock,
  CheckCircle,
  Bookmark,
  Search,
  Building2,
  ArrowRight,
} from "lucide-react";

import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Your journey starts here.
        </h1>
        <p className="text-slate-500 mt-2">
          Access government schemes and services without the confusion.
        </p>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Applications"
          value="04"
          description="Applications saved"
          icon={ClipboardList}
        />

        <StatCard
          title="In Progress"
          value="02"
          description="Applications ongoing"
          icon={Clock}
        />

        <StatCard
          title="Completed"
          value="01"
          description="Successfully completed"
          icon={CheckCircle}
        />

        <StatCard
          title="Saved Schemes"
          value="05"
          description="Schemes bookmarked"
          icon={Bookmark}
        />
      </section>

      {/* Main actions */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          What would you like to do?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-blue-600 text-white rounded-xl p-6">
            <Search size={28} />

            <h3 className="text-xl font-semibold mt-5">
              Find Government Schemes
            </h3>

            <p className="text-blue-100 text-sm mt-2">
              Discover schemes based on your needs and eligibility.
            </p>

            <a
              href="/schemes"
              className="inline-flex items-center gap-2 mt-6 font-medium text-sm"
            >
              Explore Schemes <ArrowRight size={18} />
            </a>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-6">
            <Building2 size={28} />

            <h3 className="text-xl font-semibold mt-5">
              Explore Public Services
            </h3>

            <p className="text-slate-300 text-sm mt-2">
              Understand government services and application procedures.
            </p>

            <a
              href="/services"
              className="inline-flex items-center gap-2 mt-6 font-medium text-sm"
            >
              Explore Services <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
