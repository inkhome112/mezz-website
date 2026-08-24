import fs from 'fs';
import path from 'path';

const projectsList = [
  // Residential (16)
  { slug: 'tennyson', title: 'Tennyson', category: 'Residential', location: 'Malvern East VIC', subtitle: 'Contemporary Architectural Residence', url: 'https://www.mezzgroup.com.au/tennyson/' },
  { slug: 'kooyong', title: 'Kooyong', category: 'Residential', location: 'Kooyong VIC', subtitle: 'Bespoke Multi-Residential', url: 'https://www.mezzgroup.com.au/kooyong/' },
  { slug: 'heatherdale', title: 'Heatherdale', category: 'Residential', location: 'Mitcham VIC', subtitle: 'Modern Townhouse Living', url: 'https://www.mezzgroup.com.au/heatherdale/' },
  { slug: 'waverley', title: 'Waverley', category: 'Residential', location: 'Mount Waverley VIC', subtitle: 'Luxury Architectural Residence', url: 'https://www.mezzgroup.com.au/waverley/' },
  { slug: 'ivori', title: 'Ivori', category: 'Residential', location: 'Glen Iris VIC', subtitle: '8 Luxury Townhouses', url: 'https://www.mezzgroup.com.au/ivori/' },
  { slug: 'romoly', title: 'Romoly', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Contemporary Residential Townhomes', url: 'https://www.mezzgroup.com.au/romoly/' },
  { slug: 'brindy', title: 'Brindy', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Bespoke Architectural Living', url: 'https://www.mezzgroup.com.au/brindy/' },
  { slug: 'westham', title: 'Westham', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Architectural Townhouse Collection', url: 'https://www.mezzgroup.com.au/westham/' },
  { slug: 'galahad', title: 'Galahad', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Modern Urban Residences', url: 'https://www.mezzgroup.com.au/galahad/' },
  { slug: 'minaki', title: 'Minaki', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Luxury Architectural Living', url: 'https://www.mezzgroup.com.au/minaki/' },
  { slug: 'maggs', title: 'Maggs', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Bespoke Spatial Design', url: 'https://www.mezzgroup.com.au/maggs/' },
  { slug: 'hawthorn', title: 'Hawthorn', category: 'Residential', location: 'Hawthorn VIC', subtitle: 'Contemporary Urban Residences', url: 'https://www.mezzgroup.com.au/hawthorn/' },
  { slug: 'alexandracanterbury', title: 'Alexandra', category: 'Residential', location: 'Canterbury VIC', subtitle: 'Heritage & Modern Integration', url: 'https://www.mezzgroup.com.au/alexandracanterbury/' },
  { slug: 'coppin', title: 'Coppin', category: 'Residential', location: 'Malvern East VIC', subtitle: 'Edwardian Heritage Extension', url: 'https://www.mezzgroup.com.au/coppin/' },
  { slug: 'benton', title: 'Benton', category: 'Residential', location: 'Melbourne VIC', subtitle: 'Architectural Residence', url: 'https://www.mezzgroup.com.au/benton/' },
  { slug: 'templestowe', title: 'Templestowe', category: 'Residential', location: 'Templestowe VIC', subtitle: 'Bespoke Multi-Residential', url: 'https://www.mezzgroup.com.au/templestowe/' },

  // Commercial & Childcare (6)
  { slug: 'ashburton-early-learning', title: 'Ashburton Early Learning', category: 'Commercial', location: 'Ashburton VIC', subtitle: 'Purpose-Built Childcare Centre', url: 'https://www.mezzgroup.com.au/ashburton-early-learning/' },
  { slug: 'glenroy-childcare', title: 'Glenroy Childcare', category: 'Commercial', location: 'Glenroy VIC', subtitle: 'State-of-the-Art Early Learning Facility', url: 'https://www.mezzgroup.com.au/glenroy-childcare/' },
  { slug: 'james', title: 'James', category: 'Commercial', location: 'Melbourne VIC', subtitle: 'Commercial Architectural Complex', url: 'https://www.mezzgroup.com.au/james/' },
  { slug: 'thompsons-apartments-and-townhouses', title: 'Thompsons Apartments & Townhouses', category: 'Commercial', location: 'Templestowe Lower VIC', subtitle: 'Mixed-Use Residential & Commercial', url: 'https://www.mezzgroup.com.au/thompsons-apartments-and-townhouses/' },
  { slug: 'eunoia-childcare-centre', title: 'Eunoia Education Childcare', category: 'Commercial', location: 'Melbourne VIC', subtitle: 'Early Learning Centre Development', url: 'https://www.mezzgroup.com.au/eunoia-childcare-centre/' },
  { slug: 'thompsons-childcare', title: 'Thompsons Childcare', category: 'Commercial', location: 'Templestowe Lower VIC', subtitle: 'Modern Childcare Facility', url: 'https://www.mezzgroup.com.au/thompsons-childcare/' },

  // Retail & Hospitality (7)
  { slug: 'tao-dumplings', title: 'Tao Dumplings', category: 'Hospitality', location: 'Mentone VIC', subtitle: 'Flagship Asian Restaurant & Bar', url: 'https://www.mezzgroup.com.au/tao-dumplings/' },
  { slug: 'mamamee', title: 'Ma Ma Mee', category: 'Hospitality', location: 'Werribee VIC', subtitle: 'Modern Asian Fusion Venue', url: 'https://www.mezzgroup.com.au/mamamee/' },
  { slug: 'australian-music-world', title: 'Australian Music World', category: 'Hospitality', location: 'Melbourne VIC', subtitle: 'Commercial Retail Showroom', url: 'https://www.mezzgroup.com.au/australian-music-world/' },
  { slug: 'dukes-gym', title: 'Dukes Gym', category: 'Hospitality', location: 'Melbourne VIC', subtitle: 'Premium Fitness Facility', url: 'https://www.mezzgroup.com.au/dukes-gym/' },
  { slug: 'digital-art-studio', title: 'Digital Art Studio', category: 'Hospitality', location: 'Melbourne VIC', subtitle: 'Creative Commercial Studio', url: 'https://www.mezzgroup.com.au/digital-art-studio/' },
  { slug: 'prime-cosmetic', title: 'Prime Cosmetic', category: 'Hospitality', location: 'Melbourne VIC', subtitle: 'Luxury Clinic Interior', url: 'https://www.mezzgroup.com.au/prime-cosmetic/' },
  { slug: 'yakinau-izakaya', title: 'Yakinau Izakaya', category: 'Hospitality', location: 'Melbourne VIC', subtitle: 'Japanese Dining & Bar', url: 'https://www.mezzgroup.com.au/yakinau-izakaya/' }
];

async function extractProject(item) {
  try {
    const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    const html = await res.text();

    const rawImages = [];
    
    // Match any href or src with wp-content/uploads
    const regex = /(?:href|src)=['"]([^'"]*wp-content\/uploads\/[^'"]*\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))['"]/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      let imgUrl = match[1];
      if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
      else if (imgUrl.startsWith('/')) imgUrl = 'https://www.mezzgroup.com.au' + imgUrl;

      const lower = imgUrl.toLowerCase();
      if (
        !lower.includes('logo') &&
        !lower.includes('favicon') &&
        !lower.includes('astra') &&
        !lower.includes('avatar') &&
        !lower.includes('cropped') &&
        !lower.includes('150x150') &&
        !lower.includes('300x')
      ) {
        // Strip size suffixes if we want high res, e.g. -768x512
        rawImages.push(imgUrl);
      }
    }

    const uniqueImages = Array.from(new Set(rawImages));

    // Description
    const pMatches = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 25 && !t.includes('Yoast') && !t.includes('MonsterInsights') && !t.includes('WordPress') && !t.includes('Copyright'));
    
    const description = pMatches.slice(0, 3).join(' ') || `A signature architectural development by Mezz Group in ${item.location}.`;

    return {
      images: uniqueImages,
      description
    };
  } catch (e) {
    console.error(`Error for ${item.slug}:`, e.message);
    return null;
  }
}

async function main() {
  console.log('Starting full authentic extraction...');
  const compiled = [];

  for (let i = 0; i < projectsList.length; i++) {
    const item = projectsList[i];
    console.log(`[${i+1}/${projectsList.length}] Scraping ${item.title}...`);
    const data = await extractProject(item);
    
    let images = data?.images || [];
    let description = data?.description || `A signature ${item.category.toLowerCase()} architectural development by Mezz Group in ${item.location}.`;

    if (images.length === 0) {
      console.log(`  WARNING: No authentic images found for ${item.slug}`);
      images = ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'];
    } else {
      console.log(`  -> Found ${images.length} authentic images! (Hero: ${images[0]})`);
    }

    compiled.push({
      id: item.slug,
      slug: item.slug,
      title: item.title,
      category: item.category,
      subtitle: item.subtitle,
      location: item.location,
      client: 'Private Client',
      year: '2021 - 2025',
      heroImage: images[0],
      description,
      stats: {
        residences: `${item.category} Architecture`,
        completion: 'Completed / Handover',
        location: item.location
      },
      features: [
        'Tailored architectural spatial planning',
        'Abundant natural lighting and ambient ventilation',
        'Custom fixtures and refined material craftsmanship',
        'Seamless indoor-outdoor connectivity'
      ],
      images
    });
  }

  const outPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  fs.writeFileSync(outPath, JSON.stringify(compiled, null, 2), 'utf8');
  console.log(`\nSuccessfully updated ${compiled.length} projects in ${outPath}!`);
}

main();
