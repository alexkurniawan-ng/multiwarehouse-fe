<template>
  <div class="col-12 q-pt-sm">
    <q-btn
      :to="{ name: 'PageAuthenticationResetPassword' }"
      label="Forgot Password"
      class="btn-reset-password full-width"
      type="a"
      flat
      no-caps
    />
  </div>
</template>

<script>
export default {
  name: 'TemplateLoginResetPassword',
};
</script>

<style scoped>
.btn-reset-password {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.005em;
  color: #4DA6FF;
  height: 46px;
}
</style>
