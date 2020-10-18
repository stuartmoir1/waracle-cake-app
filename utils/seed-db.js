const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const newCake1 = await prisma.cake.create({
    data: {
      name: 'Carrot Cake',
      comment: 'Three layers of moist sponge, walnuts, and freshly grated carrots; spiced with cinnamon, ground ginger and nutmeg.',
      imageUrl: 'images/carrot_cake_1024x1024.jpg',
      yumFactor: 2
    },
  })
  const newCake2 = await prisma.cake.create({
    data: {
      name: 'Vanilla Cake',
      comment: 'You can’t get more classic than this – layers of light, moist yellow vanilla sponge, with plenty of vanilla or chocolate buttercream frosting.',
      imageUrl: 'images/vanilla_cake_1024x1024.jpg',
      yumFactor: 3
    },
  })
  const newCake3 = await prisma.cake.create({
    data: {
      name: 'Vegan Red Velvet Cake',
      comment: 'Going vegan doesn’t mean going without, especially not where our bestselling cake is concerned.',
      imageUrl: 'images/vegan_red_velvet_cake_1024x1024.jpg',
      yumFactor: 4
    },
  })

  const allCakes = await prisma.cake.findMany()
  console.log(allCakes)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })