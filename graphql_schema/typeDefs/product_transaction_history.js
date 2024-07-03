import gql from "graphql-tag";

export default gql`
  type ProductTransactionHistory {
    id: ID
    product_id: String
    seller_id: String
    buyer_id: String
    product: Product
    createdAt: DateTime
  }
  extend type Query {
    getProductTransactionHistories: [ProductTransactionHistory]
    getProductTransactionHistoryByProductId(
      product_id: ID!
    ): [ProductTransactionHistory]
    getProductTransactionHistoryBySellerId: [ProductTransactionHistory]
    getProductTransactionHistoryByBuyerId: [ProductTransactionHistory]
  }
  extend type Mutation {
    createProductTransactionHistory(
      product_id: String
      seller_id: String
      buyer_id: String
    ): ProductTransactionHistory
  }
`;
