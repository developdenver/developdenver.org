import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import services from "./modules/services";
import Profile from "./models/profile";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: state => ({services: {user: state.services.user}}),
});

export default new Vuex.Store({
	modules: {
		services,
	},
	state: {
		profiles: [],
		version: "",
	},
	getters: {
		getProfileById: (state) => (id) => {
			return state.profiles.find(profile => +profile.id === +id);
		},
	},
	mutations: {
		updateProfiles(state, profiles) {
			state.profiles = profiles;
		},
	},
	actions: {
		async createProfile({commit}, profile) {
			const token = await profile.create();
			commit("services/user/setProfile", profile);
			commit("services/user/setToken", token);
		},
		async fetchProfiles({commit}) {
			let profiles = await Profile
				.fetchAll("profile");
			profiles = profiles.map(profile => new Profile(profile));
			commit("updateProfiles", profiles);
		},
	},
	plugins: [vuexLocal.plugin]
});
