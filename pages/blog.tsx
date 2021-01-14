import { GetStaticPropsResult } from 'next'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import simpleGit from 'simple-git'
import Link from 'next/link'

interface Post {
  date: string
  slug: string
  title: string
}

interface BlogProps {
  posts: Post[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <h1>A blog about my occasional forays into userland and webspace.</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {`${post.date.replace(/T.*/, '')} ${post.title}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const git = simpleGit()
  const postsDir = path.join(process.cwd(), 'pages/blog')
  const filenames = await promisify(fs.readdir)(postsDir)

  const readfile = promisify(fs.readFile)

  async function postFromName(filename: string): Promise<Post> {
    const file = path.join(postsDir, filename)
    const datePromise = git.log({ file }).then((log) => {
      switch (log.total) {
        case 0:
          return new Date().toISOString()
        default:
          return new Date(log.all[log.total - 1].date).toISOString()
      }
    })

    const titlePromise = readfile(file, 'utf8').then((contents) => {
      if (!contents) return 'This post is empty'

      const lines = contents.split('\n')
      const matches = lines.find((line) => line.match(/#[^#]/))
      return matches.slice(1).trim()
    })

    return {
      date: await datePromise,
      slug: filename.replace('.mdx', ''),
      title: await titlePromise,
    }
  }

  const posts = await Promise.all(filenames.map(postFromName))
  posts.sort((a, b) => b.date.localeCompare(a.date))

  return { props: { posts } }
}
