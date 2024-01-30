import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      email
    }
  }
`;