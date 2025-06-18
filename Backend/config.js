let API_BASE_URL = "http://localhost:3000"; // Početna vrednost (nije konačna)

async function initializeApiBaseUrl() {
  const lokalni = "http://192.168.1.67:3000";      // tvoje LAN okruženje (npr. ako pristupaš sa istog Wi-Fi-ja)
  const javni = "http://109.92.160.174:3000";      // tvoja javna IP adresa (za pristup preko interneta)

  try {
    const response = await fetch(`${lokalni}/api/ping`, { method: 'GET' });
    if (response.ok) {
      API_BASE_URL = lokalni;
    } else {
      API_BASE_URL = javni;
    }
  } catch (err) {
    API_BASE_URL = javni;
  }

  window.API_BASE_URL = API_BASE_URL; // postavi globalnu promenljivu tek kad je sve provereno
}
