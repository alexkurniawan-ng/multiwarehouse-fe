<template>
  <div class="row q-mx-auto" style="max-width: 500px;">

    <div class="row col-12">
      <q-btn
        v-if="!google.authSuccess"
        flat
        no-caps
        class="col-auto btn-back"
        icon="img:images/icons/back.svg"
        @click="onClickBackButton"
      />
      <div style="font-size: 20px; margin-top: 4px">Register</div>
    </div>
    <TemplateRegisterLogo />

    <div class="col-12 row">
      <div class="col-12 q-pt-xl">
        <span class="txt-register">Sign Up</span>
      </div>
      <div class="col-12 row q-pt-sm ">
        <div class="col-6 q-pr-sm">
          <FieldText v-model="form.firstName" filled stacked :label="'First Name'" required ref="fieldName" />
        </div>
        <div class="col-6 q-pl-sm">
          <FieldText v-model="form.lastName" filled stacked :label="'Last Name'" required ref="fieldName" />
        </div>
      </div>
      <div class="col-12">
        <FieldTextEmail v-model="form.email" filled stacked :label="'Email'" required ref="fieldEmail" />
      </div>
      <!-- <div class="col-12">
        <FieldTextPassword v-model="password" filled stacked :label="'Password'" required ref="fieldPassword" />
      </div> -->
      <div class="col-12 q-mt-md">
        <q-btn
          class="btn-login full-width"
          label="Sign up"
          no-caps
          @click="onSubmit"
        />
      </div>
      <div class="col-12 row justify-center q-pt-xl q-pb-lg">
        <div class="col-5 separator" />
        <div class="col-1 q-mx-sm text-washed">Or</div>
        <div class="col-5 separator" />
      </div>
      <div class="q-mx-auto">
        <div>
          <div id="signup_button"></div>
        </div>
      </div>
      <q-btn
        class="btn-outline full-width"
        icon="img:images/icons/login/google-icon.svg"
        outline
        label="Sign up with Google"
        no-caps
        :disable="loading"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FieldText from 'components/fields/Text.vue';
import FieldTextEmail from 'components/fields/TextEmail';
// import FieldTextPassword from 'components/fields/TextPassword';
import MixinNotification from 'components/mixins/Notification';
import TemplateRegisterLogo from 'components/templates/Register/Logo';

export default {
  name: 'TemplateRegisterForm',
  mixins: [MixinNotification],
  components: {
    FieldText,
    FieldTextEmail,
    // FieldTextPassword,
    TemplateRegisterLogo,
  },
  computed: {
    ...mapState({
      loading: (state) => state.authentication.loading,
    }),
  },
  data() {
    return {
      form: {
        fullName: null,
        firstName: null,
        lastName: null,
        email: null,
      },
      google: {
        authSuccess: false,
        picture: null,
        token: null,
      },
      rules: [
        (val) => !!val || 'This field is required.',
      ],
    };
  },
  methods: {
    // handleCredentialResponse(response) {
    //   const base64Url = response.credential.split('.')[1];
    //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //   const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    //     return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
    //   }).join(''));

    //   const responsePayload = JSON.parse(jsonPayload);
    //   const { name, email, picture } = responsePayload;
    //   this.name = name;
    //   this.email = email;
    //   this.google.picture = picture;
    //   this.google.token = response.credential;

    //   this.$store
    //     .dispatch('authentication/googleCheck', { email })
    //     .then(this.onSuccessCheckGoogleEmail)
    //     .catch(this.onSubmitError);
    // },
    onSuccessCheckGoogleEmail(response) {
      if (response) {
        this.google.authSuccess = true;
        this.step += 1;
      }
    },
    onSubmit() {
      const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const { firstName, lastName, email, fullName } = this.form;

      if (!firstName || !lastName || !email) {
        this.NotifyResponseErrorWithCaption('Please fill in all the required fields');
        return;
      }

      if (!re.test(email.toLowerCase())) {
        this.NotifyResponseErrorWithCaption('Email is not valid');
        return;
      }
      console.log({ form: this.form });

      const { picture, token } = this.google;

      const endpoint = this.google.authSuccess ? 'authentication/googleRegister' : 'authentication/register';

      this.$store
        .dispatch(endpoint, {
          fullName,
          email,
        })
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
    },

    onSubmitSuccess(response) {
      // window.localStorage.setItem('token', response.data.data.accessToken);
      this.$router.replace({ name: 'PageAuthenticationPendingRegister', params: { user: this.form.fullName } });
      // if (!this.google.authSuccess) {
      //   this.$router.replace({ name: 'PageAuthenticationPendingRegister', params: { user: this.fullName } });
      // } else {
      //   this.$router.replace({ name: 'PageMainHome' });
      // }
    },

    onSubmitError(err) {
      console.log({ err });
      if (err.response.data.message.includes('Email already exist.')) {
        this.NotifyResponseErrorWithCaption('Email already registered');
      } else {
        this.NotifyResponseErrorWithCaption(err.response.data.message);
      }
    },

    onClickBackButton() {
      this.$router.replace({ name: 'PageAuthenticationLogin' });
    },
  },
  watch: {
    'form.firstName'(newValue) {
      this.form.fullName = `${newValue} ${this.form.lastName}`;
    },
    'form.lastName'(newValue) {
      this.form.fullName = `${this.form.firstName} ${newValue}`;
    },
  },
  mounted() {
    // if (sessionStorage.getItem('load-google-register')) {
    //   sessionStorage.removeItem('load-google-register');
    //   window.location.reload();
    // }
    // this.$q.iconSet.arrow.dropdown = 'expand_more';

    // const googleScript = document.createElement('script');
    // googleScript.src = 'https://accounts.google.com/gsi/client';
    // document.head.appendChild(googleScript);
    // window.addEventListener('load', () => {
    //   window.google.accounts.id.initialize({
    //     client_id: '513433506824-rdcqp7dc9an2gp1csfbpjv7gi9iam6ds.apps.googleusercontent.com',
    //     callback: this.handleCredentialResponse,
    //   });
    //   window.google.accounts.id.renderButton(
    //     document.getElementById('signup_button'),
    //     { theme: 'outline', size: 'large', text: 'signup_with' },
    //   );
    //   window.google.accounts.id.prompt();
    // });
  },
};
</script>

<style scoped>
.txt-register {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.019em;
  color: #1A1A1A;
}
.text-washed {
  color: #B9B9B9;
  text-align: center;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: -0.3px;
}
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
.btn-outline {
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
.separator {
  border-top: 1px solid #B9B9B9;
  width: 118px;
  margin-top: 5px;
}
.btn-back {
  width: 36px;
  height: 36px;
}
</style>
