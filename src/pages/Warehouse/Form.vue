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
        <div style="font-size: 20px; margin-top: 4px">Warehouse Detail</div>
      </div>
      <div class="q-ml-md">
        <q-input class="q-my-md" type="text" v-model="warehouseDetail.name" label="Name" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="text" v-model="warehouseDetail.description" label="Description" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="text" v-model="warehouseDetail.street" label="Street" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="text" v-model="warehouseDetail.city" label="City" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="text" v-model="warehouseDetail.province" label="Province" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="text" v-model="warehouseDetail.postalCode" label="Postal Code" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="number" v-model="warehouseDetail.lat" label="Latitude" :readonly="!isSuperAdmin" />
        <q-input class="q-my-md" type="number" v-model="warehouseDetail.lng" label="Longitude" :readonly="!isSuperAdmin" />
        <!-- <q-input class="q-my-md" type="text" v-model="warehouseDetail.adminWarehouse" label="Admins" /> -->
        <div v-if="isSuperAdmin">
          <q-btn
            class="q-mx-auto q-my-md q-py-xs button-save"
            no-caps
            label="Save"
            @click="onSubmit"
            :loading="loadingSubmit"
            type="submit"
          />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PageWarehouseDetail',
  computed: {
    ...mapState({
      warehouseList: (state) => state.warehouse.warehouseList,
      loading: (state) => state.warehouse.loading,
      user: (state) => state.authentication.user,
    }),
  },
  data() {
    return {
      warehouseDetail: {
        id: '',
        name: '',
        description: '',
        street: '',
        city: '',
        province: '',
        postalCode: '',
        lat: 0,
        lng: 0,
        // adminWarehouse: ''
      },
      loadingSubmit: false,
      isSuperAdmin: false,
    };
  },
  methods: {
    onSuccessGetDetail(data) {
      this.warehouseDetail.id = data.warehouseId;
      this.warehouseDetail.name = data.name;
      this.warehouseDetail.description = data.description;
      this.warehouseDetail.street = data.street;
      this.warehouseDetail.city = data.city;
      this.warehouseDetail.province = data.province;
      this.warehouseDetail.postalCode = data.postalCode;
      this.warehouseDetail.lat = data.lat;
      this.warehouseDetail.lng = data.lng;
    },
    onSubmit() {
      this.loadingSubmit = true;
      this.$store
        .dispatch('warehouse/updateWarehouse', {
          id: this.warehouseDetail.id,
          name: this.warehouseDetail.name,
          description: this.warehouseDetail.description,
          street: this.warehouseDetail.street,
          city: this.warehouseDetail.city,
          province: this.warehouseDetail.province,
          postalCode: this.warehouseDetail.postalCode,
          lat: this.warehouseDetail.lat,
          lng: this.warehouseDetail.lng
        })
        .then(this.onSubmitSuccess)
        .catch((err) => this.onSubmitError(err));
    },
    onSubmitSuccess() {
      this.loadingSubmit = false;
      this.$router.push({ name: 'PageWarehouseList' });
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
    if (this.warehouseList.length > 0) {
      const detail = this.warehouseList.find((warehouse) => warehouse.warehouseId === id);
      this.onSuccessGetDetail(detail);
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
