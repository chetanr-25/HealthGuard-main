import { NextRequest, NextResponse } from 'next/server'
import { seedDemoData } from '@/scripts/seed-demo-data'

export async function POST(request: NextRequest) {
  try {
    // Only allow in development or with special key
    const authHeader = request.headers.get('authorization')
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    if (!isDevelopment && authHeader !== `Bearer ${process.env.DEMO_SEED_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await seedDemoData()
    
    return NextResponse.json({
      success: true,
      message: 'Demo data seeded successfully',
      data: result
    })
  } catch (error) {
    console.error('Error seeding demo data:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed demo data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Demo data seeding endpoint',
    usage: 'POST to /api/seed-demo-data to seed demo data',
    note: 'Only available in development or with proper authorization'
  })
}
