import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Schemes from "./pages/Schemes";
import PublicServices from "./pages/PublicServices";
import Applications from "./pages/Applications";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Header />

          <main className="p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/services" element={<PublicServices />} />
              <Route path="/applications" element={<Applications />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
