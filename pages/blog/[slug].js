import Layout from '@components/layout'
import Storyblok from '@utils/storyblok'
import useStoryblok from '@hooks/storyblok'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import SbEditable from 'storyblok-react'

const MagicText = ({ children }) => (
  <h2 className="text-3xl m-8 font-bold">
    {children.split('').map((letter, idx) => (
      <span
        className="text-hue animate-wave inline-block"
        key={idx}
        style={{ '--hue': (360 / children.length) * idx, '--index': idx }}>
        {letter}
      </span>
    ))}
  </h2>
)

const components = {
  MagicText,
}

export default function BlogPost({ story, preview, content }) {
  // One-liner to initiate the script. Should this only happen in preview mode?
  // Or does it get ignored?
  story = useStoryblok(story, preview)
  const hydrated = hydrate(content, { components })
  return (
    <Layout>
      <h1 className="text-xl text-blue-500 font-bold">{story && story.name}</h1>
      <SbEditable content={story.content}>
        <article>{hydrated}</article>
      </SbEditable>
    </Layout>
  )
}

export async function getStaticProps(context) {
  let slug = context.params.slug
  // Would it be better to base this on process.env.NODE_ENV too?
  // This gets around having to set self signed certificates or set flags in chrome.
  const draft = process.env.NODE_ENV === 'development' || context.preview
  // const draft = context.preview

  let params = {
    version: draft ? 'draft' : 'published',
    ...(context.preview && { cv: Date.now() }),
  }

  const { data } = await Storyblok.get(`cdn/stories/blog/${slug}`, params)
  // NOTE:: Also need to set the draft variable here instead of using context

  // data.content.long_text is our MDX content
  // Here we can populate the MDX content for certain blocks in the story.
  const mdxContent = await renderToString(data.story.content.long_text, {
    components,
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  })

  return {
    props: {
      story: data ? data.story : false,
      content: mdxContent,
      preview: draft || false,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  let { data } = await Storyblok.get('cdn/links/?starts_with=blog', {})

  let paths = []
  Object.keys(data.links).forEach((linkKey) => {
    if (!data.links[linkKey].is_folder) {
      const slug = data.links[linkKey].slug
      paths.push({ params: { slug: slug.substring(slug.indexOf('/') + 1) } })
    }
  })

  return {
    paths,
    fallback: false,
  }
}
