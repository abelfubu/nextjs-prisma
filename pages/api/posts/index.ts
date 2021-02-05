// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'
import superjson from 'superjson'

const handler: NextApiHandler = async ({ method, body: { title, content } }, res) => {
  const prisma = new PrismaClient({ log: ['query'] })
  if (method === 'POST') {
    try {
      const newPost = await prisma.post.create({ data: { title, content } })
      res.status(201).json(newPost)
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong saving the post' })
    } finally {
      await prisma.$disconnect()
    }
  } else if (method === 'GET') {
    const data = await prisma.post.findMany()
    const posts = data.map(post => superjson.stringify(post))
    return res.status(200).json(posts.map(post => JSON.parse(post).json))
  }
}

export default handler
