<template>
  <div class="col q-pa-md">
    <TemplateChangeEmailLogo />
    <p class="text-content q-mt-xl">Hello {{ username }},</p>
    <p class="text-content">Thank you for registration. Please kindly check your email for verification.</p>
  </div>
</template>

<script>
import MixinNotification from 'components/mixins/Notification';
import TemplateChangeEmailLogo from 'components/templates/ChangeEmail/Logo';

export default {
  name: 'PageAuthenticationPendingRegister',
  mixins: [MixinNotification],
  components: {
    TemplateChangeEmailLogo,
  },

  computed: {
    username() {
      const { user } = this.$route.params;
      return user[0].toUpperCase() + user.slice(1);
    },
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
