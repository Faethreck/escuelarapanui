import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/middleware'

export async function GET(request: NextRequest) {
  const authenticated = isAuthenticated(request)
  
  if (authenticated) {
    return NextResponse.json({ authenticated: true })
  }
  
  return NextResponse.json(
    { authenticated: false },
    { status: 401 }
  )
}
