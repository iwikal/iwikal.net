import { GetStaticPropsResult } from 'next'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

interface Post {
  date: string
  slug: string
  title: string
}

interface BlogProps {
  posts: Post[]
}

function PostItem(props: Post) {
  return (
    <div className="post">
      <time dateTime={props.date}>{props.date}</time>
      {' '}
      <Link href={`/blog/${props.slug}`}>{props.title}</Link>
    </div>
  )
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <h1>A blog about my occasional forays into userland and webspace.</h1>
      <div className="posts-list">
        {posts.map((post) => <PostItem key={post.slug} {...post} />)}
      </div>
    </>
  )
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<BlogProps>
> {
  const postsDir = path.join(process.cwd(), 'pages/blog')
  const filenames = await promisify(fs.readdir)(postsDir)

  const readfile = promisify(fs.readFile)

  async function postFromName(filename: string): Promise<Post> {
    const file = path.join(postsDir, filename)

    const contents = await readfile(file, 'utf8')

    if (!contents) {
      throw new Error('empty blog post')
    }

    const [head, ...tail] = contents.split('\n')
    const [date] = head.match(/\d\d\d\d-\d\d-\d\d/)
    if (!date) {
      throw new Error('first line must be a date')
    }

    const matches = tail.find((line) => line.match(/#[^#]/))
    if (!matches) {
      throw new Error('no title')
    }

    const title = matches.slice(1).trim()

    return {
      date,
      title,
      slug: filename.replace('.mdx', ''),
    }
  }

  const posts = await Promise.all(filenames.map(postFromName))
  posts.sort((a, b) => b.date.localeCompare(a.date))

  return { props: { posts } }
}
