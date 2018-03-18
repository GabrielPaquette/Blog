import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

  renderPosts() {
    return this.props.posts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }
  handleSubmit(event){
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('posts.insert', text);

    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>The Coolest Public Blog on the Web</h1>
          <AccountsUIWrapper />
          <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to submit a new post!"
              />
          </form>
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
