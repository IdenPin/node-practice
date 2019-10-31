<template>
  <m-card :title="title" :icon="icon" class="mb-5">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{active: index === activeIndex}"
        v-for="(item, index) in categories"
        :key="index"
      >
        <div class="nav-link" @click="activeIndex = index">{{item.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <swiper-slide :class="{active:false}" v-for="(item, index) in categories" :key="index">
          <slot name="items" :category="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.categories[this.activeIndex].newsList)
  },
  data() {
    return {
      activeIndex: 0
    }
  }
}
</script>

<style>
</style>