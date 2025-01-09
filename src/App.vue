<template>
  <div id="q-app">
    <div class="testing">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.testing {
  margin: 0 auto;
}
</style>
<!-- max-width: 500px; -->
