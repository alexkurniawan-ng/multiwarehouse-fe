<template>
  <q-input
    ref="inputTextPassword"
    type="password"
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
    label: { type: String, default: 'Password' },
    required: { type: Boolean, default: false },
  },
  computed: {
    rules() {
      return [
        (val) => !this.required || !!val || this.$t('login_password_required'),
      ];
    },
  },
  methods: {
    onChangeInput(val) {
      this.$emit('input', val);
    },
    validate() {
      return this.$refs.inputTextPassword.validate();
    },
  },
};
</script>
