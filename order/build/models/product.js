'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productModel = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    image: { type: String, required: true }
});
module.exports = mongoose.model('Dog', productModel, 'products');
