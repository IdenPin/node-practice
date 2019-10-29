module.exports = options => {
  const jwt = require("jsonwebtoken")
  const User = require("../models/User")
  return async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop()
    if (!token) {
      res.status(401).send({
        message: "请先登录"
      })
    }

    let userData = null
    try {
      userData = jwt.verify(token, req.app.get("secret"))
    } catch (error) {
      res.status(401).send({
        message: "用户 token 有误"
      })
    }
    const { username } = await User.findById(userData._id)
    if (!username) {
      res.status(401).send({
        message: "用户 token 有误"
      })
    }
    await next()
  }
}
