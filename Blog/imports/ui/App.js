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
    const currentUserId = this.props.currentUser && this.props.currentUser._id;

    return this.props.posts.map((post) => {
      const showPrivateControls = post.owner === currentUserId;
      return (
        <Post
          key={post._id}
          post={post}
          showPrivateControls={showPrivateControls}
        />
      );
    });
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

          { this.props.currentUser ?
            <form className="new-post" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new post"
              />
            </form> : ''
        }
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
    posts: Posts.find({}, {sort: {createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
