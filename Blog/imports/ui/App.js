import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.js';

// App component - represents the whole app
class App extends Component {

  renderPosts() {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>The Coolest Public Blog on the Web</h1>
        </header>

        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    posts: Posts.find({}).fetch(),
  };
})(App);
