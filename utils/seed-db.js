const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const newCake1 = await prisma.cake.create({
    data: {
      name: 'Carrot Cake',
      comment: 'Three layers of moist sponge, walnuts, and freshly grated carrots; spiced with cinnamon, ground ginger and nutmeg.',
      imageUrl: 'images/carrot_cake.jpg',
      yumFactor: 2
    },
  })
  const newCake2 = await prisma.cake.create({
    data: {
      name: 'Vanilla Cake',
      comment: 'You can’t get more classic than this – layers of light, moist yellow vanilla sponge, with plenty of vanilla or chocolate buttercream frosting.',
      imageUrl: 'images/vanilla_cake.jpg',
      yumFactor: 3
    },
  })
  const newCake3 = await prisma.cake.create({
    data: {
      name: 'Red Velvet Cake',
      comment: "An all-time favourite! Deep red vanilla cake with a light taste of chocolate, topped with cream cheese frosting. This decadent layer cake is sure to please.",
      imageUrl: 'images/red_velvet_cake.jpg',
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