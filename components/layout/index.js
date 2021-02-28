import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <div className="bg-blue-100 min-h-screen">
      <Head>
        <title>Storyblok Playground</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className="text-center">
        {children}
      </main>
      <footer className="text-center p-4">
        Put together by <a href="https://twitter.com/jh3yy" rel="noopener noreferrer" target="_blank">jh3y ʕ •ᴥ•ʔ</a>
      </footer>
    </div>
  )
}

export default Layout