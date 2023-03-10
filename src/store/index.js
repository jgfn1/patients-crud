import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "data",
  storage: window.sessionStorage,
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    loggedIn: false,
  },
  mutations: {
    LOGIN(state) {
      state.loggedIn = true;
    },
    LOGGED_OUT(state) {
      state.loggedIn = false;
    },
  },
  actions: {
    login({ commit }) {
      commit("LOGIN");
    },
    logout({ commit }) {
      commit("LOGGED_OUT");
    },
  },
  getters: {
    isLoggedIn: (state) => state.loggedIn,
  },
});
