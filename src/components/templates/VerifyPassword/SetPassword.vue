<template>
  <div @submit="onSubmit" class="full-width">
    <div class="col-12 q-pt-sm">
      <FieldTextPassword
        label="New Password"
        v-model="fields.password"
        required
      />
    </div>
    <div class="col-12 q-pt-sm">
      <FieldTextPassword
        label="Confirm New Password"
        v-model="fields.rePassword"
        required
      />
    </div>
    <div class="col-12 q-mt-xl">
      <q-btn
        class="q-mb-xl btn-next full-width"
        label="Submit"
        :disable="loading"
        :loading="loading"
        @click="onSubmit"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FieldTextPassword from 'components/fields/TextPassword';
import MixinNotification from 'components/mixins/Notification';

export default {
  name: 'TemplateVerifyPasswordSetPassword',
  mixins: [MixinNotification],
  components: { FieldTextPassword },
  computed: {
    ...mapState({
      loading: (state) => state.authentication.loading,
    }),
  },
  data() {
    return {
      fields: {
        password: null,
        rePassword: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const { token } = this.$route.query;
      console.log({ token });
      const { password, rePassword } = this.fields;
      this.$store
        .dispatch('authentication/setPassword', { token, password, rePassword })
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
    },

    onSubmitSuccess() {
      this.NotifyResponseSuccess('Change Password is Success');
      this.$router.push({ name: 'PageAuthenticationLogin' });
    },

    onSubmitError(err) {
      if (err.response.data.message.includes('rePassword must be match to password')) {
        this.NotifyResponseErrorWithCaption('Password not match');
      } else {
        this.NotifyResponseErrorWithCaption(err.response.message);
      }
    },
  },
};
</script>

<style scoped>
.txt-verification {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.019em;
  color: #1A1A1A;
}
.txt-info {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #4D4D4D;
}
.btn-next {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.005em;
  color: #FFFFFF;
  background-color: #4DA6FF;
  border-radius: 10px;
  height: 46px;
}
.btn-cancel {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.005em;
  color: #4DA6FF;
  border-radius: 10px;
  height: 46px;
}
</style>
