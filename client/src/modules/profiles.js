import Profile from "../models/profile";

export default {
	namespaced: true,
	state: {
		list: [],
	},
	getters: {
		getProfileById: state => id => {
			return state.list.find(profile => +profile.id === +id);
		},
	},
	mutations: {
		updateProfiles(state, profiles) {
			state.list = profiles;
		},
	},
	actions: {
		async createProfile({ commit, dispatch }, profile) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			const jwt = await profile.create();
			commit("services/user/setProfile", profile.properties, {
				root: true,
			});
			commit("services/user/setToken", jwt, { root: true });
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async fetchProfiles({ commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let profiles = await Profile.fetchAll("profile");
			profiles = profiles.map(profile => new Profile(profile));
			commit("updateProfiles", profiles);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
	},
};
