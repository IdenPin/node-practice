<template>
  <div class="create-category">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await this.$http.post(
        'http://0.0.0.0:3000/admin/api/upload',
        formData
      )
      Editor.insertEmbed(cursorLocation, 'image', url)
      resetUploader()
    },
    async fetchCategories() {
      this.categories = await this.$http.get(`rest/categories`)
    },
    async fetch() {
      this.model = await this.$http.get(`rest/articles/${this.id}`)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/articles', this.model)
      }
      this.$notify({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
      this.$router.push('/articles/list')
    }
  }
}
</script>
