import { NextRequest } from 'next/server'
import { verifyToken } from './auth'

export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('admin-token')?.value
  
  if (!token) {
    return false
  }
  
  return verifyToken(token)
}

export function requireAuth(request: NextRequest): { authenticated: boolean; error?: string } {
  if (!isAuthenticated(request)) {
    return {
      authenticated: false,
      error: 'Unauthorized',
    }
  }
  
  return { authenticated: true }
}
