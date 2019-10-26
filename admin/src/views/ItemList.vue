<template>
  <div class="create-category">
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="320"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
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
      items: []
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    remove({ _id, name }) {
      this.$confirm(`此操作将永久删除 【${name}】 , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/rest/items/${_id}`)
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
      const res = await this.$http.get('/rest/items')
      this.items = res
    }
  }
}
</script>
