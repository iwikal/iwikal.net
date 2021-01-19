import Head from 'next/head'
import NavLink from '../components/NavLink'
import '../styles/globals.css'
import '../styles/syntax.css'
import { AppProps } from 'next/app'
import { MDXProvider } from '@mdx-js/react'

function Date({ iso }: { iso: string }) {
  return <time dateTime={iso}>{iso}</time>
}

const components = {
  Date,
  pre: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
  ) => <pre {...props} className={[props.className, 'codeblock'].join(' ')} />,
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
