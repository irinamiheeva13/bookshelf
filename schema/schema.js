import  graphql from 'graphql';

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

const books = [
    { id: '1', title: 'Lies of Locke Lamora', genre: 'Fantasy', authorId: '1' },
    { id: '2', title: 'Red seas under the red skies', genre: 'Fantasy', authorId: '1' },
    { id: '3', title: 'The republic of thieves', genre: 'Fantasy', authorId: '1' },
    { id: '4', title: 'A man called Ove', genre: 'Fiction', authorId: '2' },
    { id: '5', title: 'Anxious People', genre: 'Fiction', authorId: '2' },
];

const authors = [
    { id: '1', name: 'Scott Lynch' },
    { id: '2', name: 'Fredrik Backman' },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((author) => author.id === parent.authorId);
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter((book) => book.authorId === parent.id);
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return books.find((book) => book.id === args.id);
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return authors.find((author) => author.id === args.id);
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            },
        },
    },
});

export default new GraphQLSchema({
    query: Query,
});
