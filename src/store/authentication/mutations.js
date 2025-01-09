export function VALID_TOKEN(state, payload) {
  state.validToken = payload;
}

export function USER(state, payload) {
  state.user = payload;
}

export function LOADING(state, payload) {
  state.loading = payload;
}
