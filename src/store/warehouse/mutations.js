export function WAREHOUSE_LIST(state, payload) {
  console.log('Get payload Warehouse List: ', payload)
  state.warehouseList = payload;
}

export function LOADING(state, payload) {
  state.loading = payload;
}
