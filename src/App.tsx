import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ChargingWindowPage } from "./pages/ChargingWindowPage";
import { EnergyMixPage } from "./pages/EnergyMixPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/energy-mix" element={<EnergyMixPage />} />
            <Route path="/charging-window" element={<ChargingWindowPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;