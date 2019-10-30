<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <!-- slides -->
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    callback() {}
  }
}
</script>
