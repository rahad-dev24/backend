import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getUsers: async (parent, args, { req, res }, info) => {
      const users = await prisma.user.findMany();
      return users;
    },
    User: {
      products: async (parent) => {
        const products = await prisma.user.findMany({
          where: {
            id: parent.id,
          },
          include: {
            products: true,
          },
        });
        return products;
      },
    },
  },
};
