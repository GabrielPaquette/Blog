import React, { Component } from 'react';

// Post component - represents a single Post
export default class Post extends Component {
  //
  // deleteThisPost(){
  //   Meteor.call('posts.remove', this.props.post._id);
  // }
  // render() {
  constructor(props){
    super(props);

    this.state = {
      editingFlag: false,
    };
  }
  deleteThisPost(){
    Meteor.call('posts.remove', this.props.post._id);
  }
  editPost(){
    this.setState({
      editingFlag: true,
    });
  }
  savePost(){

  }
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
          {this.props.post.text}
        </div>
      );
    }
    //use not logged in
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
