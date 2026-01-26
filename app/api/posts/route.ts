import { NextRequest, NextResponse } from 'next/server'
import { getPosts, createPost } from '@/lib/posts'
import { requireAuth } from '@/lib/middleware'

// GET - Get all posts (public)
export async function GET() {
  try {
    const posts = getPosts()
    return NextResponse.json(posts)
  } catch (error: any) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST - Create new post (protected)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const auth = requireAuth(request)
    if (!auth.authenticated) {
      return NextResponse.json(
        { error: auth.error || 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, author, date, content, excerpt, image, category } = body

    // Validation
    if (!title || !author || !date || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, author, date, content' },
        { status: 400 }
      )
    }

    // Create excerpt if not provided
    const postExcerpt = excerpt || content.substring(0, 200) + '...'

    const newPost = createPost({
      title,
      author,
      date,
      content,
      excerpt: postExcerpt,
      image: image || undefined,
      category: category || undefined,
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error: any) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    )
  }
}
