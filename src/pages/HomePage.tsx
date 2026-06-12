import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="hero">
      <h1>Energy Mix UK</h1>

      <p>
        Aplikacja pobiera dane z publicznego Carbon Intensity API i pokazuje
        aktualny oraz prognozowany miks energetyczny Wielkiej Brytanii.
      </p>

      <p>
        Backend udostępnia dwa endpointy: jeden do pobierania średniego miksu
        energii dla trzech dni, a drugi do wyznaczania najlepszego okna
        ładowania samochodu elektrycznego.
      </p>

      <div className="hero-actions">
        <Link to="/energy-mix" className="button-link">
          Zobacz miks energetyczny
        </Link>

        <Link to="/charging-window" className="button-link secondary">
          Wyznacz okno ładowania
        </Link>
      </div>
    </section>
  );
}