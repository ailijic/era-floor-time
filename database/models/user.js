// models/shift.js

start();
function start () {
  'use strict';

  const mongoose = require('mongoose');
  
  const ItemSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', ItemSchema);
  
  module.exports = User;
}
