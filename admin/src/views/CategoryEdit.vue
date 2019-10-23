<template>
  <div class="create-category">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
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
      model: {}
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async fetch() {
      this.model = await this.$http.get(`/rest/categories/${this.id}`)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/categories', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/categories/list')
    }
  }
}
</script>
