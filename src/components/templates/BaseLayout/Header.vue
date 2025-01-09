<template>
  <q-header class="bg-white base-header row items-center q-px-md q-pt-sm" v-if="!isHide">
    <q-btn flat no-caps class="col-auto" @click="onClickBackButton">
      <img src="images/icons/back.svg" />
    </q-btn>
    <span class="col-auto q-ml-sm header-title" v-text="title" />
  </q-header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TemplateBaseLayoutHeader',
  computed: {
    ...mapState({
      headerTitle: (state) => state.app.header.title,
    }),
    title() {
      if (this.$route.meta?.titleDynamic) return this.headerTitle;
      return this.$t(`${this.$route.meta?.title}`);
    },
    backToPage() {
      return this.$route.meta?.back;
    },
    isHide() {
      return this.$route.meta?.hide;
    },
  },
  methods: {
    onClickBackButton() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.replace({ name: this.backToPage });
      }
    },
  },
};
</script>

<style scoped>
.base-header {
  max-width: 500px;
  margin: 0 auto;
}
.base-header .header-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
}
.base-header >>> .q-btn__wrapper {
  padding: 0px;
}
</style>
