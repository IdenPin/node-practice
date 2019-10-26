module.exports = options => {
  return async (req, res, next) => {
    // 将小写负数转化成大写单数 categories -> Category
    const modelName = require("inflection").classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}
