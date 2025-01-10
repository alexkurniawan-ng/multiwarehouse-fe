<template>
  <q-page>
    <div class="row q-pa-md text-bold text-xl">
      Admin Homepage

    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageHomeAdmin',

  computed: {
    ...mapState({
      user: (state) => state.authentication.user,
    }),
  },
  mounted() {
    // if (this.user && (this.user.roles.filter((r) => r === 'super_admin').length === 0 && this.user.roles.filter((r) => r === 'admin').length === 0)) {
    //   console.log('not Admin')
    //   this.$router.replace({ name: 'PageMainHome' });
    // }
    if (localStorage.getItem('roles') === 'user') {
      this.$router.replace({ name: 'PageMainHome' });
    }
  },
};
</script>
