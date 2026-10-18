import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { OpenInOctree } from '@/components/OpenInOctree'
import { findFirstLatexCodeBlock } from '@/utilities/findLatexCodeBlock'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blogs' ? `/blog/${slug}` : `/${slug}`
}

/** When set, an "Open in Octree" box is rendered under the first LaTeX code block. */
export type RichTextOpenInOctree = {
  title: string
  source: string
}

const createConverters = (
  cta: RichTextOpenInOctree | undefined,
  ctaNode: unknown,
): JSXConvertersFunction<NodeTypes> => {
  return ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }) => {
        if (cta && node === ctaNode) {
          return (
            <div className="col-start-2">
              <CodeBlock {...node.fields} />
              <OpenInOctree latex={node.fields.code} title={cta.title} source={cta.source} />
            </div>
          )
        }
        return <CodeBlock className="col-start-2" {...node.fields} />
      },
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    },
  })
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  openInOctree?: RichTextOpenInOctree
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, openInOctree, ...rest } = props
  const ctaNode = openInOctree ? findFirstLatexCodeBlock(rest.data)?.node : undefined
  return (
    <ConvertRichText
      converters={createConverters(openInOctree, ctaNode)}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
