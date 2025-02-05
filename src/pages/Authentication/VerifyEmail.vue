<template>
  <div>
    <div class="row q-mx-auto" style="max-width: 500px;" v-if="confirmed">
      <TemplateChangePasswordLogo />
      <p class="text-content q-mt-lg">Thank you for your verification.</p>
      <p class="text-content q-mt-md">Please set up your password to continue using app.</p>
      <TemplateVerifyPasswordSetPassword />
    </div>
    <div v-else class="text-content q-ma-md">Confirming token...</div>
  </div>
</template>

<script>
import MixinNotification from 'components/mixins/Notification';
import TemplateVerifyPasswordSetPassword from 'components/templates/VerifyPassword/SetPassword';
import TemplateChangePasswordLogo from 'components/templates/ChangePassword/Logo';

export default {
  name: 'PageAuthenticationVerifyEmail',
  mixins: [MixinNotification],
  components: {
    TemplateVerifyPasswordSetPassword,
    TemplateChangePasswordLogo,
  },
  data() {
    return {
      confirmed: false,
    };
  },
  methods: {
    onConfirmedToken() {
      this.confirmed = true;
    },
    onClickBackButton() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.replace({ name: 'PageAuthenticationLogin' });
      }
    },
  },
  mounted() {
    const { token } = this.$route.query;
    this.$store.dispatch('authentication/verifyEmail', { token })
      .then(this.onConfirmedToken)
      .catch((err) => {
        if (err.response.status === 404) this.$router.replace({ name: 'PageAuthenticationLogin' });
        else this.NotifyResponseErrorWithCaption(err.response.message);
      });
  },
};
</script>
<style scoped>
.text-content {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #454545;
}
</style>
