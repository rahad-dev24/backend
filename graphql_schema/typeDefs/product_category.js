import gql from "graphql-tag";

export default gql`
  type Product_category {
    product_id: ID
    category_id: ID
    product: Product
    category: Category
  }
  extend type Query {
    getProducts_by_category(category_id: ID): [Product_category]
  }
  extend type Mutation {
    createProduct_category(product_id: ID, category_id: ID): Product_category
  }
`;
