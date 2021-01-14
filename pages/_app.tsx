import Head from 'next/head'
import NavLink from '../components/NavLink'
import '../styles/globals.css'
import { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'

const components = {
  code: (props: React.PropsWithChildren<{}>) => (
    <code>
      <blockquote {...props} />
    </code>
  ),
  inlineCode: (props: React.PropsWithChildren<{}>) => (
    <code className="inline" {...props} />
  ),
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Joel Nordström's personal website</title>
      </Head>
      <input id="darkmode" type="checkbox" />
      <div className="background">
        <div className="column">
          <nav>
            <NavLink href="/">Start</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <label htmlFor="darkmode">Darkmode</label>
          </nav>
          <main>
            <MDXProvider components={components}>
              <Component {...pageProps} />
            </MDXProvider>
          </main>
          <footer />
        </div>
      </div>
    </>
  )
}

export default App
