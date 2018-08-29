import { firebaseAction } from 'vuexfire'

export default {
  namespaced: true,
  state: {
    robocon: {},
    roboconRef: null
  },
  mutations: {
    setRef(state, ref) {
      state.roboconRef = ref
    }
  },
  actions: {
    setRef: firebaseAction(
      ({ commit, bindFirebaseRef }, { ref, callbacks }) => {
        bindFirebaseRef('robocon', ref, callbacks)
        commit('setRef', ref)
      }
    )
  }
}
