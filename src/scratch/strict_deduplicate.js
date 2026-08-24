import fs from 'fs';
import path from 'path';

function getStrictBaseKey(url) {
  try {
    const filename = url.split('/').pop().split('?')[0];
    let base = filename.replace(/\.(jpg|jpeg|png|webp)/i, '');
    // Remove all dimensions anywhere (e.g. -1536x1025, -1024x683)
    base = base.replace(/-\d+x\d+/gi, '');
    base = base.replace(/-scaled/gi, '');
    base = base.replace(/-\d+$/gi, '');
    base = base.replace(/_edited/gi, '').replace(/-edited/gi, '').replace(/-编辑/gi, '');
    base = base.replace(/[-_]+/g, '-');
    return base.toLowerCase().trim();
  } catch (e) {
    return url;
  }
}

function selectBestVariant(urls) {
  return urls.sort((a, b) => {
    // Prefer the shortest URL (which usually has no nested dimension suffixes) or higher resolution
    return a.length - b.length;
  })[0];
}

async function run() {
  const projectsPath = path.join(process.cwd(), 'src', 'data', 'projects.json');
  const rawData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  console.log(`Running deep strict deduplication for ${rawData.length} projects...`);
  let totalBefore = 0;
  let totalAfter = 0;

  const cleanedProjects = rawData.map((project) => {
    const rawImages = project.images || [];
    totalBefore += rawImages.length;

    const groups = new Map();

    for (const imgUrl of rawImages) {
      const baseKey = getStrictBaseKey(imgUrl);
      if (!groups.has(baseKey)) {
        groups.set(baseKey, []);
      }
      groups.get(baseKey).push(imgUrl);
    }

    const uniqueImages = [];
    for (const [key, variants] of groups.entries()) {
      const best = selectBestVariant(variants);
      if (best) {
        uniqueImages.push(best);
      }
    }

    totalAfter += uniqueImages.length;
    console.log(`-> ${project.title}: ${rawImages.length} -> ${uniqueImages.length} pristine distinct photos.`);

    return {
      ...project,
      heroImage: uniqueImages[0] || project.heroImage,
      images: uniqueImages.length > 0 ? uniqueImages : [project.heroImage]
    };
  });

  fs.writeFileSync(projectsPath, JSON.stringify(cleanedProjects, null, 2), 'utf8');
  console.log(`\n🎉 Deep strict deduplication complete: ${totalBefore} -> ${totalAfter} pristine unique photos!`);
}

run();
