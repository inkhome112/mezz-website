import fs from 'fs';
import path from 'path';

async function fetchPage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    return await res.text();
  } catch (err) {
    console.error('Error fetching', url, err.message);
    return '';
  }
}

async function run() {
  console.log('Starting deep scrape of all Mezz Group projects...');
  const categoryUrls = [
    'https://www.mezzgroup.com.au/residential/',
    'https://www.mezzgroup.com.au/commercial/',
    'https://www.mezzgroup.com.au/retail/'
  ];

  const projectUrls = new Set();

  for (const catUrl of categoryUrls) {
    const html = await fetchPage(catUrl);
    // Find all links to project pages or elementor post links
    const linkMatches = [...html.matchAll(/href="(https:\/\/www\.mezzgroup\.com\.au\/[a-zA-Z0-9_-]+\/)"/g)];
    for (const m of linkMatches) {
      const u = m[1];
      if (!categoryUrls.includes(u) && !u.includes('/contact') && !u.includes('/about') && !u.includes('/feed') && !u.includes('/wp-content') && !u.includes('/home') && u !== 'https://www.mezzgroup.com.au/') {
        projectUrls.add(u);
      }
    }
  }

  console.log(`Discovered ${projectUrls.size} unique project URLs:`, Array.from(projectUrls));
  
  const extracted = [];

  for (const pUrl of projectUrls) {
    console.log('Scraping:', pUrl);
    const html = await fetchPage(pUrl);
    if (!html) continue;

    // Extract Title
    const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<title>(.*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].replace(/ - Mezz Group/i, '').replace(/<[^>]+>/g, '').trim() : '';

    // Extract Description / Paragraphs
    const pMatches = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 30 && !t.includes('Yoast') && !t.includes('MonsterInsights') && !t.includes('WordPress') && !t.includes('Copyright'));
    const description = pMatches.slice(0, 3).join(' ') || 'A signature contemporary architectural project by Mezz Group in Melbourne.';

    // Extract Images
    const imgMatches = [...html.matchAll(/src="(https:\/\/www\.mezzgroup\.com\.au\/wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi)];
    const images = Array.from(new Set(imgMatches.map(m => m[1]))).filter(img => 
      !img.includes('logo') && !img.includes('favicon') && !img.includes('Astra') && !img.includes('avatar')
    );

    const slug = pUrl.replace('https://www.mezzgroup.com.au/', '').replace(/\//g, '');

    // Determine Category
    let category = 'Residential';
    if (pUrl.includes('childcare') || pUrl.includes('learning') || pUrl.includes('glenroy') || pUrl.includes('ashburton') || pUrl.includes('commercial')) {
      category = 'Commercial';
    } else if (pUrl.includes('dumpling') || pUrl.includes('mee') || pUrl.includes('gym') || pUrl.includes('music') || pUrl.includes('retail') || pUrl.includes('cosmetic') || pUrl.includes('izakaya')) {
      category = 'Hospitality';
    }

    if (images.length > 0) {
      extracted.push({
        url: pUrl,
        slug,
        title: title || slug.charAt(0).toUpperCase() + slug.slice(1),
        category,
        description,
        heroImage: images[0],
        images,
        imagesCount: images.length
      });
    }
  }

  console.log(`Successfully parsed ${extracted.length} projects.`);
  fs.writeFileSync('scratch_scraped_summary.json', JSON.stringify(extracted, null, 2));
}

run();
