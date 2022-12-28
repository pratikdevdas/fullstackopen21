import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
query{
    allBooks {
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

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author
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
