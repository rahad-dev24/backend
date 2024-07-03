import { Rent_option } from "@prisma/client";
import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getProducts: async (parent, args, { req, res }, info) => {
      const products = await prisma.product.findMany({
        include: {
          categories: true,
        },
      });
      products.forEach((product) => {
        product.createdAt = product.createdAt.toDateString();
      });
      return products;
    },
    getProduct: async (parent, args, { req, res }, info) => {
      const product = await prisma.product.findUnique({
        where: {
          id: args.id,
        },
        include: {
          categories: true,
        },
      });
      return product;
    },
    getProducts_by_user: async (parent, args, { req, res }, info) => {
      if (!req.session.userId) {
        throw new Error("Not authenticated");
      }
      const products = await prisma.product.findMany({
        where: {
          user_id: req.session.userId,
        },
        include: {
          categories: true,
        },
      });
      products.forEach((product) => {
        product.createdAt = product.createdAt.toDateString();
      });
      return products;
    },
  },
  Mutation: {
    createProduct: async (parent, args, { req, res }, info) => {
      const catagories = args.categories.map((category) => {
        return { id: `${category}` };
      });
      const product = await prisma.product.create({
        data: {
          product_name: args.product_name,
          user_id: req.session.userId,
          description: args.description,
          price: args.price,
          rent_price: args.rent_price,
          rent_option: Rent_option[args.rent_option],
          categories: {
            connect: catagories,
          },
        },
        include: {
          categories: true,
        },
      });
      return product;
    },
    updateProduct: async (parent, args, { req, res }, info) => {
      const catagories = args.categories.map((category) => {
        return { id: `${category}` };
      });

      const disconnect = await prisma.product.update({
        where: {
          id: args.id,
        },
        data: {
          categories: {
            set: [],
          },
        },
        include: {
          categories: true,
        },
      });
      if (disconnect) {
        const product = await prisma.product.update({
          where: {
            id: args.id,
          },
          data: {
            product_name: args.product_name,
            description: args.description,
            price: args.price,
            rent_price: args.rent_price,
            rent_option: Rent_option[args.rent_option],
            categories: {
              connect: catagories,
            },
          },
          include: {
            categories: true,
          },
        });
        return product;
      }
    },

    deleteProduct: async (parent, args, { req, res }, info) => {
      const product = await prisma.product.delete({
        where: {
          id: args.id,
        },
      });
      if (product) return true;
      return false;
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
  },
};
