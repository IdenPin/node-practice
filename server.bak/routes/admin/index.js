module.exports = app => {
  const express = require("express")
  const jwt = require("jsonwebtoken")
  const assert = require("http-assert")
  const AdminUser = require("../../models/AdminUser")
  const router = express.Router({
    mergeParams: true
  })

  // 登录校验中间件
  // const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require("../../middleware/resource")

  // 新增列表项
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 根据id修改指定列表项
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 根据id删除指定列表项
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 获取列表
  router.get("/", async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent"
    }
    const items = await req.Model.find()
      .setOptions(queryOptions)
      .limit(10)
    res.send(items)
  })

  // 根据id获取详情
  router.get("/:id", async (req, res) => {
    const modal = await req.Model.findById(req.params.id)
    res.send(modal)
  })

  app.use(
    "/admin/api/rest/:resource",
    /*authMiddleware(), */ resourceMiddleware(),
    router
  )

  // 图片上传
  const multer = require("multer")
  const upload = multer({ dest: __dirname + "/../../uploads" })
  app.post(
    "/admin/api/upload",
    /*authMiddleware(), */ upload.single("file"),
    async (req, res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    }
  )

  // 登录
  app.use("/admin/api/login", async (req, res, next) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select("+password")
    assert(user, 422, "用户不存在")
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    // 2.效验密码
    const isValid = require("bcrypt").compareSync(password, user.password)
    assert(isValid, 422, "密码错误")

    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get("secret"))
    res.send({ token, username: user.username })
  })

  // 错误异常处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
    next()
  })
}
