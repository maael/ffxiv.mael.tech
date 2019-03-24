const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ModelSchema = new Schema({
  name: 'string',
})

const Model = mongoose.model('Mount', ModelSchema);

module.exports = Model
