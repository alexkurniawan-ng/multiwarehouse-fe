<template>
  <div class="row q-pa-md" v-if="!validToken">
    <!-- <TemplateLoginLogo /> -->
    <TemplateLoginForm />
    <TemplateLoginResetPassword />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MixinNotification from 'components/mixins/Notification';
import TemplateLoginForm from 'components/templates/Login/Form';
// import TemplateLoginLogo from 'components/templates/Login/Logo';
import TemplateLoginResetPassword from 'components/templates/Login/ResetPassword';

export default {
  name: 'PageLogin',
  mixins: [MixinNotification],
  components: {
    TemplateLoginForm,
    // TemplateLoginLogo,
    TemplateLoginResetPassword,
  },
  computed: {
    ...mapState({
      validToken: (state) => state.authentication.validToken,
    }),
  },
  mounted() {

    this.$store.dispatch('authentication/check')
      .then((response) => {
        console.log({ response })
        this.$router.push({ name: 'PageMainHome' });
      })
      .catch((err) => {
        if (err.response.status === 401) return;
        if (err.response.status === 404) return;
        this.NotifyResponseError(err.response, 'data');
      });
  },
};
</script>
