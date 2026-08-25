import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

const KV_URL = 'https://kvdb.io/A2jGZfM34hG78rPz92Xk1L/mezz_active_theme';

async function getGlobalTheme() {
  try {
    const res = await fetch(KV_URL, { cache: 'no-store' });
    if (res.ok) {
      const text = await res.text();
      const trimmed = text.trim().toLowerCase();
      if (['noir', 'minimalist', 'cinematic'].includes(trimmed)) {
        return trimmed;
      }
    }
  } catch (e) {
    // Cloud KV fallback
  }

  try {
    const companyPath = path.join(process.cwd(), 'src', 'data', 'company.json');
    if (fs.existsSync(companyPath)) {
      const data = JSON.parse(fs.readFileSync(companyPath, 'utf8'));
      if (data?.activeTheme) return data.activeTheme;
    }
  } catch (e) {}

  return 'noir';
}

async function setGlobalTheme(theme) {
  try {
    await fetch(KV_URL, {
      method: 'POST',
      body: theme,
      headers: { 'Content-Type': 'text/plain' },
      cache: 'no-store'
    });
  } catch (e) {
    console.error('Failed to update cloud KV:', e.message);
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
    const globalTheme = await getGlobalTheme();
    const cookieStore = await cookies();
    const cookieTheme = cookieStore.get('mezz_public_theme')?.value;

    const finalTheme = globalTheme || cookieTheme || 'noir';

    const response = NextResponse.json({
      success: true,
      activeTheme: finalTheme,
    });

    response.cookies.set('mezz_public_theme', finalTheme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      httpOnly: false,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ success: true, activeTheme: 'noir' });
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
