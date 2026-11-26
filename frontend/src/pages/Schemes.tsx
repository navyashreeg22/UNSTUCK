import { useState } from "react";
import { Search, Bookmark, FileText, X } from "lucide-react";

import { schemes, type Scheme } from "../services/schemeService";
import EligibilityChecker from "../components/eligibility/EligibilityChecker";
import DocumentAssistant from "../components/DocumentAssistant";

function Schemes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const categories = ["All", "Education", "Skill Development", "Healthcare"];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || scheme.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section>
        <h1 className="text-3xl font-bold text-slate-800">
          Find Government Schemes
        </h1>
        <p className="text-slate-500 mt-2">
          Discover opportunities and assistance that match your needs.
        </p>
      </section>

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schemes by name or description..."
          className="w-full rounded-xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Category filters */}
      <section>
        <h2 className="font-semibold text-slate-700 mb-3">
          Browse by category
        </h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                category === item
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Scheme cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Available Schemes
          </h2>

          <span className="text-sm text-slate-500">
            {filteredSchemes.length} results
          </span>
        </div>

        {filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <p className="text-slate-600 font-medium">No schemes found.</p>
            <p className="text-slate-400 text-sm mt-2">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {scheme.category}
                  </span>

                  <Bookmark size={20} className="text-slate-400" />
                </div>

                <h3 className="text-lg font-semibold text-slate-800 mt-4">
                  {scheme.name}
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {scheme.description}
                </p>

                <button
                  onClick={() => setSelectedScheme(scheme)}
                  className="mt-5 inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-800"
                >
                  <FileText size={17} />
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Selected scheme details */}
      {selectedScheme && (
        <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-blue-600">
                {selectedScheme.category}
              </span>

              <h2 className="text-2xl font-bold text-slate-800 mt-2">
                {selectedScheme.name}
              </h2>
            </div>

            <button
              onClick={() => setSelectedScheme(null)}
              className="text-slate-400 hover:text-slate-700"
              aria-label="Close scheme details"
            >
              <X size={22} />
            </button>
          </div>

          <p className="text-slate-600 mt-4">{selectedScheme.description}</p>

          {/* Benefits */}
          <h3 className="font-semibold text-slate-800 mt-6">Benefits</h3>

          <p className="text-slate-600 text-sm mt-2">
            {selectedScheme.benefits}
          </p>

          {/* Eligibility information */}
          <h3 className="font-semibold text-slate-800 mt-6">Eligibility</h3>

          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-slate-600">
            {selectedScheme.eligibility.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Required documents */}
          <h3 className="font-semibold text-slate-800 mt-6">
            Required Documents
          </h3>

          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-slate-600">
            {selectedScheme.documents.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Eligibility Checker */}
          <div className="mt-8">
            <EligibilityChecker schemeName={selectedScheme.name} />
          </div>
          <div className="mt-8">
            <DocumentAssistant
              key={selectedScheme.id}
              documents={selectedScheme.documents}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Schemes;
