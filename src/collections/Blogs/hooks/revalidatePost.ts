import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Blog } from '../../../payload-types'

/**
 * The blog index (/blog) and its paginated pages (/blog/page/N) are static with
 * a 1-day ISR window, so refresh them whenever a post is published, unpublished
 * or deleted rather than polling the database on a short timer.
 */
export const revalidateBlogIndex = () => {
  revalidatePath('/blog')
  revalidatePath('/blog/page/[pageNumber]', 'page')
}

export const revalidateBlog: CollectionAfterChangeHook<Blog> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/blog/${doc.slug}`

      payload.logger.info(`Revalidating blog at path: ${path}`)

      revalidatePath(path)
      revalidateTag('blogs-sitemap')
      revalidateBlogIndex()
    }

    // If the blog was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/blog/${previousDoc.slug}`

      payload.logger.info(`Revalidating old blog at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('blogs-sitemap')
      revalidateBlogIndex()
    }
  }
  return doc
}

export const revalidateDeleteBlog: CollectionAfterDeleteHook<Blog> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('blogs-sitemap')
    revalidateBlogIndex()
  }

  return doc
}
