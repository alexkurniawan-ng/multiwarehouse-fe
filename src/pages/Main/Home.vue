<template>
  <q-page>
    <div class="row">
      home
      <!-- <TemplateHomeEmployee class="q-px-md" />
      <TemplateHomeAttendance class="q-px-md" />
      <TemplateHomeAnnouncements />
      <TemplateHomeNotifications class="q-px-md" /> -->
    </div>
  </q-page>
</template>

<script>
// import { mapState } from 'vuex';
// import TemplateHomeEmployee from 'components/templates/Home/Employee';
// import TemplateHomeAttendance from 'components/templates/Home/Attendance';
// import TemplateHomeNotifications from 'components/templates/Home/Notifications';
// import TemplateHomeAnnouncements from 'components/templates/Home/Announcements';

export default {
  name: 'PageHome',
  components: {
    // TemplateHomeEmployee,
    // TemplateHomeAttendance,
    // TemplateHomeNotifications,
    // TemplateHomeAnnouncements,
  },
  computed: {
    // ...mapState({
    //   employee: (state) => state.authentication.employee,
    // }),
  },
  // watch: {
  //   employee(newValue) {
  //     if (newValue && newValue.profilePicture === null) {
  //       this.$router.replace({ name: 'PageOnboarding' });
  //     }
  //   },
  // },
  // mounted() {
  //   if (this.employee && this.employee.profilePicture === null) {
  //     this.$router.replace({ name: 'PageOnboarding' });
  //   }
  // },
};
</script>
