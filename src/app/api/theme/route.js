import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const cookieTheme = cookieStore.get('mezz_public_theme')?.value;

    let defaultTheme = 'noir';
    try {
      const companyPath = path.join(process.cwd(), 'src', 'data', 'company.json');
      if (fs.existsSync(companyPath)) {
        const data = JSON.parse(fs.readFileSync(companyPath, 'utf8'));
        if (data?.activeTheme) defaultTheme = data.activeTheme;
      }
    } catch (e) {}

    const activeTheme = cookieTheme || defaultTheme || 'noir';

    const response = NextResponse.json({
      success: true,
      activeTheme,
    });

    response.cookies.set('mezz_public_theme', activeTheme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
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

    try {
      const companyPath = path.join(process.cwd(), 'src', 'data', 'company.json');
      if (fs.existsSync(companyPath)) {
        const data = JSON.parse(fs.readFileSync(companyPath, 'utf8'));
        data.activeTheme = theme;
        fs.writeFileSync(companyPath, JSON.stringify(data, null, 2), 'utf8');
      }
    } catch (e) {}

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
