async function run() {
  console.log('--- Step 1: Register ---');
  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    });
    console.log('Register Status:', res.status);
    const data = await res.text();
    console.log('Register Body:', data);
    console.log('Cookies Set:', res.headers.get('set-cookie'));
  } catch (e) {
    console.error('Register Error:', e.message);
  }

  console.log('\n--- Step 2: Pricing Page ---');
  try {
    const res2 = await fetch('http://localhost:3000/pricing');
    console.log('Pricing Status:', res2.status);
    const html = await res2.text();
    if (html.includes('— Birr')) {
      console.log('Result: Pricing page loaded with the fallback pricing: — Birr');
    } else {
      console.log('Result: Pricing page loaded real prices.');
    }
    if (html.includes('Explorer')) {
      console.log('Result: Explorer plan name found.');
    }
  } catch (e) {
    console.error('Pricing Error:', e.message);
  }
}
run();
