<template>
  <div>
    <div class="topbar bg-black font-white py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary fs-xxs">立即下载</button>
    </div>
    <div class="nav nav-inverse jc-around bg-primary text-white py-2">
      <div class="nav-item active">
        <router-link to="/home" class="nav-link" tag="div">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/attackCenter" class="nav-link" tag="div">攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/matchCenter" class="nav-link" tag="div">赛事中心</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
