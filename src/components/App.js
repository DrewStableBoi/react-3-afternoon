import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      filterString: '',
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchFilter = this.searchFilter.bind(this);
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then((results) => {
      this.setState({
          posts: results.data
        });
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text }).then( (results) => {
      this.setState({ 
        posts: results.data
      });
    })
  };

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then( (results) => {
      this.setState ({
        posts: results.data 
      });
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( (results) => {
      this.setState({ 
        posts: results.data
      });
    })  
  }

  searchFilter(filter) {
    this.setState({
      filterString: filter
    })
  }

  render() {
    let postsToDisplay = this.state.posts.filter( (element) => {
      return element.text.includes(this.state.filterString)
    }).map( (post) => (
      <Post key = { post.id }
      text = {post.text} 
      date = {post.date}
      updatePostFn = {this.updatePost}
      id = {post.id}
      deletePostFn = {this.deletePost}   />
))

    return (
      <div className="App__parent">
        <Header searchFilter = {this.searchFilter}/>

        <section className="App__content">

          <Compose createPostFn = {this.createPost}
          />
          
         {postsToDisplay}

        </section>
      </div>
    );
  }
}

export default App;
