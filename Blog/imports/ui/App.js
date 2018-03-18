import React, { Component } from 'react';

import Post from './Post.js';

// App component - represents the whole app
export default class App extends Component {
  getPosts() {
    return [
      { _id: 1, text: 'Test Post' },
      { _id: 2, text: 'Test Post' },
    ];
  }

  renderPosts() {
    return this.getPosts().map((post) => (
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
