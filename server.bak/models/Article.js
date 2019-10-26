const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  body: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
})

module.exports = mongoose.model('Article', schema)