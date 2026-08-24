import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('mezz_public_theme')?.value;
    return NextResponse.json({
      success: true,
      activeTheme: themeCookie || 'noir',
    });
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

    const response = NextResponse.json({
      success: true,
      activeTheme: theme,
    });

    response.cookies.set('mezz_public_theme', theme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      httpOnly: false,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
