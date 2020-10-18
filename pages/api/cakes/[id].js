import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const cake = await prisma.cake.findOne({
    where: { id: Number(req.query.id) }
  })
  res.json(cake)
}
