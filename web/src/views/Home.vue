<template>
  <div class="home">
    <!-- slides -->
    <swiper ref="mySwiper" @someSwiperEvent="callback">
      <swiper-slide>
        <img
          class="w-100"
          src="https://ossweb-img.qq.com/upload/adw/image/20191030/85d0686b02abd3488ba227bc82fded66.jpeg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="https://ossweb-img.qq.com/upload/adw/image/20191030/91efb1b6c7683d02aaf8f193da5e9491.jpeg"
        />
      </swiper-slide>
    </swiper>
    <!-- nav -->
    <div class="nav-icons bg-white mt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item text-center mt-3 mb-2" v-for="n in 10" :key="n">
          <i class="icon icon-story"></i>
          <div class="py-1">爆料站</div>
        </div>
      </div>
      <div class="bg-light text-center fs-sm py-2">
        <i class="icon icon-arrow-top"></i>
        收起
      </div>
    </div>
    <!-- card -->
    <m-list-card icon="news" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <div
          class="py-2 fs-lg d-flex"
          :class="{active:false}"
          v-for="(item, index) in category.newsList"
          :key="index"
        >
          <span class="text-primary">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="text-grey-1 fs-sm">{{item.updatedAt | date}}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from 'dayjs'
export default {
  name: 'home',
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      newsCats: []
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this.fetchNewsCats()
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    async fetchNewsCats() {
      this.newsCats = await this.$http.get('/news/list')
    },
    callback() {}
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';
.nav-icons {
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    // 4 的倍数加1
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
  border-bottom: 1px solid $border-color;
}
</style>