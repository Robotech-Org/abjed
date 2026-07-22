const endpoints = ["/auth/login", "/auth/register"];
const baseUrl = "https://abjad-payment-service-production.up.railway.app";

async function test() {
  for (const ep of endpoints) {
    try {
      console.log(`Testing ${ep} with invalid email format`);
      const res = await fetch(baseUrl + ep, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "invalid", password: "123" }) // too short password, bad email
      });
      const text = await res.text();
      console.log(`${ep} status: ${res.status}`);
      console.log(`${ep} response: ${text}\n`);
    } catch(e) {
      console.error(e);
    }
  }
}
test();
