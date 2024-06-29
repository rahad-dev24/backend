import gql from "graphql-tag";

export default gql`
  type Category {
    id: ID
    category_name: String
    product_category: [Product_category]
    created_at: DateTime
    updated_at: DateTime
  }
  extend type Query {
    getCategories: [Category]
  }
  extend type Mutation {
    createCategory(category_name: String): Category
  }
`;
