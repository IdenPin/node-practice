<template>
  <div class="create-category">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      this.model = await this.$http.get(`/rest/items/${this.id}`)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/items', this.model)
      }
      this.$notify({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
      this.$router.push('/items/list')
    },
    handleAvatarSuccess(data) {
      this.$set(this.model, 'icon', data.url)
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
  width: 60px;
  height: 60px;
  line-height: 60px !important;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>
