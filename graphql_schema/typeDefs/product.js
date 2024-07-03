import gql from "graphql-tag";

export default gql`
  type Product {
    id: ID
    product_name: String
    user_id: ID
    description: String
    price: Float
    rent_price: Float
    rent_option: String
    createdAt: DateTime
    updatedAt: DateTime
    User: User
    categories: [Category]
  }
  extend type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getProducts_by_user(user_id: ID!): [Product]
  }

  extend type Mutation {
    createProduct(
      product_name: String
      user_id: ID
      description: String
      price: Float
      rent_price: Float
      rent_option: String
      categories: [String]
    ): Product
    updateProduct(
      id: ID!
      product_name: String
      description: String
      price: Float
      rent_price: Float
      rent_option: String
      categories: [String]
    ): Product
    deleteProduct(id: ID!): Boolean
  }
`;
