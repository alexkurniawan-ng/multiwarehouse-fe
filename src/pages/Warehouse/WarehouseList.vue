<template>
  <q-page>
    <div v-if="loading" class="row q-pa-md q-mx-auto">
      <q-spinner-ios
        class="spinner color-purchases"
        size="lg"
      />
    </div>
    <div v-else class="row q-pa-md">
      <div v-for="warehouse in warehouseUpdatedList" :key="warehouse.id" class="col-12">
        <q-card class="warehouse-card" @click="goToDetail(warehouse.warehouseId)">
          <q-card-section>
            <div class="text-title color-purchases">{{ warehouse.name }}</div>
            <div class="text-grey q-mt-xs">{{ warehouse.description }}</div>
            <div class="text-subtitle q-mt-sm">Location: {{ warehouse.city }}, {{ warehouse.province }}</div>
            <div class="text-subtitle q-mt-xs">Admins: {{ warehouse.adminWarehouse.toString() + ' ' }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageListWarehouse',
  data() {
    return {
      warehouseUpdatedList: [],
    };
  },
  computed: {
    ...mapState({
      warehouseList: (state) => state.warehouse.warehouseList,
      loading: (state) => state.warehouse.loading,
    })
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'PageWarehouseDetail', params: { id } });
    }
  },
  mounted() {
    const token = window.localStorage.getItem('token');
    this.$store.dispatch('warehouse/getWarehouseList', { token })
      .then((response) => this.warehouseUpdatedList = response)
      .catch(() => {
        console.log('error');
      });
  }

}
</script>

<style scoped>
.warehouse-card {
  width: 95%;
  margin: 0 auto 20px;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(33,33,33,.15) !important;
  cursor: pointer;
}
.text-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.011em;
}
.text-customer {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.011em;
  color: #333333;
}
.text-order {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #A3A3A3;
}
.text-date {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #A3A3A3;
}
.text-subtitle {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #1A1A1A;
}
</style>
