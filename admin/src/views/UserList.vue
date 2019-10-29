<template>
  <div class="create-category">
    <h1>管理员列表</h1>
    <el-table :data="users">
      <el-table-column prop="_id" label="ID" width="320"></el-table-column>
      <el-table-column prop="username" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    remove({ _id, username }) {
      this.$confirm(`此操作将永久删除 【${username}】 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/users/${_id}`)
          this.$notify({
            type: 'success',
            title: '成功',
            message: '删除成功'
          })
          this.fetch()
        })
        .catch(() => {
          this.$notify({
            type: 'success',
            title: '成功',
            message: '已取消删除'
          })
        })
    },
    async fetch() {
      const res = await this.$http.get('/rest/users')
      this.users = res
    }
  }
}
</script>
