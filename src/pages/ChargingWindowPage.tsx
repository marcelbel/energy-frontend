import { useState } from "react";
import { getChargingWindow } from "../api";
import type { ChargingWindowResponse } from "../types";

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ChargingWindowPage() {
  const [chargingHours, setChargingHours] = useState(3);
  const [chargingWindow, setChargingWindow] =
    useState<ChargingWindowResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFindWindow() {
    try {
      setError("");
      setLoading(true);
      const data = await getChargingWindow(chargingHours);
      setChargingWindow(data);
    } catch {
      setError("Nie udało się wyznaczyć najlepszego okna ładowania.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <section className="charging-page">
      <h1>Najlepsze okno ładowania</h1>

      <p className="page-description">
        Wybierz czas ładowania od 1 do 6 godzin. Aplikacja sprawdzi dane
        prognozowane dla dwóch kolejnych dni i znajdzie okres z najwyższym
        udziałem czystej energii.
      </p>

      {error && <div className="error">{error}</div>}

      <div className="form-card">
        <label htmlFor="hours">Czas ładowania</label>

        <select
          id="hours"
          value={chargingHours}
          onChange={(event) => setChargingHours(Number(event.target.value))}
        >
          <option value={1}>1 godzina</option>
          <option value={2}>2 godziny</option>
          <option value={3}>3 godziny</option>
          <option value={4}>4 godziny</option>
          <option value={5}>5 godzin</option>
          <option value={6}>6 godzin</option>
        </select>

        <button onClick={handleFindWindow} disabled={loading}>
          {loading ? "Szukam..." : "Znajdź najlepsze okno"}
        </button>
      </div>

      {chargingWindow && (
        <article className="result-card">
          <h3>Wynik</h3>

          <p>
            Start: <strong>{formatDateTime(chargingWindow.start)}</strong>
          </p>

          <p>
            Koniec: <strong>{formatDateTime(chargingWindow.end)}</strong>
          </p>

          <p>
            Średni udział czystej energii:{" "}
            <strong>{chargingWindow.cleanEnergyPercentage.toFixed(2)}%</strong>
          </p>
        </article>
      )}
    </section>
  );
}