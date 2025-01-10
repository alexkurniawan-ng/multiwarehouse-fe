<template>
  <div class="btn-request-upload-file row justify-center">
    <input
      ref="fileProductRequest"
      style="display:none"
      type="file"
      accept="image/*"
      @change="onChangeFile"
      @input="$emit('set-leave', false)"
    />
    <div v-if="preview" class="col column items-center justify-center">
      <div class="col">
        <img class="q-mt-lg" :src="preview" />
      </div>
      <div class="col-auto">
        <q-btn
          @click="clearFile"
          class="float-right btn-clear-document"
          icon="img:images/icons/delete.svg"
          round
          flat
        />
      </div>
    </div>
    <div v-else-if="productDetail.image" class="col column items-center justify-center">
      <div class="col">
        <img class="q-mt-lg" :src="productDetail.image" />
      </div>
      <div class="col-auto">
        <q-btn
          @click="removeFile"
          class="float-right btn-clear-document"
          icon="img:images/icons/delete.svg"
          round
          flat
        />
      </div>
    </div>
    <div v-else class="q-my-lg q-mx-auto">
      <div class="row justify-center items-center upload-icon cursor-pointer" @click="onTakeFile">
        <img src="images/icons/camera.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateProductUpload',
  props: {
    productDetail: { type: Object, default: null },
  },
  data() {
    return {
      preview: null,
    };
  },

  methods: {
    onTakeFile() {
      this.$refs.fileProductRequest.click();
    },

    onChangeFile(value) {
      if (value.target.files.length === 0) return;

      const reader = new FileReader();
      reader.onload = ({ target }) => { this.preview = target.result; };
      reader.readAsDataURL(value.target.files[0]);
      // eslint-disable-next-line vue/no-mutating-props
      this.productDetail.uploadPicture = Array.from(value.target.files);
    },

    clearFile() {
      this.preview = null;
    },

    removeFile() {
      // eslint-disable-next-line vue/no-mutating-props
      this.productDetail.image = null;
    },
  },
};
</script>

<style scoped>
.btn-request-upload-file img {
  max-width: 100%;
}
.upload-icon {
  width: 125px;
  height: 125px;
  background-color: #FCFCFC;
  border-radius: 50%;
}
</style>
