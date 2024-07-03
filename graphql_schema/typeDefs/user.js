import gql from "graphql-tag";

export default gql`
  type User {
    id: ID
    first_name: String
    last_name: String
    phone: String
    email: String
    address: String
    password: String
    createdAt: DateTime
    updatedAt: DateTime
    products: [Product]
  }
  extend type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }
  extend type Mutation {
    createUser(
      first_name: String
      last_name: String
      phone: String
      email: String
      address: String
      password: String
    ): User
    signIn(email: String, password: String): User
    signOut: Boolean
  }
`;
