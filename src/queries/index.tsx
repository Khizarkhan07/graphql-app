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

export const VIEW_USERS = gql`
  query ($id: Int){
    getUserInfo(id: $id) {
      id,
      name,
      job_title,
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation($name: String, $email: String, $job_title: String) {
    createUser (name: $name, email: $email, job_title: $job_title)
  }
`;

export const EDIT_USER = gql`
  mutation($id: Int, $name: String, $email: String, $job_title: String) {
    updateUserInfo (id: $id, name: $name, email: $email, job_title: $job_title)
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