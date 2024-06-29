import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getProducts_by_category: async (parent, args, { req, res }, info) => {
      const product_category = await prisma.product_category.findMany({
        where: {
          category_id: args.category_id,
        },
      });
      return product_category;
    },
  },
  Mutation: {
    createProduct_category: async (parent, args, { req, res }, info) => {
      const product_category = await prisma.product_category.create({
        data: {
          product_id: args.product_id,
          category_id: args.category_id,
        },
      });
      return product_category;
    },
  },
};
