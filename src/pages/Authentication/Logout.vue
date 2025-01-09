<template>
  <div />
</template>

<script>
export default {
  name: 'PageLogout',
  mounted() {
    window.localStorage.setItem('token', null);
    this.$router.push({ name: 'PageAuthenticationLogin' });
  },
};
</script>
