let API_BASE_URL = "http://localhost:3000"; // Prvo probaj lokalni

async function testApiConnection(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // 1s timeout

    const response = await fetch(`${url}/api/ping`, { signal: controller.signal });
    clearTimeout(timeoutId);

    return response.ok;
  } catch (err) {
    return false;
  }
}

// Pozivaš ovo pre nego koristiš API
async function initializeApiBaseUrl() {
  const lokalni = "http://192.168.1.67:3000";   // LAN backend
  const fallback = "http://178.222.213.49:3000"; // Javni IP backend

  const lokalOk = await testApiConnection(lokalni);
  API_BASE_URL = lokalOk ? lokalni : fallback;
}
