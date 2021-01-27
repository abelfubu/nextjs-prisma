import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'
import superjson from 'superjson'

const handler: NextApiHandler = async ({ query }, res) => {
  const prisma = new PrismaClient()
  const data = await prisma.post.findUnique({
    where: { id: Number(query.id) },
  })
  if (!data) return res.status(200).json({ message: `Post with id: ${query.id} doesn't exist` })
  const post = superjson.stringify(data)
  return res.status(200).json(JSON.parse(post).json)
}

export default handler
