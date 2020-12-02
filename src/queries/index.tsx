import { gql } from 'apollo-boost';

export const GET_ARTICLES = gql`
  {
    articles {
      _id,
      title,
      body,
      createdAt
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation($title: String!, $body: String!, ) {
      createArticle(article: {title: $title, body: $body}){
        title,
        createdAt,
        _id,
        body
      }
  }
`;

export const EDIT_ARTICLE = gql`
 
  mutation($id: ID!, $title: String!, $body: String!) {
      updateArticle(id: $id , article: {title: $title, body: $body}){
        title,
        body,
        createdAt,
        _id
      }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation($id: ID!) {
    deleteArticle(id: $id) {
    title,
    createdAt,
    body
    }
  }
`

export const VIEW_ARTICLE = gql`
  query ($id: ID!){
     singleArticle(id: $id) {
        title,
        body,
        _id,
        createdAt
    }
  }
`;

export const GET_ARTICLES_SUB = gql`
  subscription {
      articleAdded {
        title,
        body,
        _id,
        createdAt
      }
  }
`;