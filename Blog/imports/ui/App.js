/*
Created By: Gabriel Paquette
Date Created: March 18, 2018
Description: This file contains the main App component.
             It holds where the user will enter data
             and displayed each post in a list.
             The structure of this application is based
             off the Meteor.com tutorial.
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';

import Post from './Post.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

  /*
  Renders each post and determinds if the owner of the post is logged in
  if they are, then the private controls will display for that post.
  */
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

  /*
  Inserts a post into the database and cleans the input field
  */
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

//Retrieves all posts and the current user
export default withTracker(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, {sort: {createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);
