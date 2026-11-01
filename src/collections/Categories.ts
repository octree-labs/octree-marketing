import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { revalidateBlogIndex } from './Blogs/hooks/revalidatePost'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    // Category titles render on the blog index cards.
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) revalidateBlogIndex()
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { context } }) => {
        if (!context.disableRevalidate) revalidateBlogIndex()
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
