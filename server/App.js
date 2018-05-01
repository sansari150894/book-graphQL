const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();
const schema = require('./Schema/Schema');

mongoose.connect('mongodb://random:random@ds263989.mlab.com:63989/books-graphql');
mongoose.connection.once('open',()=>{
  console.log("database is connected");
})

app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql:true
}));

app.listen(4000, ()=>{
  console.log("app is running");
});
