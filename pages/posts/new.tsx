import { server } from 'config/server'
import { ChangeEvent, FormEvent, useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    ['bold', 'italic'],
    ['link', 'blockquote', 'code', 'image'],
    [
      {
        list: 'ordered',
      },
      {
        list: 'bullet',
      },
    ],
  ],
}

const PostForm = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('Welcome!')

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

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' onChange={event => setTitle(event.target.value)} />
      <ReactQuill
        value={content}
        onChange={text => setContent(text)}
        theme='snow'
        modules={modules}
      />
      <input type='submit' value='Save' />
    </form>
  )
}

export default PostForm
