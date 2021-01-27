import { server } from 'config/server'
import { ChangeEvent, FormEvent, useState } from 'react'
import Router from 'next/router'

interface newPost {
  title: string
  content: string
}

const PostForm = () => {
  const [{ title, content }, setPost] = useState<newPost>({ title: '', content: '' })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title || !content) return
    try {
      const res = await fetch(`${server}/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      })
      return res.status === 201 && Router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setPost(prevState => ({ ...prevState, [name]: value }))
    console.log({ title, content })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' onChange={handleChange} />
      <input type='text' name='content' onChange={handleChange} />
      <input type='submit' value='Save' />
    </form>
  )
}

export default PostForm
