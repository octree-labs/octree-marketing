import { buildLlmsFullTxt, textResponse } from '@/utilities/llmsDiscovery'

// Built at deploy time and refreshed daily so new guides and posts appear.
export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  return textResponse(await buildLlmsFullTxt())
}
