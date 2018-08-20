import { hashPassword } from "../utilities/auth";
import Profile from "../models/profile";
import jwtDecode from "jwt-decode";

export default {
	namespaced: true,
	state: {
		currentProfile: {},
		token: "",
	},
	getters: {
		isLoggedIn(state) {
			return !!state.currentProfile.id;
		},
		isAttendee(state) {
			return !!state.currentProfile.ticketLevel;
		},
		currentProfile(state) {
			return new Profile(state.currentProfile);
		}
	},
	mutations: {
		logout(state) {
			state.token = "";
			state.currentProfile = {};
		},
		setToken(state, token) {
			state.token = token;
		},
		setProfile(state, profile) {
			state.currentProfile = profile;
		},
	},
	actions: {
		async login({ dispatch, commit }, { email, password }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			const loginUrl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_LOGIN_PATH}`;
			const hashedPassword = await hashPassword(password);
			const { user, jwt } = await fetch(loginUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: email,
					password: hashedPassword,
				}),
			}).then(response => response.json())
				.catch(error => console.error(error.message));
			commit("setToken", jwt);
			commit("setProfile", new Profile(user).properties);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		logout({ commit }) {
			commit("logout");
		},
		setToken({ commit }, token) {
			commit("setToken", token);
		},
		setProfile({ dispatch, commit }, profile) {
			commit("setProfile", profile);
		},
		async setAttendee({ dispatch, commit, getters }, level) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let profile = getters.currentProfile;
			profile.setTicketLevel(level);
			await profile.update();
			commit("setProfile", profile.properties);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async fetchProfile({ getters, commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			const jwt = getters.token;
			if (jwt) {
				const id = jwtDecode(jwt).sub;
				const profileUrl = `${process.env.VUE_APP_API_URL}/profiles/${id}`;
				const profile = await fetch(profileUrl, {
					headers: {
						authorization: `Bearer ${jwt}`,
					},
				}).then(response => response.json())
					.then(response => response.data);
				commit("setProfile", profile);
			}
			dispatch("services/loading/popLoading", {}, { root: true });
		},
	},
};
