<template>
  <div class="card bg-white p-3 px-3 mt-3">
    <div class="card-header d-flex pb-3 ai-center">
      <i class="icon" :class="`icon-${icon}`"></i>
      <div class="flex-1 px-2">{{title}}</div>
      <i class="icon icon-more"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
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
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';
.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>