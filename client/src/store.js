import Vue from "vue";
import Vuex from "vuex";

import {version} from "../package.json";

import services from "./modules/services";
import Profile from "./models/profile";
Vue.use(Vuex);

const store = new Vuex.Store({
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
		initializeStore(state) {
			const storeString = localStorage.getItem("store");

			if (storeString) {
				const store = JSON.parse(storeString);
				if (store.version == version) {
					this.replaceState(
						Object.assign(state, store)
					);
				} else {
					state.version = version;
				}
			}
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
});

store.subscribe((mutation, state) => {
	localStorage.setItem("store", JSON.stringify(state));
});

export default store;
