import { NextResponse } from 'next/server'

interface UserPreferences {
  language: string
  currency: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  preferences: UserPreferences
}

interface UserProfiles {
  [key: string]: UserProfile
}

// This is a mock user profile data store
// In a real application, this would be stored in a database
let userProfiles: UserProfiles = {
  'john.doe@example.com': {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    preferences: {
      language: 'English',
      currency: 'USD',
      timezone: '(UTC-05:00) Eastern Time',
      notifications: {
        email: true,
        push: true,
        sms: false
      }
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const profile = userProfiles[email]
  
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  return NextResponse.json(profile)
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { email, ...updateData } = body as { email: string } & Partial<UserProfile>

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!userProfiles[email]) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Update the profile
    userProfiles[email] = {
      ...userProfiles[email],
      ...updateData
    }

    return NextResponse.json(userProfiles[email])
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { email, field, value } = body as { email: string; field: string; value: any }

    if (!email || !field) {
      return NextResponse.json({ error: 'Email and field are required' }, { status: 400 })
    }

    if (!userProfiles[email]) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Handle nested fields (e.g., preferences.language)
    const fields = field.split('.')
    let current: any = userProfiles[email]
    
    for (let i = 0; i < fields.length - 1; i++) {
      if (!current[fields[i]]) {
        current[fields[i]] = {}
      }
      current = current[fields[i]]
    }
    
    current[fields[fields.length - 1]] = value

    return NextResponse.json(userProfiles[email])
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }
} 