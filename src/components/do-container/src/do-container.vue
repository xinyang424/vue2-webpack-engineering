<template>
  <section class="do-container">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "do-container",
};
</script>

<style>
.do-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
