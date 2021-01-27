// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'
import superjson from 'superjson'

const handler: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient()
  const data = await prisma.post.findMany()
  const posts = data.map(post => superjson.stringify(post))
  return res.status(200).json(posts.map(post => JSON.parse(post).json))
}

export default handler
