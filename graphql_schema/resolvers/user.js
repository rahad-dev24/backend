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
      //saving id to session cookie
      req.session.user = {
        id: user.id,
      };
      return user;
    },
  },
  signIn: async (parent, args, { req, res }, info) => {
    if (!req.session.user) {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (user.password === args.password) {
        req.session.user = {
          id: user.id,
        };
        req.session.user = {
          id: user.id,
        };
        return user;
      }
    }
    //else redirect to dashboard
  },
  signOut: async (parent, args, { req, res }, info) => {
    req.session.destroy();
    return true;
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
