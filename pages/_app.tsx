import Head from 'next/head'
import NavLink from '../components/NavLink'
import '../styles/globals.css'
import { AppProps } from 'next/app'

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
          </nav>
          <main>
            <Component {...pageProps} />
          </main>
          <label htmlFor="darkmode">Toggle darkmode</label>
        </div>
      </div>
    </>
  )
}

export default App
