const API_BASE_URL = "https://energy-backend-inlc.onrender.com/";

export async function getEnergyMix() {
  const response = await fetch(`${API_BASE_URL}api/energy-mix`);

  if (!response.ok) {
    throw new Error("Failed to fetch energy mix");
  }

  return response.json();
}

export async function getChargingWindow(hours: number) {
  const response = await fetch(`${API_BASE_URL}api/charging-window?hours=${hours}`);

  if (!response.ok) {
    throw new Error("Failed to fetch charging window");
  }

  return response.json();
}