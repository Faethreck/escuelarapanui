import fs from 'fs'
import path from 'path'

export interface Post {
  id: number
  title: string
  author: string
  date: string
  content: string
  excerpt: string
  image?: string
  category?: string
}

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(POSTS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read posts from file
export function getPosts(): Post[] {
  ensureDataDir()
  
  if (!fs.existsSync(POSTS_FILE)) {
    return []
  }

  try {
    const fileContent = fs.readFileSync(POSTS_FILE, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// Get single post by ID
export function getPostById(id: number): Post | null {
  const posts = getPosts()
  return posts.find(post => post.id === id) || null
}

// Save posts to file
export function savePosts(posts: Post[]): void {
  ensureDataDir()
  
  try {
    // Sort by date (newest first)
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    fs.writeFileSync(POSTS_FILE, JSON.stringify(sortedPosts, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving posts:', error)
    throw new Error('Failed to save posts')
  }
}

// Create new post
export function createPost(postData: Omit<Post, 'id'>): Post {
  const posts = getPosts()
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
  
  const newPost: Post = {
    id: newId,
    ...postData,
  }
  
  posts.push(newPost)
  savePosts(posts)
  
  return newPost
}

// Update existing post
export function updatePost(id: number, postData: Partial<Omit<Post, 'id'>>): Post | null {
  const posts = getPosts()
  const index = posts.findIndex(post => post.id === id)
  
  if (index === -1) {
    return null
  }
  
  posts[index] = { ...posts[index], ...postData }
  savePosts(posts)
  
  return posts[index]
}

// Delete post
export function deletePost(id: number): boolean {
  const posts = getPosts()
  const filteredPosts = posts.filter(post => post.id !== id)
  
  if (filteredPosts.length === posts.length) {
    return false // Post not found
  }
  
  savePosts(filteredPosts)
  return true
}
