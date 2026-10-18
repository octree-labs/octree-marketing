'use client'

import React, { useEffect } from 'react'
import posthog from 'posthog-js'

import { Button } from '@/components/ui/button'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (posthog.__loaded) posthog.captureException(error)
  }, [error])

  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>Something went wrong</h1>
        <p className="mb-4">An unexpected error occurred.</p>
      </div>
      <Button variant="default" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
