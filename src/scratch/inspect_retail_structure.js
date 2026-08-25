import fs from 'fs';

async function run() {
  const res = await fetch('https://www.mezzgroup.com.au/retail/');
  const html = await res.text();
  
  // Find all links
  const links = [...html.matchAll(/href=['"]([^'"]+)['"]/gi)].map(m => m[1]);
  console.log('All links on /retail/:', links.filter(l => l.includes('mezzgroup.com.au')));

  // Find all elements with background-image or img
  const imgs = [...html.matchAll(/https?:\/\/[^\s"'<>\)]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]);
  console.log('All image URLs anywhere in /retail/:', Array.from(new Set(imgs)));
}

run();
