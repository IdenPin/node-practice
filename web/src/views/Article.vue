<template>
  <div class="article-page">
    <div class="d-flex px-2 py-3">
      <router-link tag="div" to="/home" class="go-back">
        <i class="icon-back-arrow" />
      </router-link>
      <div class="flex-1 ml-3 text-blue text-ellipsis">{{model.title}}</div>
      <div class="text-grey">{{model.updatedAt | toDate}}</div>
    </div>
    <div class="px-2 page-body" v-html="model.content"></div>
    <div class="recommand px-2 py-3">
      <div>
        <i class="icon-recommand"></i>
        <span class="text-blue text-bold fs-lg">相关资讯</span>
      </div>
      <div class="rec-list py-2 d-flex" v-for="item in model.related" :key="item._id">
        <router-link
          tag="div"
          class="text-bold flex-1 text-ellipsis"
          style="cursor: pointer"
          :to="`/article/${item._id}`"
        >{{item.title}}</router-link>
        <span class="text-grey">{{item.updatedAt | toDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      model: {}
    }
  },
  props: {
    id: String
  },
  watch: {
    $route: {
      handler: 'fetchArticle',
      immediate: true
    }
  },
  filters: {
    toDate(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  methods: {
    async fetchArticle() {
      this.model = await this.$http.get(`/articles/${this.id}`)
      console.log('model', this.model)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
.article-page {
  .go-back {
    position: relative;
  }
  .icon-back-arrow {
    position: absolute;
    width: 0.6667rem;
    height: 100%;
    left: 0%;
    top: 0;
    border: 0;
    background: url('~@/assets/back-arrow.png') no-repeat center;
    background-size: 100%;
  }
  .page-body {
    border-top: 1px solid map-get($colors, 'light-1');
    img {
      width: 100%;
    }
  }
  .recommand {
    border-top: 1px solid map-get($colors, 'light-1');
  }
}
</style>