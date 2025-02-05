<template>
  <div @submit="onSubmit" class="row col-12 q-px-md">
    <p class="txt-verification q-mt-xl">Password Verification</p>
    <p class="txt-info">Please enter your current password to continue</p>
    <div class="col-12 q-pt-sm">
      <FieldTextPassword
        class="q-mb-md"
        label="Current password"
        v-model="fields.password"
        :disable="resetToken !== null"
        required
      />
    </div>
    <div class="col-12" v-if="resetToken !== null">
      <FieldTextPassword
        label="New password"
        v-model="fields.newPassword"
        required
      />
      <FieldTextPassword
        label="Confirm new password"
        v-model="fields.rePassword"
        required
      />
    </div>
    <div v-if="resetToken === null" class="col-12 q-mt-xl">
      <q-btn
        class="btn-next full-width"
        label="Next"
        :disable="loading"
        :loading="loading"
        no-caps
        @click="checkOldPassword"
      />
    </div>
    <div v-else class="col-12 q-mt-xl">
      <q-btn
        class="btn-next full-width"
        label="Submit"
        :disable="loading"
        :loading="loading"
        no-caps
        @click="onSubmit"
      />
    </div>
    <div class="col-12 q-mt-xl q-mb-md">
      <q-btn
        outline
        flat
        class="btn-cancel full-width"
        label="Cancel"
        :disable="loading"
        :loading="loading"
        no-caps
        @click="closeDialog"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FieldTextPassword from 'components/fields/TextPassword';
import MixinNotification from 'components/mixins/Notification';

export default {
  name: 'TemplateChangePasswordForm',
  mixins: [MixinNotification],
  props: {
    toggle: { type: Boolean, default: false },
  },
  components: { FieldTextPassword },
  computed: {
    ...mapState({
      loading: (state) => state.authentication.loading,
      user: (state) => state.authentication.user,
    }),
  },
  data() {
    return {
      resetToken: null,
      fields: {
        password: null,
        newPassword: null,
        rePassword: null,
      },
    };
  },
  methods: {
    closeDialog() {
      this.$emit('close-dialog', false);
      this.fields.password = null;
      this.fields.newPassword = null;
      this.fields.rePassword = null;
      this.resetToken = null;
    },
    checkOldPassword() {
      const { id } = this.user;
      const { password } = this.fields;
      this.$store.dispatch('authentication/checkOldPassword', { id, password })
        .then(this.checkPasswordSuccess)
        .catch(this.onSubmitError);
    },  
    onSubmit() {
      const { newPassword, rePassword } = this.fields;
      const token = this.resetToken;
      this.$store
        .dispatch('authentication/changePassword', { token, password: newPassword, rePassword })
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
    },
    checkPasswordSuccess(data) {
      this.resetToken = data.resetToken;
    },
    onSubmitSuccess() {
      this.NotifyResponseSuccess('Change Password is Success');
      this.closeDialog();
    },
    onSubmitError(err) {
      if (err.response.data.data.includes('Invalid credentials')) {
        this.NotifyResponseErrorWithCaption(this.$t('change_password_not_match'));
      } else if (err.response.data.data.includes('rePassword must be match to password')) {
        this.NotifyResponseErrorWithCaption(this.$t('change_password_not_match'));
      } else if (err.response.data.data.includes('Revoke user.')) {
        this.NotifyResponseErrorWithCaption('You cannot access this app because your account has been revoked.');
      } else {
        this.NotifyResponseError(err.response, 'data');
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
