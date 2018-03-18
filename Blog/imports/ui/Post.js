/*
Created By: Gabriel Paquette
Date Created: March 18, 2018
Description: This file contains the Post component.
             Each post has a delete and edit control.
             These controls will only show for the
             owner of the post.
*/


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// Post component - represents a single Post
export default class Post extends Component {
  constructor(props){
    super(props);

    this.state = {
      editingFlag: false,
    };
  }
  //Deletes the post based on a post ID
  deleteThisPost(){
    Meteor.call('posts.remove', this.props.post._id);
  }
  //sets the edit flag to true.
  //This flag determines which controls to display
  editPost(){
    this.setState({
      editingFlag: true,
    });
  }
  //saves a post and updates its text.
  savePost(){
    let postText = ReactDOM.findDOMNode(this.refs.postText).value;

    Meteor.call('posts.updatePost', this.props.post._id, postText);
    this.setState({
      editingFlag: false,
    });
  }
  //sets the edit flag to false.
  //This flag determines which controls to display
  cancelEdit(){
    this.setState({
      editingFlag: false,
    });
  }

  render() {
    let postBody;
    //user is logged in and they are not editing their post
    if(this.props.showPrivateControls && !this.state.editingFlag) {
      postBody = (
        <div>
          <button className="delete" onClick={this.deleteThisPost.bind(this)}>
            &times;
          </button>
          <button className="edit" onClick={this.editPost.bind(this)}>Edit</button>
          <strong>{this.props.post.username}:</strong>
          <br/><br/>
          <span className="text">
            {this.props.post.text}
          </span>
        </div>
      );
    }
    //user is logged in and editing the post
    else if(this.props.showPrivateControls && this.state.editingFlag){
      postBody = (
        <div>
          <button className="delete" onClick={this.deleteThisPost.bind(this)}>
            &times;
          </button>
          <button className="cancel" onClick={this.cancelEdit.bind(this)}>Cancel</button>
          <button className="save" onClick={this.savePost.bind(this)}>Save</button>
          <strong>{this.props.post.username}:</strong>
          <br/><br/>
          <textarea className="postBody"
            ref="postText"
            defaultValue={this.props.post.text}/>
        </div>
      );
    }
    //user is not logged in
    else if(!this.props.showPrivateControls){
      postBody = (
        <span className="text">
          <strong>{this.props.post.username}:</strong>
          <br/><br/>
          {this.props.post.text}
        </span>
      );
    }
    return (
      <li>
        {postBody}
      </li>
    );
  }
}
