import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, comment, imageUrl, yumFactor } = req.body
  const result = await prisma.cake.create({
    data: { name, comment, imageUrl,
      yumFactor: Number(yumFactor),
    }
  })
  res.json(result)
} 
