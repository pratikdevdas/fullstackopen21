import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
query allBooks($genres: String){
    allBooks(genres:$genres) {
        title
        author {
          name
        }
        published
        genres
        id
  }
}
`

export const ALL_AUTHORS = gql`
query{
    allAuthors {
    name
    id
    born
    # bookCount
  }
}`


export const USER = gql`
query{
  me{
    username
    favoriteGenre
  }
}`



export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation EditAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
  }
}`


export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}`
