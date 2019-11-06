module.exports = app => {
  const express = require("express")
  // 单词单复数转换，首字母大写
  const router = express.Router({
    mergeParams: true
  })

  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.get("/", async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent"
    }
    const items = await req.Model.find()
      // 如果数据库有关联字段，我们可以通过 populate 表示关联取出。这里取出的数据库分类模型字段 parent
      // 展示这个关联字段的完整信息 parent id 变成一个完整对象
      // .populate("parent")
      .setOptions(queryOptions)
      .limit(100)
    res.send(items)
  })

  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 登录校验中间件
  const authMiddleware = require("../../middleware/auth")
  const resourceMiddleware = require("../../middleware/resource")
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  )

  // 登录
  app.post("/admin/api/login", async (req, res) => {
    const User = require("../../models/User")
    const { username, password } = req.body
    // 1. 根据用户名找用户
    const data = await User.findOne({
      username
    }).select("+password")
    if (!data) {
      return res.status(422).send({
        message: "用户名不存在"
      })
    }
    // 2. 效验密码
    const isValid = require("bcrypt").compareSync(password, data.password)
    if (!isValid) {
      return res.status(422).send({
        message: "密码错误"
      })
    }
    // 3. 返回token
    const jwt = require("jsonwebtoken")
    res.send({
      username,
      token: jwt.sign(
        { _id: data._id, username: data.username },
        app.get("secret")
      )
    })
  })

  // 注册
  app.post("/admin/api/register", async (req, res) => {
    const User = require("../../models/User")
    await User.create(req.body)
    res.send({
      success: "ok"
    })
  })

  /**
   * 图片上传操作
   */
  const multer = require("multer")
  const upload = multer({
    dest: __dirname + "/../../uploads"
  })

  app.post(
    "/admin/api/upload",
    authMiddleware(),
    upload.single("file"),
    async (req, res, next) => {
      const file = req.file
      file.url = !!process.env.NODE_ENV
        ? `http://0.0.0.0:3000/uploads/${file.filename}`
        : `https://1orz.cn/HOK-Server/uploads/${file.filename}`
      res.send(file)
    }
  )
}
