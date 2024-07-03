
import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getProductRentalHistoryByLenterId: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const rentalHistory = await prisma.product_rental_history.findMany({
        where: {
          lenter_id: req.session.userId,
        },
        include: {
          product: true,
        },
      });
      return rentalHistory;
    },
    getProductRentalHistoryByProductId: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const rentalHistory = await prisma.product_rental_history.findMany({
        where: {
          product_id: args.product_id,
        },
      });
      return rentalHistory;
    },
    getProductRentalHistoryByBorrowerId: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const rentalHistory = await prisma.product_rental_history.findMany({
        where: {
          borrower_id: req.session.userId,
        },
        include: {
          product: true,
        },
      });
      return rentalHistory;
    },
  },
  Mutation: {
    createProductRentalHistory: async (parent, args, { req, res }, info) => {
      const rentalHistory = await prisma.product_rental_history.create({
        data: {
          product_id: args.product_id,
          lenter_id: args.lenter_id,
          borrower_id: req.session.userId,
          rented_price: args.rented_price,
          rentedAt: args.rentedAt,
          returnedAt: args.returnedAt,
        },
        include: {
          product: true,
        },
      });
      return rentalHistory;
    },
    updateProductRentalHistory: async (parent, args, { req, res }, info) => {
      const rentalHistory = await prisma.product_rental_history.update({
        where: {
          id: args.id,
        },
        data: {
          product_id: args.product_id,
          lenter_id: args.lenter_id,
          borrower_id: req.session.userId,
          rented_price: args.rented_price,
          rentedAt: args.rentedAt,
          returnedAt: args.returnedAt,
        },
      });
      return rentalHistory;
    },
  },
};
