<template>
  <div class="row col-12">
    <div class="col-12 q-mt-xl reset-title"> Reset Password </div>
    <div class="col-12 reset-caption q-mt-lg q-mb-xs" >
      Enter your email address below and we'll send you a link to reset your password.
    </div>

    <div class="col-12 q-pt-lg">
      <FieldTextEmail v-model="fields.email" required label="Email" />
    </div>
    <div class="col-12 q-mt-xl">
      <q-btn
        class="btn-next full-width"
        label="Reset Password"
        :disable="loading"
        :loading="loading"
        no-caps
        @click="onSubmit"
      />
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FieldTextEmail from 'components/fields/TextEmail';
import MixinNotification from 'components/mixins/Notification';

export default {
  name: 'TemplateResetPasswordForm',
  mixins: [MixinNotification],
  components: { FieldTextEmail },
  computed: {
    ...mapState({
      loading: (state) => state.authentication.loading,
    }),
  },
  data() {
    return {
      fields: {
        email: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const { email } = this.fields;
      this.$store
        .dispatch('authentication/resetPassword', { email })
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
    },

    onSubmitSuccess() {
      this.$emit('submitted', true);
    },

    onSubmitError(err) {
      if (err.response.data.data.includes('User not found.')) {
        this.NotifyResponseErrorWithCaption(this.$t('reset_password_email_not_found'));
      } else {
        this.NotifyResponseError(err.response, 'data');
      }
    },
  },
};
</script>

<style scoped>
.reset-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.019em;
  color: #1A1A1A;
}
.reset-caption {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #333333;
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
  width: 165px;
}
</style>
