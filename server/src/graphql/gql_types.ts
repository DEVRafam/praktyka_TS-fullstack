import { gql } from "apollo-server-express";
//
export default gql`
    type User {
        id: ID!
        name: String!
        surname: String!
        email: String!
        password: String!
        tokens: String!
        createdAt: String!
        updatedAt: String!
    }
    enum TimeUnit {
        SECONDS
        MINUTES
        HOURS
    }
    type Movie {
        id: ID!
        title: String!
        duration(mode: TimeUnit = SECONDS): Int!
        director: Director!
    }

    type Director {
        id: ID!
        name: String!
        movies: [Movie!]
    }

    type Query {
        users: [User!]
        user(id: ID!): User
        movies: [Movie!]
        movie(id: Int!): Movie
        directors: [Director!]
    }

    input AddUser {
        name: String!
        surname: String!
        email: String!
        password: String!
    }

    type Mutation {
        addUser(user: AddUser): Int
    }
`;
