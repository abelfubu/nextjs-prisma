// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'
import superjson from 'superjson'

const handler: NextApiHandler = async ({ method, body: { title, content } }, res) => {
  const prisma = new PrismaClient()
  if (method === 'POST') {
    try {
      const newPost = await prisma.post.create({
        data: { title, content },
      })
      return res.status(201).json(newPost)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Something went wrong saving the post' })
    }
  } else {
    const data = await prisma.post.findMany()
    const posts = data.map(post => superjson.stringify(post))
    return res.status(200).json(posts.map(post => JSON.parse(post).json))
  }
}

export default handler
