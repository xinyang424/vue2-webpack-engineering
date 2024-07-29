<template>
  <main class="do-main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: "do-main",
};
</script>

<style>
.do-main {
  flex: 1;
  height: 100%;
}
</style>
