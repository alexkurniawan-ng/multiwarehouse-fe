<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <q-btn
          flat
          no-caps
          class="col-auto btn-back"
          icon="img:images/icons/back.svg"
          @click="onClickBackButton"
        />
        <div style="font-size: 20px; margin-top: 4px">Product Detail</div>
      </div>
      <div class="q-ml-md">
        <q-input class="q-my-md" type="text" v-model="productDetail.name" label="Name" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="text" v-model="productDetail.description" label="Description" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="number" v-model="productDetail.price" label="Price" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="number" v-model="productDetail.quantity" label="Quantity" readonly />
        <q-select
          v-if="isSuperAdmin"
          class="q-my-md"
          label="Category"
          transition-show="jump-down"
          transition-hide="jump-up"
          v-model="productDetail.categoryName"
          :options="optionCategory"
          popup-content-style="font-family: 'Poppins'; font-size: 14px"
          @input="onChangeInput"
        />
        <q-input v-else class="q-my-md" type="text" v-model="productDetail.categoryName" label="Category" :readonly="!isSuperAdmin" />

        <q-select
          v-if="isSuperAdmin"
          class="q-my-md"
          label="Status"
          transition-show="jump-down"
          transition-hide="jump-up"
          v-model="productDetail.status"
          :options="optionStatus"
          popup-content-style="font-family: 'Poppins'; font-size: 14px"
          @input="onChangeStatus"
        />
        <q-input v-else class="q-my-md" type="text" v-model="productDetail.status" label="Status" :readonly="!isSuperAdmin" />

        <TemplateProductUpload v-if="isSuperAdmin" :productDetail="productDetail" />
        <img v-else class="q-mt-md" :src="productDetail.image" />
        <!-- <q-input class="q-my-md" type="text" v-model="productDetail.image" label="Image" /> -->

        <q-btn
          v-if="isSuperAdmin"
          class="q-mx-auto q-my-md q-py-xs button-save"
          no-caps
          label="Save"
          @click="onSubmit"
          :loading="loadingSubmit"
          type="submit"
        />
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import TemplateProductUpload from 'components/templates/Product/UploadFile';

export default {
  name: 'PageProductDetail',
  components: {
    TemplateProductUpload,
  },
  computed: {
    ...mapState({
      productList: (state) => state.product.productList,
      categoryList: (state) => state.product.categoryList,
      loading: (state) => state.warehouse.loading,
      user: (state) => state.authentication.user,
    }),
  },
  data() {
    return {
      productDetail: {
        id: '',
        name: '',
        description: '',
        price: '',
        quantity: '',
        categoryName: '',
        categoryId: '',
        status: '',
        image: '',
        uploadPicture: null,
      },
      optionCategory: [],
      optionStatus: ['ACTIVE', 'DISCONTINUED'],
      loadingSubmit: false,
      isSuperAdmin: false,
    };
  },
  methods: {
    onSuccessGetDetail(data) {
      this.productDetail.id = data.warehouseId;
      this.productDetail.name = data.name;
      this.productDetail.description = data.description;
      this.productDetail.price = data.price;
      this.productDetail.quantity = data.quantity;
      this.productDetail.categoryId = data.categoryId;
      this.productDetail.status = data.status;
      this.productDetail.image = data.image;
      this.productDetail.categoryName = this.categoryList.find((category) => category.id === data.categoryId).name;
    },
    onChangeInput(val) {
      this.productDetail.categoryId = this.categoryList.find((category) => category.name === val).id;
    },
    onChangeStatus(newStatus) {
      this.productDetail.status = newStatus;
    },
    onUploadPicture(callback) {
      const formData = new FormData();
      this.productDetail.uploadPicture.map((file) => formData.append('files', file));
      this.$store.dispatch('product/uploadPicture', formData)
        .then(callback)
        .catch(this.onError);
    },
    onSubmit() {
      this.loadingSubmit = true;
      if (this.productDetail.uploadPicture.length) {
        this.onUploadPicture(this.onSubmitForm);
      } else this.onSubmitForm(null);
    },
    submitForm() {
      this.$store
        .dispatch('product/updateProduct', {
          id: this.productDetail.id,
          name: this.productDetail.name,
          description: this.productDetail.description,
          price: this.productDetail.price,
          quantity: this.productDetail.quantity,
          categoryId: this.productDetail.categoryId,
          status: this.productDetail.status,
          image: this.productDetail.image
        })
        .then(this.onSubmitSuccess)
        .catch((err) => this.onSubmitError(err));
    },
    onSubmitSuccess() {
      this.loadingSubmit = false;
      this.$router.push({ name: 'PageProductList' });
    },
    onSubmitError(err) {
      console.error(err);
      this.loadingSubmit = false;
    },
    onClickBackButton() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.replace({ name: 'PageAuthenticationLogin' });
      }
    },
  },
  mounted() {
    const { id } = this.$route.params;
    console.log({ id })
    if (this.productList.length > 0 && this.categoryList.length > 0) {
      const detail = this.productList.find((product) => product.id === id);
      this.onSuccessGetDetail(detail);
      this.categoryList.forEach((category) => {
        this.optionCategory.push({
          label: category.name,
          value: category.id,
        });
      })
    }
    if (window.localStorage.getItem('roles') === 'super_admin') {
      console.log('super admin true')
      this.isSuperAdmin = true;
    }
  }
}
</script>

<style scoped>
.button-save {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.005em;
  background-color:#4DA6FF;
  color: white;
  width: 100%;
  border-radius: 10px;
}
</style>
