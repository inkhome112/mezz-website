import fs from 'fs';
import path from 'path';

const missingProjects = [
  { slug: 'digital-art-studio', url: 'https://www.mezzgroup.com.au/digitalartstudio/' },
  { slug: 'prime-cosmetic', url: 'https://www.mezzgroup.com.au/primecosmetic/' },
  { slug: 'yakinau-izakaya', url: 'https://www.mezzgroup.com.au/yakinauizakaya/' }
];

async function run() {
  const projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const allProjects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  for (const item of missingProjects) {
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        console.log(`Failed ${item.url}: HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();

      const parts = html.split('wp-content/uploads/');
      const rawImgs = [];
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
            const full = 'https://www.mezzgroup.com.au/wp-content/uploads/' + filename;
            const lower = full.toLowerCase();
            if (
              !lower.includes('logo') &&
              !lower.includes('favicon') &&
              !lower.includes('apple-touch') &&
              !lower.includes('150x150') &&
              !lower.includes('300x')
            ) {
              rawImgs.push(full);
            }
          }
        }
      }

      // Group & deduplicate
      const unique = Array.from(new Set(rawImgs));
      console.log(`-> ${item.slug}: Found ${unique.length} authentic images on ${item.url}!`);
      console.log(unique);

      // Extract description
      const pMatches = [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gi)]
        .map(m => m[1].replace(/<[^>]+>/g, '').trim())
        .filter(t => t.length > 25 && !t.includes('Yoast') && !t.includes('MonsterInsights') && !t.includes('WordPress') && !t.includes('Copyright'));
      
      const desc = pMatches.slice(0, 3).join(' ');

      // Find in projects.json
      const targetProj = allProjects.find(p => p.slug === item.slug);
      if (targetProj && unique.length > 0) {
        targetProj.images = unique;
        targetProj.heroImage = unique[0];
        if (desc) targetProj.description = desc;
      }
    } catch (e) {
      console.error(`Error for ${item.slug}:`, e.message);
    }
  }

  fs.writeFileSync(projectsPath, JSON.stringify(allProjects, null, 2), 'utf8');
  console.log('Successfully updated projects.json with authentic retail photos!');
}

run();
