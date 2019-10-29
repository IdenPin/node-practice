<template>
  <div class="login-container">
    <el-tabs type="border-card" class="card-box">
      <el-tab-pane label="登录">
        <el-form label-width="70px" @submit.native.prevent="login" style="margin-top: 20px">
          <el-form-item label="用户名：">
            <el-input style="width:80%" v-model="model.username" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input style="width:80%" v-model="model.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="临时用户注册">
        <el-form label-width="70px" @submit.native.prevent="register" style="margin-top: 20px">
          <el-form-item label="用户名：">
            <el-input style="width:80%" v-model="model.username" />
          </el-form-item>
          <el-form-item label="密码：">
            <el-input style="width:80%" v-model="model.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" native-type="submit">注 册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="css">
.card-box {
  width: 25rem;
  margin: 100px auto;
}
</style>
<script>
export default {
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const data = await this.$http.post('login', this.model)
      localStorage.userData = JSON.stringify(data)
      this.$router.push('/')
      this.$notify({
        type: 'success',
        message: '登录成功'
      })
    },
    async register() {
      const { success } = await this.$http.post('register', this.model)
      let tips = null
      let isType = null
      if (success === 'ok') {
        tips = '注册成功'
        isType = 'success'
      } else {
        tips = '注册失败'
        isType = 'error'
      }
      this.$notify({
        type: isType,
        message: tips
      })
    }
  }
}
</script>