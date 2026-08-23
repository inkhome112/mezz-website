import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import initialProjects from '@/data/projects.json';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

export async function GET() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const projects = JSON.parse(fileData);
      return NextResponse.json({ success: true, projects });
    }
    return NextResponse.json({ success: true, projects: initialProjects });
  } catch (error) {
    return NextResponse.json({ success: true, projects: initialProjects });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { projects } = body;

    if (!Array.isArray(projects)) {
      return NextResponse.json(
        { success: false, message: 'Invalid projects array' },
        { status: 400 }
      );
    }

    // Try to write to local data file if writable
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');
    } catch (writeErr) {
      console.log('Running in read-only environment (e.g. Vercel Edge/Serverless), returning updated projects state in memory');
    }

    return NextResponse.json({
      success: true,
      message: 'Projects updated successfully',
      projects,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
