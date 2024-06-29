import gql from "graphql-tag";

export default gql`
  scalar DateTime

  type Query {
    _root: String
  }

  type Mutation {
    _root: String
  }
`;
