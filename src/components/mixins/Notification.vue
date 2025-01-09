<script>
export default {
  name: 'MixinNotification',
  methods: {
    NotifyResponseSuccess(caption) {
      this.$q.notify({
        icon: 'img:images/icons/notify-success.svg',
        classes: 'notification-success',
        message: caption,
        position: 'center',
      });
    },

    NotifyResponseWarning(caption) {
      this.$q.notify({
        icon: 'img:images/icons/notify-warning.svg',
        caption,
        classes: 'notification-warning',
        position: 'center',
      });
    },

    NotifyResponseErrorWithCaption(caption) {
      this.$q.notify({
        icon: 'img:images/icons/notify-error.svg',
        caption,
        classes: 'notification-error',
        message: 'Error',
        position: 'center',
      });
    },

    NotifyResponseError(response, attr) {
      let caption = 'Internal server error.';
      if (response.status !== 500) {
        caption = this.getErrorResponseMessage(response.data[attr]);
      }

      this.$q.notify({
        icon: 'img:images/icons/notify-error.svg',
        caption,
        classes: 'notification-error',
        message: 'Error',
        position: 'center',
      });
    },

    getErrorResponseMessage(data) {
      if (Array.isArray(data)) return data.join(', ');
      return data;
    },
  },
};
</script>
