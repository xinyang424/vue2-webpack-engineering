<template>
  <aside class="do-aside" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: "do-aside",
  props: {
    width: {
      type: String,
      default: "240px",
    },
  },
};
</script>

<style>
.do-aside {
  height: 100%;
}
</style>
