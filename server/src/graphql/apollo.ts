import { ApolloServer } from "apollo-server-express";
import { Application } from "express";
import typeDefs from "./gql_types";
import UserController from "../controllers/UserController";
//
type Movie = {
    id: number;
    title: string;
    duration: number;
    director_id: number;
};
const moviesList: Movie[] = [
    { id: 1, title: "Peaceful Warrior", duration: 3600, director_id: 1 },
    { id: 2, title: "Gone in Sixty Seconds", duration: 60, director_id: 2 },
    { id: 3, title: "Matrix", duration: 404, director_id: 3 },
    { id: 3, title: "Film od goscia id:2", duration: 404, director_id: 2 },
];
type Director = {
    id: number;
    name: string;
};
const directors: Director[] = [
    { id: 1, name: "Victor Salva" },
    { id: 2, name: "H.B. Halicki" },
    { id: 3, name: "Lilly Wachowski" },
];
//
const resolvers = {
    Query: {
        users: UserController.getAll,
        user: UserController.getCertin,
        movies: (): Movie[] => moviesList,
        movie: (parent: never, args: { id: number }) => {
            return moviesList.find((target: Movie) => {
                return target.id === args.id;
            });
        },
        directors: (): Director[] => directors,
    },
    //
    //
    //
    Movie: {
        duration: (parent: Movie, args: { mode: string }) => {
            switch (args.mode) {
                case "HOURS":
                    return Math.round(parent.duration / 3600);
                case "MINUTES":
                    return Math.round(parent.duration / 60);
                default:
                    return parent.duration;
            }
        },
        director: (parent: Movie) => {
            return directors.find((director) => {
                return director.id == parent.director_id;
            });
        },
    },
    //
    //
    //
    Director: {
        movies: (parent: Director) => {
            return moviesList.filter((target: Movie) => {
                return target.director_id === parent.id;
            });
        },
    },
    //
    //
    //
    Mutation: {
        addUser: UserController.addUser,
    },
};
const server = new ApolloServer({
    typeDefs, //
    resolvers,
});
//
export default (app: Application) => {
    server.applyMiddleware({ app });
};
