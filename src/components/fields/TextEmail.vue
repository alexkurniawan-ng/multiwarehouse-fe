<template>
  <q-input
    ref="inputTextEmail"
    type="email"
    :label="label"
    :rules="rules"
    :value="value"
    @input="onChangeInput"
    outlined
  />
</template>

<script>
export default {
  name: 'FieldTextEmail',
  props: {
    value: { type: String, default: null },
    label: { type: String, default: 'Email' },
    required: { type: Boolean, default: false },
  },
  computed: {
    rules() {
      const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return [
        (val) => !this.required || !!val || this.$t('login_email_required'),
        (val) => emailFormat.test(val) || this.$t('login_email_invalid'),
      ];
    },
  },
  methods: {
    onChangeInput(val) {
      this.$emit('input', val);
    },
    validate() {
      return this.$refs.inputTextEmail.validate();
    },
  },
};
</script>
