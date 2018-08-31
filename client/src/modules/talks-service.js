import Talk from "../models/talk";

console.log(Talk)
export default {
  namespaced: true,
  state: {
    currentTalks: [],
    talks: [],
  },
  getters: {
    getAllTalksByUser(state) {
      return state.currentTalks;
    },
  },
  mutations: {
    addTalk(state, talk) {
      // make this vuexy
      state.talks.push(talk);
    },
    setCurrentTalk(state, talk) {
      // make this vuexy
      state.currentTalks.push(talk);
    },
  },
  actions: {
    async setTalk({ dispatch, commit }, talk) {
      dispatch("services/loading/pushLoading", {}, { root: true });
      await Talk.update();
      commit("setCurrentTalk", talk.properties);
      dispatch("services/loading/popLoading", {}, { root: true });
    },
    async fetchAllTalks({ commit, dispatch }) {
      dispatch("services/loading/pushLoading", {}, { root: true });
      // hmmmm
      dispatch("services/loading/popLoading", {}, { root: true });
    },
    async fetchUserTalks({ commit, dispatch }) {
      dispatch("services/loading/pushLoading", {}, { root: true });
// hmmmmm
      dispatch("services/loading/popLoading", {}, { root: true });
    },
  },
};
