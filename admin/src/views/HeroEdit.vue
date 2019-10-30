<template>
  <div class="create-category">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title" />
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" :max="9" style="margin-top:0.6rem" />
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" :max="9" style="margin-top:0.6rem" />
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" :max="9" style="margin-top:0.6rem" />
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" :max="9" style="margin-top:0.6rem" />
          </el-form-item>

          <el-form-item label="顺分出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})">添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name" />
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description" />
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips" />
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="danger" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" style="float:right;margin-top: 30px;" native-type="submit">保存</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        skills: [],
        scores: {}
      },
      categories: [],
      items: []
    }
  },
  created() {
    this.fetchCategory()
    this.fetchItems()
    this.id && this.fetch()
  },
  methods: {
    async fetchCategory() {
      this.categories = await this.$http.get(`/rest/categories/`)
    },
    async fetchItems() {
      this.items = await this.$http.get(`/rest/items/`)
    },
    async fetch() {
      const data = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, data)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/heroes', this.model)
      }
      this.$notify({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
      this.$router.push('/heroes/list')
    },
    handleAvatarSuccess(data) {
      this.$set(this.model, 'avatar', data.url)
      this.$notify({
        type: 'success',
        title: '成功',
        message: '上传成功'
      })
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px !important;

  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
