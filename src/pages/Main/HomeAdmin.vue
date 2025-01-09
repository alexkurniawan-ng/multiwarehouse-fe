<template>
  <q-page>
    <div class="row">
      home admin
      <!-- <TemplateHomeEmployee class="q-px-md" />
      <TemplateHomeAttendance class="q-px-md" />
      <TemplateHomeAnnouncements />
      <TemplateHomeNotifications class="q-px-md" /> -->
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
// import TemplateHomeEmployee from 'components/templates/Home/Employee';
// import TemplateHomeAttendance from 'components/templates/Home/Attendance';
// import TemplateHomeNotifications from 'components/templates/Home/Notifications';
// import TemplateHomeAnnouncements from 'components/templates/Home/Announcements';

export default {
  name: 'PageHomeAdmin',
  components: {
    // TemplateHomeEmployee,
    // TemplateHomeAttendance,
    // TemplateHomeNotifications,
    // TemplateHomeAnnouncements,
  },
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
