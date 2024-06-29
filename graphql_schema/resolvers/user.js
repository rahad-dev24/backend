import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getUsers: async (parent, args, { req, res }, info) => {
      const users = await prisma.user.findMany();
      return users;
    },
    getUser: async (parent, args, { req, res }, info) => {
      const user = await prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
      return user;
    },
  },
  Mutation: {
    createUser: async (parent, args, { req, res }, info) => {
      //todo: hash password
      const user = await prisma.user.create({
        data: {
          first_name: args.first_name,
          last_name: args.last_name,
          phone: args.phone,
          email: args.email,
          address: args.address,
          password: args.password,
        },
      });
      return user;
    },
  },
  User: {
    products: async (parent) => {
      const products = await prisma.product.findMany({
        where: {
          user_id: parent.id,
        },
      });
      return products;
    },
  },
};
