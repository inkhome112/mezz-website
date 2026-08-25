import fs from 'fs';

async function run() {
  const res = await fetch('https://www.mezzgroup.com.au/retail/');
  const html = await res.text();
  console.log('Retail page HTML size:', html.length);

  const parts = html.split('wp-content/uploads/');
  const found = [];
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    let endIdx = -1;
    for (let j = 0; j < chunk.length; j++) {
      if (['"', "'", ')', ' ', '\t', '\n', '<', '>', '&'].includes(chunk[j])) {
        endIdx = j;
        break;
      }
    }
    if (endIdx !== -1) {
      const filename = chunk.substring(0, endIdx);
      if (filename.match(/\.(jpg|jpeg|png|webp)/i)) {
        found.push('https://www.mezzgroup.com.au/wp-content/uploads/' + filename);
      }
    }
  }

  const unique = Array.from(new Set(found)).filter(u => 
    !u.toLowerCase().includes('logo') &&
    !u.toLowerCase().includes('favicon') &&
    !u.toLowerCase().includes('apple-touch') &&
    !u.toLowerCase().includes('astra')
  );

  console.log('Found retail images:', unique.length);
  console.log(unique);
}

run();
