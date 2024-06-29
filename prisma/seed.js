import { PrismaClient } from "@prisma/client";
import { create } from "domain";
const prisma = new PrismaClient();
async function main() {
  const product = await prisma.product.create({
    data: {
      product_name: "product12wwww",
      price: 1000,
      rent_price: 100,
      description: "descriptionwwwwwwwww",
      user_id: "clxys8wh40000147i9kxa5aj2",
      category: {
        create: [
          {
            category_id: "clxybn62d000059yp8ysskgiy",
          },
          {
            category_id: "clxybn62d000159ypqqzkz8oq",
          },
        ],
      },
    },
  });
}
//  await prisma.category.createMany({
//    data: [
//      {
//        category_name: "ELECTRONICS",
//      },
//
//      {
//        category_name: "FURNITURE",
//      },
//
//      {
//        category_name: "HOME APPLIANCES",
//      },
//
//      {
//        category_name: "SPORTING GOOD",
//      },
//
//      {
//        category_name: "OUTDOOR",
//      },
//
//      {
//        category_name: "TOYS",
//      },
//    ],
//  });

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
