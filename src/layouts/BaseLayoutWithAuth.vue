<template>
  <q-layout view="lHr LpR lFr">
  <!-- <q-layout view="lHr LpR lFr" v-if="validToken"> -->
    <!-- <TemplateBaseLayoutHeader /> -->

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { mapState } from 'vuex';
// import MixinNotification from 'components/mixins/Notification';
// import TemplateBaseLayoutHeader from 'components/templates/BaseLayout/Header';

export default {
  name: 'MainLayout',
  mixins: [MixinNotification],
  // components: { TemplateBaseLayoutHeader },
  computed: {
    ...mapState({
      // stateEdited: (state) => state.authentication.stateEdited,
      validToken: (state) => state.authentication.validToken,
    }),
  },
  mounted() {
    this.$store.dispatch('authentication/check')
      .catch((err) => {
        console.log(err)
        // if (err.response.status === 401) {
        //   this.$router.push({ name: 'PageAuthenticationLogout' });
        //   this.NotifyResponseError(err.response, 'data');
        // }
        // if (err.response.status === 403) {
        //   this.$router.push({ name: 'PageAuthenticationLogout' });
        //   this.NotifyResponseErrorWithCaption(this.$t('login_email_not_found'));
        // }
        // if (err.response.status === 404) {
        //   this.$router.push({ name: 'PageAuthenticationLogout' });
        //   this.NotifyResponseError(err.response, 'data');
        // }
      });
  },
};
</script>
