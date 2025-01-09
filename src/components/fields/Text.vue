<template>
  <q-input
    ref="inputText"
    :label="label"
    :rules="rules"
    :value="value"
    :readonly="readonly"
    @input="onChangeInput"
    outlined
  />
</template>

<script>
export default {
  name: 'FieldText',
  props: {
    value: { type: String, default: null },
    label: { type: String, default: 'Text' },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
  },
  computed: {
    rules() {
      return [
        (val) => !this.required || !!val || `${this.label} belum diisi.`,
      ];
    },
  },
  methods: {
    onChangeInput(val) {
      this.$emit('input', val);
    },
    validate() {
      return this.$refs.inputText.validate();
    },
  },
};
</script>
