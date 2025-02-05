<template>
  <q-page>
    <div v-if="loading" class="row q-pa-md q-mx-auto">
      <q-spinner-ios
        class="spinner color-purchases"
        size="lg"
      />
    </div>
    <div v-else>
      <div class="row">
        <!-- SEARCH -->
        <q-input
          class="search-box q-mx-lg q-mt-md"
          type="text"
          v-model="query"
          placeholder="Search product..."
          borderless
          debounce="300"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn class="q-mx-md q-mt-md" no-caps icon="add" label="Reset" @click="createProduct" />
      </div>

      <!-- FILTERED -->
      <div v-if="query" class="row q-pa-md justiy-center">
        <q-card v-for="list, index in filteredProductList.filter((product) => product.status === 'ACTIVE')" :key="index" class="menu-card q-ma-sm" flat>
            <q-card-section class="image-container">
              <div class="row items-center justify-center q-my-sm" @click="goToDetail(list.id)">
                <img v-if="list.images.length > 0" class="img-default" :src="list.images[0]" />
                <img v-else class="img-default" src="images/product-icon.png" />
              </div>
              <div class="row title">
                <div class="text-title">{{ list.name }}</div>
              </div>
              <div class="row title">
                <div class="text-price">Rp.{{ list.price.toLocaleString() }}</div>
              </div>
              <div class="row title">
                <div class="text-stock">{{ list.quantity }} stock</div>
              </div>
              <div>
                <q-btn
                  v-if="!isUser && list.quantity > 0"
                  class="q-mx-auto q-mt-sm button-save"
                  no-caps
                  label="Add to Cart"
                  type="submit"
                  @click="editDetail(list.id)"
                />
                <q-btn
                  v-else-if="list.quantity > 0"
                  class="q-mx-auto q-mt-sm button-save"
                  no-caps
                  label="Add to Cart"
                  type="submit"
                  @click="addToCart"
                />
                <q-btn
                  v-else
                  class="q-mx-auto q-mt-sm button-out"
                  no-caps
                  label="Out of Stock"
                  disabled
                />
              </div>
            </q-card-section>
        </q-card>
      </div>

      <!-- NOT FILTERED -->
      <div v-else class="row q-pa-md justiy-center">
        <q-card v-for="list, index in productUpdatedList.filter((product) => product.status === 'ACTIVE')" :key="index" class="menu-card q-ma-sm" flat>
            <q-card-section class="image-container">
              <div class="row items-center justify-center q-my-sm" @click="goToDetail(list.id)">
                <img v-if="list.image !== null" class="img-default" :src="list.image" />
                <img v-else class="img-default" src="images/product-icon.png" />
              </div>
              <div class="row title">
                <div class="text-title">{{ list.name }}</div>
              </div>
              <div class="row title">
                <div class="text-price">Rp.{{ list.price.toLocaleString() }}</div>
              </div>
              <div class="row title">
                <div class="text-stock">{{ list.quantity }} stock</div>
              </div>
              <div>
                <q-btn
                  v-if="!isUser && list.quantity > 0"
                  class="q-mx-auto q-mt-sm button-save"
                  no-caps
                  label="Add to Cart"
                  type="submit"
                  @click="editDetail(list.id)"
                />
                <q-btn
                  v-else-if="list.quantity > 0"
                  class="q-mx-auto q-mt-sm button-save"
                  no-caps
                  label="Add to Cart"
                  type="submit"
                  @click="addToCart"
                />
                <q-btn
                  v-else
                  class="q-mx-auto q-mt-sm button-out"
                  no-caps
                  label="Out of Stock"
                  disabled
                />
              </div>
            </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import { create } from 'core-js/core/object';
import { mapState } from 'vuex';

export default {
  name: 'PageListProduct',
  data() {
    return {
      productUpdatedList: [],
      categoryUpdatedList: [],
      query: '',
      isUser: true,
    };
  },
  computed: {
    ...mapState({
      productList: (state) => state.product.productList,
      loading: (state) => state.product.loading,
    }),
    filteredProductList() {
      return this.productUpdatedList.filter((product) => product.name.toLowerCase().includes(this.query.toLowerCase()));
    },
  },
  methods: {
    editDetail(id) {
      if (!id) {
        this.$router.push({ name: 'PageCreateProductDetail' });
      } else {
        this.$router.push({ name: 'PageEditProductDetail', params: { id } });
      }
    },
    addToCart() {
      console.log('Item added to cart')
    },
    goToDetail(id) {
      this.$router.push({ name: 'PageProductDetail', params: { id } });
    }
  },
  mounted() {
    // const token = window.localStorage.getItem('token');
    this.$store.dispatch('product/getProductList')
      .then((response) => this.productUpdatedList = response)
      .catch(() => {
        console.log('error');
      });
    this.$store.dispatch('product/getCategoryList')
      .then((response) => this.categoryUpdatedList = response)
      .catch(() => {
        console.log('error');
      });
    if (window.localStorage.getItem('roles') !== 'user') {
      this.isUser = false;
    }
  }

}
</script>

<style scoped>
.search-box {
  font-family: 'Poppins';
  border-radius: 10px;
  font-size: 14px;
  border: 1px solid #D6D6D6;
  /* height: 40px; */
  margin-top: 20px;
  padding-left: 10px;
}

.menu-card {
  width: 200px;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(33, 33, 33, .15) !important;
  cursor: pointer;
}

.menu-card-section {
  width: 100%;
  height: 100%;
}
.image-container{
  height: 100%;
  margin:0px;
  padding:13px;
}
.img-default {
  height: 125px;
  width: 125px;
}

.text-title {
  max-width: 75%;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.011em;
  color: #1A1A1A;
}

.text-price {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #1A1A1A;
}

.text-stock {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  margin-top: 5px;
  color: #4D4D4D;
}

.text-stock-min {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #F84C4C;
}

.text-no-product {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #4D4D4D;
  margin-top: 10%;
  text-align: center;
}

.form-button {
  background-color: #4DA6FF;
  color: white;
}

.button-save {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.011em;
  color: #FFFFFF;
  background-color: #4DA6FF;
  border-radius: 10px !important;
  width: 100%;
}

.button-out {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.011em;
  color: #FFFFFF;
  background-color: #ff4d4d;
  border-radius: 10px !important;
  width: 100%;
}

.input-product {
  width: 368px;
}

.title{
  width: 85%;
  margin: auto 0px;
}

.stock{
  margin: auto 0px;
}

.menu-drawer {
  width: 100%;
}

.head{
  display: flex;
  flex-direction: row;
}

.dropdown{
  font-family: 'Poppins';
  border-radius: 10px;
  font-size: 14px;
  border: 1px solid #D6D6D6;
  /* height: 40px; */
  margin-top: 20px;
  padding-left: 10px;
  width: 60%;
  margin-right: 10px;
  box-shadow: none;
  display: flex;
}
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
  border-radius: 8px;
}
</style>
