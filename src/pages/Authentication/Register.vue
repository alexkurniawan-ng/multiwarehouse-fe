<template>
  <div class="row q-pa-md" >
    <TemplateRegisterForm :fields="fields" />
  </div>
</template>

<script>
import MixinNotification from 'components/mixins/Notification';
import TemplateRegisterForm from 'components/templates/Register/Form';

export default {
  name: 'PageAuthenticationRegister',
  mixins: [MixinNotification],
  components: {
    TemplateRegisterForm,
  },
};
</script>
