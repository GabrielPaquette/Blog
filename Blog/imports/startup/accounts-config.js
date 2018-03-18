/*
Created By: Gabriel Paquette
Date Created: March 18, 2018
Description: This file contains all the configurations for the
             AccountsUIWrapper component.
             This code was taken from:
             https://www.meteor.com/tutorials/react/adding-user-accounts
*/

import {Accounts} from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
