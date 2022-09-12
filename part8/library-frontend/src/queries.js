import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
query{
    allBooks {
        title
        author
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
    bookCount
  }
}`