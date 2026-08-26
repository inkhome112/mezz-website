import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const CLOUD_STORE_URL = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a038425ca41b23';

export async function getGlobalTheme() {
  try {
    const res = await fetch(CLOUD_STORE_URL, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (res.ok) {
      const json = await res.json();
      const theme = json?.data?.activeTheme;
      if (['noir', 'minimalist', 'cinematic'].includes(theme)) {
        return theme;
      }
    }
  } catch (e) {
    console.error('Error fetching global theme from cloud store:', e.message);
  }

  // Fallback to local company.json without polluting in-memory state
  try {
    const companyPath = path.join(process.cwd(), 'src', 'data', 'company.json');
    if (fs.existsSync(companyPath)) {
      const data = JSON.parse(fs.readFileSync(companyPath, 'utf8'));
      if (data?.activeTheme && ['noir', 'minimalist', 'cinematic'].includes(data.activeTheme)) {
        return data.activeTheme;
      }
    }
  } catch (e) {}

  return 'noir';
}

export async function setGlobalTheme(theme) {
  try {
    await fetch(CLOUD_STORE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'mezz_settings',
        data: { activeTheme: theme }
      }),
      cache: 'no-store',
      next: { revalidate: 0 }
    });
  } catch (e) {
    console.error('Failed to update cloud store:', e.message);
  }

  try {
    const companyPath = path.join(process.cwd(), 'src', 'data', 'company.json');
    if (fs.existsSync(companyPath)) {
      const data = JSON.parse(fs.readFileSync(companyPath, 'utf8'));
      data.activeTheme = theme;
      fs.writeFileSync(companyPath, JSON.stringify(data, null, 2), 'utf8');
    }
  } catch (e) {}
}

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const cookieTheme = cookieStore.get('mezz_public_theme')?.value;

    const globalTheme = await getGlobalTheme();
    const activeTheme = globalTheme || cookieTheme || 'noir';

    const response = NextResponse.json({
      success: true,
      activeTheme,
    });

    response.cookies.set('mezz_public_theme', activeTheme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      httpOnly: false,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { theme } = await request.json();
    if (!['noir', 'minimalist', 'cinematic'].includes(theme)) {
      return NextResponse.json({ success: false, message: 'Invalid theme' }, { status: 400 });
    }

    await setGlobalTheme(theme);

    const response = NextResponse.json({
      success: true,
      activeTheme: theme,
    });

    response.cookies.set('mezz_public_theme', theme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      httpOnly: false,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
