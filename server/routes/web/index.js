module.exports = app => {
  const router = require("express").Router()
  // const Article = require("../../models/Article")
  const mongoose = require("mongoose")
  const Article = mongoose.model("Article")
  const Category = mongoose.model("Category")
  router.get("/news/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类"
    })
    const cats = await Category.find()
      .where({
        parent: parent
      })
      .lean()
    const newsTitles = [
      "聚多方跨界之势 共崭新商业生态 王者荣耀商户特权正式发布",
      "抢先看 | 电竞公开课《竞然如此》第二期，老帅与你分享职业背后的故事",
      "主策轩轩＆主播孤影直播内容回顾",
      "换上这把发光剑，我的帅气永不变！李白全新星元登场 ~",
      "七城灯会，共贺四周岁！【点击回顾】千灯会精彩瞬间！",
      "10月30日全服不停机修复公告",
      "10月30日全服不停机更新公告",
      "体验服【资格申请活动】即将开启",
      "附近的人功能无法使用异常说明",
      "【已修复】模拟战无法进入异常说明",
      "感恩有你 李白新星元登场 峡谷全新福利来袭",
      "【周年许愿树】活动公告",
      "【周年庆典 明星抽内测】活动公告",
      "极致网速，快乐上分，中国电信邀你畅快赢好礼",
      "【回顾王者独家记忆 领专属局内称号】活动公告"
    ]
    const newsList = newsTitles.map(v => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: v
      }
    })

    // 清空
    await Article.deleteMany({})
    await Article.insertMany(newsList)

    res.send(newsList)
  })

  // 获取列表
  router.get("/news/list", async (req, res) => {
    // 方法一 populate
    // const parent = await Category.findOne({
    //   name: "新闻分类"
    // })
    //   // populate 查找子分类
    //   .populate({
    //     path: "children",
    //     populate: {
    //       path: "newsList"
    //     }
    //   })
    //   .lean()
    // res.send(parent)

    // 方法二 聚合查询 aggregate
    const parent = await Category.findOne({
      name: "新闻分类"
    })

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "articles", // 集合名称 默认就是 模型的名称的负数新式
          localField: "_id",
          foreignField: "categories",
          as: "newsList"
        }
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] }
        }
      }
    ])

    const subCats = cats.map(v => v.id)
    cats.unshift({
      name: "热门",
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate("categories")
        .limit(5)
        .lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName =
          cat.name === "热门" ? news.categoryName[0] : cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })

  app.use("/web/api/", router)
}
