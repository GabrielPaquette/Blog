import React, { Component } from 'react';

// Post component - represents a single Post
export default class Post extends Component {

  deleteThisPost(){
    Meteor.call('posts.remove', this.props.post._id);
  }
  render() {
    return (
      <li>
       <button className="delete" onClick={this.deleteThisPost.bind(this)}>
         &times;
       </button>
       <strong>{this.props.post.username}:</strong>
        <br/><br/>
       <span className="text">{this.props.post.text}</span>
     </li>
    );
  }
}
