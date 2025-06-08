const apiKey = "57815b15a10e97b71b6078db27507dc4"; 

const districts = {
  "Anantapur": { lat: 14.68, lon: 77.6 },
  "Chittoor": { lat: 13.22, lon: 79.1 },
  "East Godavari": { lat: 16.81, lon: 82.23 },
  "Guntur": { lat: 16.3, lon: 80.44 },
  "Kadapa": { lat: 14.47, lon: 78.82 },
  "Krishna": { lat: 16.3, lon: 80.44 },
  "Kurnool": { lat: 15.82, lon: 78.04 },
  "Nellore": { lat: 14.43, lon: 79.99 },
  "Prakasam": { lat: 15.48, lon: 80.04 },
  "Srikakulam": { lat: 18.3, lon: 83.9 },
  "Visakhapatnam": { lat: 17.68, lon: 83.22 },
  "Vizianagaram": { lat: 18.11, lon: 83.42 },
  "West Godavari": { lat: 16.75, lon: 81.68 }
};

async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!cityInput) {
    resultDiv.innerHTML = `<p style="color:red;">Please enter a district name.</p>`;
    return;
  }

  // Find district (case-insensitive)
  const districtKey = Object.keys(districts).find(
    d => d.toLowerCase() === cityInput.toLowerCase()
  );

  if (!districtKey) {
    resultDiv.innerHTML = `<p style="color:red;">District not found. Please enter a valid Andhra Pradesh district.</p>`;
    return;
  }

  const { lat, lon } = districts[districtKey];

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const weatherData = await weatherRes.json();

    const weatherHTML = `
      <h2>${districtKey}</h2>
      <p>🌡️ Temperature: ${weatherData.main.temp} °C</p>
      <p>🌥️ Condition: ${weatherData.weather[0].description}</p>
      <p>💨 Wind Speed: ${weatherData.wind.speed} m/s</p>
      <p>📍 Coordinates: ${lat.toFixed(2)}, ${lon.toFixed(2)}</p>
    `;

    resultDiv.innerHTML = weatherHTML;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">Error fetching weather data. Please try again later.</p>`;
  }
}
