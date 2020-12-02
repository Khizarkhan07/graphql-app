import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink : any = new HttpLink({
    uri: "http://localhost:4000/",
});

const wsLink : any = new WebSocketLink({
    uri: "ws://localhost:4000/",
    options: {
        reconnect: true
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([splitLink]),
});