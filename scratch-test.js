const baseUrl = "https://abjad-payment-service-production.up.railway.app";

async function test() {
  try {
    const res = await fetch(baseUrl + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com", password: "wrongpassword" })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response text:", text);
    try {
      const data = JSON.parse(text);
      console.log("Keys:", Object.keys(data));
      console.log("Error property:", data.error);
      console.log("Message property:", data.message);
    } catch(e) {}
  } catch(e) {
    console.error(e);
  }
}
test();
