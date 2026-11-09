import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return request.headers.get('authorization') === `Bearer ${secret}`
}

export async function POST(request: NextRequest) {
  // Same bearer check as GET: without it anyone could purge the ISR cache
  // (and make every page re-render against the database) at will.
  if (!process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const { paths = [], tags = [] } = body

    const results = {
      pathsRevalidated: [] as string[],
      tagsRevalidated: [] as string[],
    }

    // Revalidate specific paths if provided
    if (paths.length > 0) {
      for (const path of paths) {
        try {
          revalidatePath(path)
          results.pathsRevalidated.push(path)
        } catch (error) {
          console.error(`Failed to revalidate path: ${path}`, error)
        }
      }
    } else {
      // Revalidate common paths
      const commonPaths = ['/', '/blog', '/about', '/search', '/use-cases']
      for (const path of commonPaths) {
        try {
          revalidatePath(path)
          results.pathsRevalidated.push(path)
        } catch (error) {
          console.error(`Failed to revalidate path: ${path}`, error)
        }
      }
    }

    // Revalidate specific tags if provided
    if (tags.length > 0) {
      for (const tag of tags) {
        try {
          revalidateTag(tag)
          results.tagsRevalidated.push(tag)
        } catch (error) {
          console.error(`Failed to revalidate tag: ${tag}`, error)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      ...results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Cache clear error:', error)
    return NextResponse.json(
      {
        error: 'Failed to clear cache',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Also support GET for simple health check
export async function GET(request: NextRequest) {
  if (!process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    status: 'ready',
    message: 'Cache clear endpoint is available. Use POST to clear cache.',
  })
}
