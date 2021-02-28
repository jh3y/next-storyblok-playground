import SbEditable from 'storyblok-react'

const Teaser = ({ blok }) => {
  return <h1 className="text-2xl">{blok.headline}</h1>
}

// resolve Storyblok components to Next.js components
const Components = {
  teaser: Teaser,
}

const Dynamic = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    // wrap with SbEditable for visual editing
    console.info(blok)
    return (
      <SbEditable content={blok}>
        <Component blok={blok} />
      </SbEditable>
    )
  }

  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  )
}

export default Dynamic
