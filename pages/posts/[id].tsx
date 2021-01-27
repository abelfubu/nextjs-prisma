import { server } from 'config/server'
import { GetStaticPaths, GetStaticProps } from 'next'

const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/api/posts/`)
  const posts = await res.json()
  return { paths: posts.map(post => ({ params: { id: post.id.toString() } })), fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/api/posts/${params.id}`)
  const post = await res.json()
  return { props: { post } }
}

export default Post
