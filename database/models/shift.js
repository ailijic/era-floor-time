// models/shift.js

start();
function start () {
  'use strict';

  const mongoose = require('mongoose');
  
  const ItemSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Event Name
    user: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  });
  
  const Shift = mongoose.model('Shift', ItemSchema);
  
  module.exports = Shift;
}
