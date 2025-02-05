<template>
  <div>
    <div
      class="submitted-title q-mt-xl q-mb-xs"
      v-text="$t('reset_password_submitted_title')"
    />
    <div
      class="submitted-caption q-mt-lg q-pa-md"
      v-text="$t('reset_password_submitted_caption')"
    />
    <q-btn
      class="submitted-login full-width"
      flat
      no-caps
      @click="goToLogin"
      :label="$t('reset_password_submitted_button')"
    />
  </div>
</template>

<script>
export default {
  name: 'TemplateResetPasswordSubmitted',
  methods: {
    goToLogin() {
      this.$router.replace({ name: 'PageAuthenticationLogin' });
    },
  },
};
</script>

<style scoped>
.submitted-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #110000;
}
.submitted-caption {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.0025em;
  color: #2E5744;
  text-align: center;

  background: #D5E9E0;
  border-radius: 5px;
}
.submitted-login {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #4DA6FF;
  height: 46px;

  margin-top: 200px;
}
</style>
