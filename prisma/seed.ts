import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.category.createMany({
    data: [
      {
        category_name: "ELECTRONICS",
      },

      {
        category_name: "FURNITURE",
      },

      {
        category_name: "HOME APPLIANCES",
      },

      {
        category_name: "SPORTING GOOD",
      },

      {
        category_name: "OUTDOOR",
      },

      {
        category_name: "TOYS",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
