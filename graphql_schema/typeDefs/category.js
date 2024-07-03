import gql from "graphql-tag";

export default gql`
  type Category {
    id: ID
    category_name: String
    products: [Product]
    createdAt: DateTime
    updatedAt: DateTime
  }
  extend type Query {
    getCategories: [Category]
  }
  extend type Mutation {
    createCategory(category_name: String): Category
  }
`;
