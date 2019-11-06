<template>
  <div class="create-category">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})">
          <i class="el-icon-plus" /> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;margin-top:30px">
          <el-col :md="12" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="跳转链接[url]">
              <el-input v-model="item.url" />
            </el-form-item>
            <el-form-item label="图标">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-button size="mini" type="danger" @click="model.items.splice(index, 1)">删除</el-button>
          </el-col>
        </el-row>
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
      
      model: {
        items: []
      }
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async fetch() {
      const data = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({}, this.model, data)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/ads', this.model)
      }
      this.$notify({
        type: 'success',
        title: '成功',
        message: '保存成功'
      })
      this.$router.push('/ads/list')
    }
  }
}
</script>
