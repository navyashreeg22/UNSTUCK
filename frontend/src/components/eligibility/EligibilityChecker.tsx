import { useState } from "react";

interface EligibilityCheckerProps {
  schemeName: string;
}

function EligibilityChecker({ schemeName }: EligibilityCheckerProps) {
  const [age, setAge] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [education, setEducation] = useState("");

  const [result, setResult] = useState<string | null>(null);

  function checkEligibility() {
    if (!age || !annualIncome || !education) {
      setResult("Please fill in all the fields.");
      return;
    }

    const userAge = Number(age);
    const income = Number(annualIncome);

    if (
      userAge <= 0 ||
      income < 0 ||
      !Number.isFinite(userAge) ||
      !Number.isFinite(income)
    ) {
      setResult("Please enter valid age and income values.");
      return;
    }

    if (education === "undergraduate" && income <= 500000) {
      setResult(
        "Demo result: Your profile matches the sample conditions. Please verify the official scheme criteria.",
      );
    } else {
      setResult(
        "Demo result: Your profile does not match these sample conditions. Check the official scheme requirements.",
      );
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          Check Your Eligibility
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Enter your details for {schemeName}.
        </p>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Your Age
        </label>

        <input
          type="number"
          min="1"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            setResult(null);
          }}
          placeholder="Enter your age"
          className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Annual income */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Annual Family Income (₹)
        </label>

        <input
          type="number"
          min="0"
          value={annualIncome}
          onChange={(e) => {
            setAnnualIncome(e.target.value);
            setResult(null);
          }}
          placeholder="Enter annual family income"
          className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Current Education Level
        </label>

        <select
          value={education}
          onChange={(e) => {
            setEducation(e.target.value);
            setResult(null);
          }}
          className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-blue-500"
        >
          <option value="">Select education level</option>
          <option value="school">School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="postgraduate">Postgraduate</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        onClick={checkEligibility}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 transition"
      >
        Check Eligibility
      </button>

      {result && (
        <div className="bg-blue-50 text-blue-800 rounded-lg p-4 text-sm">
          {result}
        </div>
      )}
    </div>
  );
}

export default EligibilityChecker;
