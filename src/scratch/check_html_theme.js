async function run() {
  const res = await fetch('https://www.plan11.co', { cache: 'no-store' });
  const html = await res.text();
  console.log('HTML size:', html.length);
  const themeMatches = html.match(/theme-[a-zA-Z0-9_-]+/g);
  console.log('Theme classes in HTML:', themeMatches);
  const minimalistMatches = html.includes('MinimalistView') || html.includes('Editorial') || html.includes('Off-White');
  console.log('Minimalist content in HTML:', minimalistMatches);
}
run();
