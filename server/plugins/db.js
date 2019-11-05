module.exports = app => {
  const mongoose = require("mongoose")
  // mongoose.connect("mongodb:admin:password//127.0.0.1:27017/node-practice")
  mongoose.connect("mongodb://127.0.0.1:27017/node-practice", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  require("require-all")(__dirname + "/../models")
}
