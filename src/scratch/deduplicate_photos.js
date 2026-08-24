import fs from 'fs';
import path from 'path';

function getBaseImageKey(url) {
  try {
    const filename = url.split('/').pop().split('?')[0];
    // Remove extensions
    let base = filename.replace(/\.(jpg|jpeg|png|webp)/i, '');
    // Remove wordpress dimension patterns: e.g. -1024x683-1, -1536x1025, -768x512, -300x200, -scaled
    base = base.replace(/-\d+x\d+(?:-\d+)?$/i, '');
    base = base.replace(/-scaled(?:-\d+)?$/i, '');
    base = base.replace(/-\d+$/i, ''); // e.g. -1 at the end
    return base.toLowerCase();
  } catch (e) {
    return url;
  }
}

function selectBestResolution(urls) {
  // Sort by highest preference: un-dimensioned or largest resolution
  return urls.sort((a, b) => {
    const aHasDim = /-\d+x\d+/i.test(a);
    const bHasDim = /-\d+x\d+/i.test(b);
    
    // If one is un-dimensioned original and other is not, prefer original
    if (!aHasDim && bHasDim) return -1;
    if (aHasDim && !bHasDim) return 1;

    // Compare pixel widths if both have dimensions
    const aWidth = parseInt((a.match(/-(\d+)x\d+/i) || [0, 0])[1], 10);
    const bWidth = parseInt((b.match(/-(\d+)x\d+/i) || [0, 0])[1], 10);
    return bWidth - aWidth;
  })[0];
}

async function run() {
  const projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const rawData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  console.log(`Starting deduplication for ${rawData.length} projects...`);
  let totalBefore = 0;
  let totalAfter = 0;

  const cleanedProjects = rawData.map((project) => {
    const rawImages = project.images || [];
    totalBefore += rawImages.length;

    // Group images by base image key
    const groups = new Map();

    for (const imgUrl of rawImages) {
      const lower = imgUrl.toLowerCase();
      // Skip unwanted logos/icons if any remain
      if (
        lower.includes('logo') ||
        lower.includes('favicon') ||
        lower.includes('apple-touch') ||
        lower.includes('150x150') ||
        lower.includes('300x')
      ) {
        continue;
      }

      const baseKey = getBaseImageKey(imgUrl);
      if (!groups.has(baseKey)) {
        groups.set(baseKey, []);
      }
      groups.get(baseKey).push(imgUrl);
    }

    // For each unique group, pick the highest-resolution version
    const uniqueImages = [];
    for (const [key, variants] of groups.entries()) {
      const best = selectBestResolution(variants);
      if (best) {
        uniqueImages.push(best);
      }
    }

    totalAfter += uniqueImages.length;
    console.log(`-> ${project.title}: Reduced ${rawImages.length} images to ${uniqueImages.length} distinct photos.`);

    return {
      ...project,
      heroImage: uniqueImages[0] || project.heroImage,
      images: uniqueImages.length > 0 ? uniqueImages : [project.heroImage]
    };
  });

  fs.writeFileSync(projectsPath, JSON.stringify(cleanedProjects, null, 2), 'utf8');
  console.log(`\n🎉 Total photos reduced from ${totalBefore} to ${totalAfter} distinct high-resolution photos!`);
}

run();
