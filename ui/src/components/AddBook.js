import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAuthorsQuery = gql`{
  authors{
    name
    id
  }
}
`

class AddBook extends Component {

 authors(){
    var data = this.props.data;
    if(data.loading){
      return (<option>loading authors</option>);
    }else{
      return data.authors.map((author,index)=>{
        return (<option key={index} value={author.id}>{author.name}</option>);
      })
    }
  }
  render() {
    return (
      <div>
        <label>Book Name : </label>
        <input name="bookName" value=""/>
            <label>Genre : </label>
        <input name="genre" value=""/>
          <label>Author : </label>
        <select>
          <option value="Select author">--select author--</option>
          {this.authors()}
        </select>

      </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
