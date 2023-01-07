import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Books {
    author {
      name
    }
    genres
    published
    title
    id
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
      }
      genres
      published
      title
      id
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genres: String) {
    allBooks(genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;


