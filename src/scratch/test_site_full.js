import fs from 'fs';

const BASE_URL = 'https://www.plan11.co';

async function runTestSuite() {
  console.log(`========================================`);
  console.log(`🚀 RUNNING FULL END-TO-END TEST SUITE ON ${BASE_URL}`);
  console.log(`========================================\n`);

  const results = {
    passed: 0,
    failed: 0,
    checks: []
  };

  function record(name, success, detail = '') {
    if (success) {
      results.passed++;
      console.log(`✅ [PASS] ${name} ${detail ? `(${detail})` : ''}`);
    } else {
      results.failed++;
      console.log(`❌ [FAIL] ${name} ${detail ? `(${detail})` : ''}`);
    }
    results.checks.push({ name, success, detail });
  }

  // 1. Homepage & SSL Check
  try {
    const t0 = Date.now();
    const res = await fetch(BASE_URL);
    const time = Date.now() - t0;
    record('Homepage Connectivity & SSL', res.status === 200, `HTTP ${res.status} in ${time}ms`);
  } catch (e) {
    record('Homepage Connectivity & SSL', false, e.message);
  }

  // 2. API Endpoints Check
  try {
    const pRes = await fetch(`${BASE_URL}/api/projects`);
    const pData = await pRes.json();
    const count = pData.projects?.length || 0;
    record('API /api/projects', pRes.status === 200 && count === 29, `Found ${count}/29 projects`);
  } catch (e) {
    record('API /api/projects', false, e.message);
  }

  // 3. Theme Switching Verification (Noir, Minimalist, Cinematic)
  for (const t of ['minimalist', 'noir', 'cinematic']) {
    try {
      const postRes = await fetch(`${BASE_URL}/api/theme`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: t })
      });
      const postJson = await postRes.json();
      
      const getRes = await fetch(BASE_URL);
      const html = await getRes.text();
      const expectedClass = t === 'minimalist' ? 'theme-minimalist' : 'theme-dark';
      const matches = html.includes(expectedClass);

      record(`Theme Switch -> ${t.toUpperCase()}`, postJson.activeTheme === t && matches, `HTML contains ${expectedClass}`);
    } catch (e) {
      record(`Theme Switch -> ${t.toUpperCase()}`, false, e.message);
    }
  }

  // Reset theme to noir or whatever user prefers
  await fetch(`${BASE_URL}/api/theme`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme: 'noir' })
  });

  // 4. Test All 29 Project Detail Pages
  console.log(`\n--- Testing all 29 Project Case Study Routes ---`);
  const projectsData = JSON.parse(fs.readFileSync('src/data/projects.json', 'utf8'));
  let projectsPassed = 0;

  for (const p of projectsData) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${p.slug}`);
      if (res.status === 200) {
        projectsPassed++;
      } else {
        console.log(`   ⚠️ Route /projects/${p.slug} returned HTTP ${res.status}`);
      }
    } catch (e) {
      console.log(`   ⚠️ Route /projects/${p.slug} error: ${e.message}`);
    }
  }
  record('All 29 Project Detail Routes', projectsPassed === 29, `${projectsPassed}/29 return HTTP 200 OK`);

  // 5. Test Key Project Photos (Hero images accessibility)
  console.log(`\n--- Sample Testing Project Photography URLs ---`);
  const sampleSlugs = ['ivori', 'kooyong', 'tennyson', 'coppin', 'digital-art-studio', 'prime-cosmetic', 'yakinau-izakaya'];
  let imagesOk = 0;

  for (const slug of sampleSlugs) {
    const proj = projectsData.find(x => x.slug === slug);
    if (proj?.heroImage) {
      try {
        const imgRes = await fetch(proj.heroImage, { method: 'HEAD' });
        if (imgRes.status === 200) {
          imagesOk++;
        } else {
          console.log(`   ⚠️ Image for ${slug} returned HTTP ${imgRes.status}: ${proj.heroImage}`);
        }
      } catch (e) {
        console.log(`   ⚠️ Image fetch error for ${slug}: ${e.message}`);
      }
    }
  }
  record('Sample High-Res Project Photography', imagesOk === sampleSlugs.length, `${imagesOk}/${sampleSlugs.length} verified HTTP 200`);

  // 6. Transformations Slider Markup Check
  try {
    const homeHtml = await fetch(BASE_URL).then(r => r.text());
    const hasSlider = homeHtml.includes('id="transformations"') || homeHtml.includes('Architectural Transformations');
    const hasBadges = homeHtml.includes('Before') && homeHtml.includes('After');
    record('Transformations Slider Markup & Badges', hasSlider && hasBadges, 'Slider & responsive badges verified in HTML');
  } catch (e) {
    record('Transformations Slider Markup & Badges', false, e.message);
  }

  // 7. Admin Page Accessibility
  try {
    const adminRes = await fetch(`${BASE_URL}/admin`);
    record('Admin CMS Studio Route (/admin)', adminRes.status === 200, `HTTP ${adminRes.status}`);
  } catch (e) {
    record('Admin CMS Studio Route (/admin)', false, e.message);
  }

  console.log(`\n========================================`);
  console.log(`🎯 TEST SUMMARY: ${results.passed} PASSED / ${results.failed} FAILED`);
  console.log(`========================================\n`);
}

runTestSuite();
