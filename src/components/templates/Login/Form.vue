<template>
  <div class="row q-mx-auto" style="max-width: 500px;">
    <q-form @submit="onSubmit" class="row col-12">
      <div class="col-12 q-pt-sm ">
        <FieldTextEmail v-model="fields.email" label="Email" required />
      </div>
      <div class="col-12 q-pt-sm">
        <FieldTextPassword v-model="fields.password" label="Password" required />
      </div>
      <div class="col-12 q-mt-xl">
        <q-btn
          class="btn-login full-width"
          type="submit"
          :disable="loading"
          :loading="loading"
          label="Login"
          no-caps
        />
      </div>
      <div class="col-12 q-mt-md">
        <q-btn
          class="btn-register full-width"
          @click="signUp"
          :disable="loading"
          :loading="loading"
          label="Register"
          no-caps
          outline
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FieldTextEmail from 'components/fields/TextEmail';
import FieldTextPassword from 'components/fields/TextPassword';
import MixinNotification from 'components/mixins/Notification';

export default {
  name: 'TemplateLoginForm',
  mixins: [MixinNotification],
  components: { FieldTextEmail, FieldTextPassword },
  computed: {
    ...mapState({
      loading: (state) => state.authentication.loading,
    }),
  },
  data() {
    return {
      fields: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const { email, password } = this.fields;
      this.$store
        .dispatch('authentication/login', { email, password })
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
    },

    signUp() {
      this.$router.push({ name: 'PageAuthenticationRegister' });
      sessionStorage.setItem('load-google-register', 'load');
    },

    onSubmitSuccess(response) {
      window.localStorage.setItem('token', response.data.accessToken);
      window.localStorage.setItem('roles', response.data.roles);
      this.NotifyResponseSuccess('Anda berhasil masuk');
      if (response.data.roles.filter((r) => r === 'super_admin').length > 0 || response.data.roles.filter((r) => r === 'admin').length > 0) {
        console.log('Is admin')
        this.$router.push({ name: 'PageMainHomeAdmin' });
      } else {
        console.log('Not admin')
        this.$router.push({ name: 'PageMainHome' });
      }
    },

    onSubmitError(err) {
      if (err.response.data.message.includes('Invalid credentials.')) {
        this.NotifyResponseErrorWithCaption('Password invalid');
      } else if (err.response.data.message.includes('User not found.')) {
        this.NotifyResponseErrorWithCaption('Email not found');
      } else {
        this.NotifyResponseErrorWithCaption(err.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.btn-login {
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
.btn-register {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.005em;
  color: #4DA6FF;

  border-color: #4DA6FF;
  border-radius: 10px;
  height: 46px;
}
</style>
