import Vue from "vue";
import Vuex from "vuex";

import services from "./modules/services";
import Profile from "./models/profile";
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		services,
	},
	state: {
		profiles: [],
		currentProfile: {},
	},
	getters: {
		getProfileById: (state) => (id) => {
			return state.profiles.find(profile => profile.id == id);
		},
	},
	mutations: {
		updateProfiles(state, profiles) {
			state.profiles = profiles;
		},
		saveCurrentProfile(state, profile) {
			state.currentProfile = profile;
		},
	},
	actions: {
		async createProfile({commit, }, profile) {
			const token = await profile.create();
			commit("services/user/setProfile", profile);
			commit("services/user/setToken", token);
		},
		async fetchProfiles({commit, }) {
			const profiles = await Profile.fetchAll("profile");
			commit("updateProfiles", profiles);
		},
	},
});
