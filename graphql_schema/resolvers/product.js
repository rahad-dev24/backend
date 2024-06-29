import { create } from "domain";
import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getProducts: async (parent, args, { req, res }, info) => {
      const products = await prisma.product.findMany();
      console.log(products);
      return products;
    },
    getProduct: async (parent, args, { req, res }, info) => {
      const product = await prisma.product.findUnique({
        where: {
          id: args.id,
        },
      });
      return product;
    },
  },
  Mutation: {
    createProduct: async (parent, args, { req, res }, info) => {
      const catagories = args.product_category.map((category) => {
        return { category_id: `${category}` };
      });
      console.log(catagories);
      const product = await prisma.product.create({
        data: {
          product_name: args.product_name,
          user_id: args.user_id,
          description: args.description,
          price: args.price,
          rent_price: args.rent_price,
          rent_option: args.rent_option,
          product_category: {
            create: catagories,
          },
        },
      });
      return product;
    },
  },
  Product: {
    User: async (parent) => {
      const user = await prisma.user.findUnique({
        where: {
          id: parent.user_id,
        },
      });
      return user;
    },
    product_category: async (parent) => {
      const product_category = await prisma.product_category.findMany({
        where: {
          product_id: parent.id,
        },
      });
      return product_category;
    },
  },
};
