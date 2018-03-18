/*
Created By: Gabriel Paquette
Date Created: March 18, 2018
Description: This file m.ain entry point of the Blog application
*/

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
