const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    # authorCount: Int!
    allBooks(author: String, genres: String): [Books!]!
    allAuthors: [Authors!]!
    me: User
  }

  type Authors {
    name: String!
    id: ID!
    born: Int
    books: Int
  }

  type Books {
    title: String!
    published: String!
    author: Authors
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Books
    editAuthor(name: String!, born: Int!): Authors
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Books!
  }    
`;

module.exports = typeDefs;
