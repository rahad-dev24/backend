import gql from "graphql-tag";

export default gql`
  type ProductRentalHistory {
    id: ID
    product_id: String

    lenter_id: String
    borrower_id: String
    rented_price: Float
    rentedAt: DateTime
    returnedAt: DateTime
    product: Product
  }
  extend type Query {
    getProductRentalHistories: [ProductRentalHistory]
    getProductRentalHistoryByProductId(product_id: ID!): [ProductRentalHistory]
    getProductRentalHistoryByLenterId: [ProductRentalHistory]
    getProductRentalHistoryByBorrowerId: [ProductRentalHistory]
  }

  extend type Mutation {
    createProductRentalHistory(
      product_id: String
      lenter_id: String
      rented_price: Float
      rentedAt: DateTime
      returnedAt: DateTime
    ): ProductRentalHistory
    updateProductRentalHistory(
      id: ID!
      product_id: String
      lenter_id: String
      rented_price: Float
      rentedAt: DateTime
      returnedAt: DateTime
    ): ProductRentalHistory
  }
`;
