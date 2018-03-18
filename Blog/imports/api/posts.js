/*
Created By: Gabriel Paquette
Date Created: March 18, 2018
Description: This file is the DAL from the 'posts' collection.
             It handles all IO logic and basic data validation.
*/

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('posts', function postsPublication() {
    return Posts.find();
  });
}
Meteor.methods({
  //inserts a post in the collection
  'posts.insert'(text) {
    check(text, String);

    Posts.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  //removes a post from the collection
  'posts.remove'(postId){
    check(postId, String)

    Posts.remove(postId);
  },
  //updates an existing post in the collection
  'posts.updatePost'(postId, text) {
    check(postId, String);
    check(text, String);

    Posts.update(postId, { $set: { text: text } });
  },
});
