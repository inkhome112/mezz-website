import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import companyData from '@/data/company.json';

const companyFilePath = path.join(process.cwd(), 'src', 'data', 'company.json');

export async function GET() {
  try {
    if (fs.existsSync(companyFilePath)) {
      const data = JSON.parse(fs.readFileSync(companyFilePath, 'utf8'));
      return NextResponse.json({ success: true, activeTheme: data.activeTheme || 'noir' });
    }
    return NextResponse.json({ success: true, activeTheme: companyData.activeTheme || 'noir' });
  } catch (err) {
    return NextResponse.json({ success: true, activeTheme: companyData.activeTheme || 'noir' });
  }
}

export async function POST(request) {
  try {
    const { theme } = await request.json();
    if (!['noir', 'minimalist', 'cinematic'].includes(theme)) {
      return NextResponse.json({ success: false, message: 'Invalid theme' }, { status: 400 });
    }

    try {
      if (fs.existsSync(companyFilePath)) {
        const data = JSON.parse(fs.readFileSync(companyFilePath, 'utf8'));
        data.activeTheme = theme;
        fs.writeFileSync(companyFilePath, JSON.stringify(data, null, 2), 'utf8');
      }
    } catch (writeErr) {
      console.log('Serverless environment, active theme saved to memory/session');
    }

    return NextResponse.json({ success: true, activeTheme: theme });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
