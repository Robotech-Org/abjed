const baseUrl = "https://abjad-payment-service-production.up.railway.app";

async function test() {
  try {
    const res = await fetch(baseUrl + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "wrongpassword" })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response text:", text);
  } catch(e) {
    console.error(e);
  }
}
test();
