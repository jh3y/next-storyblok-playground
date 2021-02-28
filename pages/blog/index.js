import Head from 'next/head'
import Layout from '@components/layout'
import Storyblok from '@utils/storyblok'
import useStoryblok from '@hooks/storyblok'
import Dynamic from '@components/dynamic'

export default function Blog({ story, preview }) {
  // One-liner to initiate the script. Should this only happen in preview mode?
  // Or does it get ignored?
  story = useStoryblok(story, preview)
  console.info(story.name)
  return (
    <Layout>
      <h1 className="text-xl text-blue-500 font-bold">{story && story.name}</h1>
      { story ? story.content.body.filter(blok => blok.component !== 'seo').map((blok) => (
        <Dynamic blok={blok} key={blok._uid}/>
      )) : null }
    </Layout>
  )
}

export async function getStaticProps(context) {
  let slug = 'writing'
  // Would it be better to base this on process.env.NODE_ENV too?
  // This gets around having to set self signed certificates or set flags in chrome.
  const draft = process.env.NODE_ENV === 'development' || context.preview
  // const draft = context.preview
  let params = {
    version: draft ? 'draft' : 'published',
    ...(context.preview && { cv: Date.now() }),
  }

  const { data } = await Storyblok.get(`cdn/stories/${slug}`, params)

  // NOTE:: Also need to set the draft variable here instead of using context
  return {
    props: {
      story: data ? data.story : false,
      preview: draft || false,
    },
    revalidate: 10,
  }
}
