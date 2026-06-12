import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getEnergyMix } from "../api";
import type { EnergyMixResponse } from "../types";

const CHART_COLORS = [
  "#4caf50",
  "#2196f3",
  "#ff9800",
  "#9c27b0",
  "#f44336",
  "#00bcd4",
  "#795548",
  "#607d8b",
  "#8bc34a",
];
const CLEAN_FUELS = ["biomass", "nuclear", "hydro", "wind", "solar"];
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0];
  const fuelName = String(item.name);
  const isCleanFuel = CLEAN_FUELS.includes(fuelName.toLowerCase());
  return (
    <div className="custom-tooltip">
      <strong>{fuelName}</strong>
      <span className={isCleanFuel ? "clean-value" : "dirty-value"}>
        {Number(item.value).toFixed(2)}%
      </span>
    </div>
  );
}
export function EnergyMixPage() {
  const [energyMix, setEnergyMix] = useState<EnergyMixResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEnergyMix() {
      try {
        setLoading(true);
        const data = await getEnergyMix();
        setEnergyMix(data);
      } catch {
        setError("Nie udało się pobrać miksu energetycznego.");
      } finally {
        setLoading(false);
      }
    }

    loadEnergyMix();
  }, []);

  return (
      <section className="energy-mix-page">
      <h1>Miks energetyczny Wielkiej Brytanii</h1>
      <p className="page-description">
        Wykresy pokazują średni udział poszczególnych źródeł energii dla
        dzisiaj, jutra i pojutrza.
      </p>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p>Ładowanie danych...</p>
      ) : (
        <div className="charts-grid">
          {energyMix.map((day) => {
            const chartData = Object.entries(day.generationMix ?? {}).map(
              ([name, value]) => ({
                name,
                value,
              })
            );

            return (
              <article className="card" key={day.date}>
                <h3>{new Date(day.date).toLocaleDateString("pl-PL")}</h3>

                <p className="clean-energy">
                  Czysta energia:{" "}
                  <strong>{day.cleanEnergyPercentage.toFixed(2)}%</strong>
                </p>

                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={390}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={92}
                        label={false}
                        labelLine={false}
                      >
                        {chartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                      content={<CustomTooltip />}
                      />
                      <Legend
                       verticalAlign="bottom"
                       align="center"
                       iconType="square"
                       />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}