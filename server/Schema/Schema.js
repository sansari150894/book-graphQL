const graphql = require('graphql');
const _= require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphql;

const books =[
  {id:'1',name:'Taimoor',genre:'chutiyap', authorId:'3'},
  {id:'2',name:'Vivek',genre:'chut', authorId:'2'},
  {id:'3',name:'Ansari',genre:'anamiya', authorId:'1'},
  {id:'1',name:'sudheer',genre:'chutiyap', authorId:'3'},
  {id:'2',name:'Dubey',genre:'chut', authorId:'2'},
  {id:'3',name:'Satish',genre:'anamiya', authorId:'1'}
];
const authors =[
  {id:'1',name:'firstAuthor',age:30},
  {id:'2',name:'secondAuthor',age:60},
  {id:'3',name:'thirdtAuthor',age:50}
];

const BookType = new GraphQLObjectType({
  name : 'Book',
  fields : () => ({
    id :{type : GraphQLID},
    name :{type : GraphQLString},
    genre :{type : GraphQLString},
    author:{
      type:AuthorType,
      args:{id : {type : GraphQLID}},
      resolve(parent,args){
        return _.find(authors,{id:parent.authorId})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name : 'Author',
  fields : () => ({
    id :{type : GraphQLID},
    name :{type : GraphQLString},
    age :{type : GraphQLInt},
    books:{
      type : new GraphQLList(BookType),
      resolve(parent, args){
        return _.filter(books,{authorId : parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name : 'RootQueryType',
  fields:{
    book:{
      type:BookType,
      args:{id : {type : GraphQLID}},
      resolve(parent,args){
        return _.find(books,{id:args.id})
      }
    },
    author:{
      type:AuthorType,
      args:{id : {type : GraphQLID}},
      resolve(parent,args){
        return _.find(authors,{id:args.id})
      }
    },
    books:{
      type:new GraphQLList(BookType),
      resolve(parent, args){
        return books;
      }
    },
    authors:{
      type:new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query:RootQuery
});
