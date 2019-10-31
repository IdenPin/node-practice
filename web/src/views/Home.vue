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
    <m-list-card icon="news" title="新闻资讯" :categories="newsCates">
      <template #items="{category}">
        <div
          class="py-2"
          :class="{active:false}"
          v-for="(item, index) in category.newsList"
          :key="index"
        >
          <span>[{{item.categoryName}}]</span>
          <span>|</span>
          <span>{{item.title}}</span>
          <span>{{item.date}}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      newsCates: [
        {
          name: '热门',
          newsList: new Array(5).fill({
            categoryName: '公告',
            title: '10月30日全服不停机修复公告 ~',
            date: '10/01'
          })
        },
        {
          name: '新闻',
          newsList: new Array(5).fill({
            categoryName: '新闻',
            title: '聚多方跨界之势 共崭新商业生态 王者荣耀商户特权正式发布',
            date: '10/31'
          })
        },
        {
          name: '公告',
          newsList: new Array(5).fill({
            categoryName: '公告',
            title: '附近的人功能无法使用异常说明',
            date: '10/01'
          })
        },
        {
          name: '活动',
          newsList: new Array(5).fill({
            categoryName: '公告',
            title: '10月30日全服不停机修复公告 ~',
            date: '10/21'
          })
        },
        {
          name: '赛事',
          newsList: new Array(5).fill({
            categoryName: '公告',
            title: '王者荣耀商户特权正式发布',
            date: '10/03'
          })
        }
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
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