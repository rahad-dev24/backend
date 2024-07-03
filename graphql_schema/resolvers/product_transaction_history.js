import prisma from "../../prisma/prisma.js";

export default {
  Query: {
    getProductTransactionHistories: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const productTransactionHistories =
        await prisma.product_transaction_history.findMany();
      return productTransactionHistories;
    },
    getProductTransactionHistoryBySellerId: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const productTransactionHistory =
        await prisma.product_transaction_history.findMany({
          where: {
            seller_id: req.session.userId,
          },
          include: {
            product: true,
          },
        });
      return productTransactionHistory;
    },
    getProductTransactionHistoryByBuyerId: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const productTransactionHistory =
        await prisma.product_transaction_history.findMany({
          where: {
            buyer_id: req.session.userId,
          },
          include: {
            product: true,
          },
        });
      return productTransactionHistory;
    },
    getProductTransactionHistoryByProductId: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const productTransactionHistory =
        await prisma.product_transaction_history.findMany({
          where: {
            product_id: args.product_id,
          },
        });
      return productTransactionHistory;
    },
  },
  Mutation: {
    createProductTransactionHistory: async (
      parent,
      args,
      { req, res },
      info,
    ) => {
      const productTransactionHistory =
        await prisma.product_transaction_history.create({
          data: {
            product_id: args.product_id,
            seller_id: args.seller_id,
            buyer_id: req.session.userId,
          },
        });
      return productTransactionHistory;
    },
  },
};
