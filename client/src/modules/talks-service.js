import Profile from "../models/profile";
import jwtDecode from "jwt-decode";

const loginUrl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_LOGIN_PATH}`;
const profileUrl = `${process.env.VUE_APP_API_URL}/profiles`;
const passwordResetUrl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_RESET_PASSWORD_PATH}`;
const resetRequestUrl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_RESET_REQUEST_PATH}`;

export default {
  namespaced: true,
  state: {
    talks: [],
  },
  getters: {
    getAllTalksByUser(state) {
      // probably? // but how without argument?
    },
  },
  mutations: {
    addTalk(state, talk) {
      // make this vuexy
      state.talks.push(talk);
    },
    setTalk(state, talk) {
      // find talk matching that id, update it
    },
  },
  actions: {
    async setTalk({ dispatch, commit }, profile) {
      dispatch("services/loading/pushLoading", {}, { root: true });
      await talk.update();
      commit("setTalk", talk.properties);
      dispatch("services/loading/popLoading", {}, { root: true });
    },
    async fetchAllTalks({ getters, commit, dispatch }) {
      dispatch("services/loading/pushLoading", {}, { root: true});
      // get all talks for user via getter or to use mapState in componento? loading question.
      dispatch("services/loading/popLoading", {}, { root: true });
    },
    async fetchUserTalks({ getters, commit, dispatch }) {
      dispatch("services/loading/pushLoading", {}, { root: true });
      // get them talks via getter or to use mapSTate in component? loading question
      dispatch("services/loading/popLoading", {}, { root: true });
    },
  },
};
