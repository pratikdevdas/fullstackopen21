require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1:uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/Book')

mongoose.connect(process.env.MONGO_URI).then(
  () => {
    console.log(' connection succcesssful')
  }
)

const typeDefs = gql`
  type Query {
    bookCount: Int!
    # authorCount: Int!
    allBooks(author: String, genres: String): [Books!]!
    allAuthors: [Authors!]!
  }

  type Authors{
    name: String!
    id: ID!
    born:Int
    bookCount: Int!
  }

  type Books{
    title: String!
    published: String!
    author: Authors
    genres: [String!]!
    id:ID!
  }

  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Books
    # editAuthor(
    #   name:String!
    #   born:Int!
    # ):Authors
  }
`

const resolvers = {
  Query: {
    bookCount: async() => Book.collection.countDocuments(),
    // authorCount: async() => Author.collection.countDocuments(),
    allBooks: async(root,args) => {
      if(args.author && args.genres){
        console.log(args.author,args.genres)
        const author = await Author.findOne({name: args.author})
        const books = await Book.find({author: {$in:[author.id]},genres:{$in:[args.genres]}}).populate('author')
        return books
      } else if(args.author) {
        const author = await Author.findOne({name: args.author})
        const books = await Book.find({author: author.id}).populate('author')
        return books
      } else if(args.genres){
        const books = Book.find({genres: {$in:[ args.genres ]}}).populate('author')
        return books
      } else {
        const books = await Book.find({}).populate('author')
        return books
      }
    },
    allAuthors: async() => {
     const value = await Author.find({})
     console.log(value)
      return Author.find({})
    },
  },

//   Authors: {
//     bookCount: (root) => {
//       const mapper = books.map(element => element.author)
//       // COMMA OPERATOR
//       // https://stackoverflow.com/a/32886673/15688606
//       const map = mapper.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
//       // console.log(map);
//       const value = mapper.find(element => element === root.name)
//       // console.log(value)
//       // console.log(map[value])
//       return map[value]
//   },
// },
Mutation:{
  addBook: async(root,args)=>{
    console.log('books', args)

    const author = new Author({ name: args.author})
      await author.save()


      const authorData = await Author.findOne({name: args.author})

      console.log(authorData, "jack")
    const book = new Book({ ...args, author: authorData.id})
    // const debugValue = Author.findOne({ name: args.author })
    
    console.log(args.author)
    console.log(book, 'deb')
    
    // if (!Author.findOne({ name: args.author })) {
    
    // }
    return await book.save()
  },
  // editAuthor: (root, args) => {
  //   const author = authors.find(p => p.name === args.name)
  //   console.log(author)
  //   if(!author){
  //     return null
  //   }

  //   const updatedAuthor = {...author, born: args.born}
  //   console.log(updatedAuthor)
  //   authors = authors.map(p => {
      
  //    let value =  p.name === args.name ? updatedAuthor : p
  //    console.log(value)
  //    return value
  //   })
  //   console.log(authors)
  //   return updatedAuthor
  // }
}
}

const server = new ApolloServer({
  typeDefs, 
  resolvers,
})

server.listen({ port: 4002 }).then(({url}) => {
//  console.log(Object.keys(server) === 'listen', server, typeof server)
  console.log(`Server ready at ${url}`, typeof url)
})

const trio   =  {
  name(){
    console.log('My name is pratik')
  }
}    
console.log(Object.keys(trio).includes('name'), )
trio.name()
