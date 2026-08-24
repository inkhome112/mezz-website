import fs from 'fs';

async function test() {
  const res = await fetch('https://www.mezzgroup.com.au/tennyson/');
  const html = await res.text();
  console.log('HTML length:', html.length);
  
  // Find all occurrences of wp-content/uploads/
  const list = [];
  const parts = html.split('wp-content/uploads/');
  for (let i = 1; i < parts.length; i++) {
    const chunk = parts[i];
    // Find where the url ends (could end at quote, space, apostrophe, paren)
    let endIdx = -1;
    for (let j = 0; j < chunk.length; j++) {
      if (['"', "'", ')', ' ', '\t', '\n', '<', '>'].includes(chunk[j])) {
        endIdx = j;
        break;
      }
    }
    if (endIdx !== -1) {
      const filename = chunk.substring(0, endIdx);
      if (filename.match(/\.(jpg|jpeg|png|webp)/i)) {
        list.push('https://www.mezzgroup.com.au/wp-content/uploads/' + filename);
      }
    }
  }
  console.log('Found images:', list.length);
  console.log(list);
}

test();
