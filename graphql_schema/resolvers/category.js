import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getCategories: async (parent, args, { req, res }, info) => {
      const categories = await prisma.category.findMany();
      return categories;
    },
  },
  Mutation: {
    createCategory: async (parent, args, { req, res }, info) => {
      const category = await prisma.category.create({
        data: {
          category_name: args.category_name,
        },
      });
      return category;
    },
  },
};
