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
    created_at: DateTime
    updated_at: DateTime
    User: User
    product_category: [Product_category]
  }
  extend type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  extend type Mutation {
    createProduct(
      product_name: String
      user_id: ID
      description: String
      price: Float
      rent_price: Float
      rent_option: String
      product_category: [String]
    ): Product
  }
`;
