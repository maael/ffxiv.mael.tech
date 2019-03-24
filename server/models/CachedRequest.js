const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ModelSchema = new Schema({
  url: 'string',
  querystring: 'object'
})

const Model = mongoose.model('CachedRequest', ModelSchema);

module.exports = Model
