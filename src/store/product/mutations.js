export function PRODUCT_LIST(state, payload) {
  console.log('Get payload Product List: ', payload)
  state.productList = payload;
}

export function CATEGORY_LIST(state, payload) {
  console.log('Get payload Category List: ', payload)
  state.categoryList = payload;
}

export function LOADING(state, payload) {
  state.loading = payload;
}
