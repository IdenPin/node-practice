/* eslint-disable no-console */
/* eslint-disable no-console */
<template>
  <div class="create-category">
    <h1>新建分类</h1>
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
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async save() {
      const res = await this.$http.post('/rest/categories', this.model)
      // eslint-disable-next-line no-console
      console.log(res, res)
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/categories/list')
    }
  }
}
</script>
