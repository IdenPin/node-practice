module.exports = app => {
  const express = require("express")
  // 单子单复数转换，首字母大写
  const inflection = require("inflection")
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
      .limit(10)
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

  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = inflection.classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )

  /**
   * 图片上传操作
   */
  const multer = require("multer")
  const upload = multer({
    dest: __dirname + "/../../uploads"
  })

  app.post(
    "/admin/api/upload",
    upload.single("file"),
    async (req, res, next) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    }
  )
}
