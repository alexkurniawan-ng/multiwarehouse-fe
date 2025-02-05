<template>
  <div class="row q-pa-md" v-if="user">
    <TemplateChangePasswordLogo />
    <TemplateChangePasswordConfirmByEmail />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MixinNotification from 'components/mixins/Notification';
import TemplateChangePasswordConfirmByEmail from 'components/templates/ChangePassword/ConfirmByEmail';
import TemplateChangePasswordLogo from 'components/templates/ChangePassword/Logo';

export default {
  name: 'PageAuthenticationChangePassword',
  mixins: [MixinNotification],
  components: {
    TemplateChangePasswordConfirmByEmail,
    TemplateChangePasswordLogo,
  },
  computed: {
    ...mapState({
      user: (state) => state.authentication.userChangePassword,
    }),
  },
  mounted() {
    const { token } = this.$route.params;
    this.$i18n.locale = 'en';
    this.$store.dispatch('authentication/getChangePasswordData', { token })
      .catch((err) => {
        if (err.response.status === 404) this.$router.replace({ name: 'PageAuthenticationLogin' });
        else this.NotifyResponseError(err.response, 'data');
      });
  },
};
</script>
