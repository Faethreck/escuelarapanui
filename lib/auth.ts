import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Verify a password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Verify admin password from environment variable
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD environment variable not set')
  }
  
  // If password is already hashed in env, compare directly
  // Otherwise, hash the provided password and compare
  if (ADMIN_PASSWORD_HASH) {
    return verifyPassword(password, ADMIN_PASSWORD_HASH)
  } else {
    // For simplicity, allow plain text password in development
    // In production, always use hashed password
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_PASSWORD_HASH must be set in production')
    }
    return password === adminPassword
  }
}

// Generate JWT token
export function generateToken(): string {
  return jwt.sign(
    { admin: true, timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

// Verify JWT token
export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

// Get token payload
export function getTokenPayload(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
