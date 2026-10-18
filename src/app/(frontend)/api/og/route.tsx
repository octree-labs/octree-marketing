import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const WIDTH = 1200
const HEIGHT = 630
const MAX_TITLE_LENGTH = 90
const MAX_EYEBROW_LENGTH = 40
const DEFAULT_TITLE = 'Learn LaTeX'
const DEFAULT_EYEBROW = 'Learn LaTeX'

const clamp = (value: string | null, max: number, fallback: string): string => {
  const clean = (value ?? '').replace(/\s+/g, ' ').trim()
  if (!clean) return fallback
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

/**
 * Dynamic Open Graph card: GET /api/og?title=...&eyebrow=...
 * 1200x630, light blue gradient matching the site's hero sections.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = clamp(searchParams.get('title'), MAX_TITLE_LENGTH, DEFAULT_TITLE)
  const eyebrow = clamp(searchParams.get('eyebrow'), MAX_EYEBROW_LENGTH, DEFAULT_EYEBROW)

  // Each word is its own flex item so the title wraps word by word (Satori
  // lays out sibling text nodes as separate items, not as one inline run).
  const words = title.split(' ')
  const fontSize = title.length > 60 ? 56 : title.length > 40 ? 64 : 76

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #f6f8ff 0%, #e4ecff 100%)',
          color: '#0f172a',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#3b82f6',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: '#3b82f6',
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: Math.round(fontSize * 0.26),
            fontSize,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            maxWidth: 1040,
          }}
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`} style={index === 0 ? { color: '#3b82f6' } : undefined}>
              {word}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 600,
            color: '#475569',
          }}
        >
          useoctree.com
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  )
}
