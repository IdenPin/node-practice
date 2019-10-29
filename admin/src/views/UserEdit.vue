<template>
  <div class="create-category">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="账号">
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" />
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
      const { username } = await this.$http.get(`rest/users/${this.id}`)
      this.model = {
        username
      }
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/users/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/users', this.model)
      }
      this.$notify({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
      this.$router.push('/users/list')
    }
  }
}
</script>
