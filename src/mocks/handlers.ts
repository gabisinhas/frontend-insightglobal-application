import { gql } from 'graphql-tag';
import { ApolloServer } from '@apollo/server';

const typeDefs = gql`
  type Car {
    id: ID!
    name: String!
    brand: String!
  }

  type Query {
    cars: [Car!]!
  }
`;

// Resolvers para os dados mockados
const resolvers = {
  Query: {
    cars: () => [
      { id: '1', name: 'Carro 1', brand: 'Marca A' },
      { id: '2', name: 'Carro 2', brand: 'Marca B' },
    ],
  },
};

// Configuração do servidor Apollo para mocks
export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

