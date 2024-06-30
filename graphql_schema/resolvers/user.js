import { createLanguageService } from "typescript";
import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getUsers: async (parent, args, { req, res }, info) => {
      const users = await prisma.user.findMany();
      return users;
    },
    getUser: async (parent, args, { req, res }, info) => {
      if (!req.session.userId) {
        throw new Error("Not authenticated");
      }
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
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
      req.session.userId = user.id;

      return user;
    },
    signIn: async (parent, args, { req, res }, info) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      //todo: remove extra if in prod
      if (!user) throw new Error("Email does not exist");
      if (user.password === args.password) {
        //saving id to session cookie
        req.session.userId = user.id;
        return user;
      } else throw new Error("Invalid credentials");
    },
    signOut: async (parent, args, { req, res }, info) => {
      req.session.destroy();
      return true;
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
