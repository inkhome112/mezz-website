import fs from 'fs';

async function check() {
  const urls = [
    'https://www.mezzgroup.com.au/residential/',
    'https://www.mezzgroup.com.au/commercial/',
    'https://www.mezzgroup.com.au/retail/',
    'https://www.mezzgroup.com.au/tennyson/',
    'https://www.mezzgroup.com.au/kooyong/',
    'https://www.mezzgroup.com.au/heatherdale/',
    'https://www.mezzgroup.com.au/glenroy-childcare/',
    'https://www.mezzgroup.com.au/australian-music-world/'
  ];

  for (const u of urls) {
    try {
      const res = await fetch(u);
      const text = await res.text();
      // Extract all URLs ending in jpg, jpeg, png, webp
      const allUrls = text.match(/https:\/\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi) || [];
      const mezzUploads = Array.from(new Set(allUrls.filter(x => x.includes('mezzgroup.com.au/wp-content/uploads/'))));
      console.log(`\nURL: ${u} | Found ${mezzUploads.length} uploads`);
      console.log(mezzUploads.slice(0, 5));
    } catch (e) {
      console.log(`Failed ${u}: ${e.message}`);
    }
  }
}

check();
