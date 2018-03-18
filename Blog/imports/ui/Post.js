import React, { Component } from 'react';

// Post component - represents a single Post
export default class Post extends Component {
  render() {
    return (
      <li>{this.props.post.text}</li>
    );
  }
}
