<template>
  <q-page>
    <div class="row q-pa-md">
      <!-- <TemplateMeEmployee />
      <TemplateMeMenu /> -->
      <div class="col-12 version">v{{ version }}</div>
    </div>
  </q-page>
</template>

<script>
// import TemplateMeMenu from 'components/templates/Me/Menu';
// import TemplateMeEmployee from 'components/templates/Me/Employee';
import { version } from '../../../package.json';

export default {
  name: 'PageMe',
  // components: { TemplateMeMenu, TemplateMeEmployee },
  data() {
    return {
      version,
    };
  },
  mounted() {
    // this.$i18n.locale = 'id';
    // this.$store.dispatch('employee/getInfoRequest').catch(this.onError);
  },
  methods: {
    onError(err) {
      if (err.response) this.NotifyResponseError(err.response, 'data');
      else this.NotifyResponseErrorWithCaption(err.message);
    },
  },
};
</script>

<style scoped>
.version {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  padding-top: 16px;
}
</style>
