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
		isLoggedIn(state, getters) {
			return !!getters.currentProfile.id;
		},
		isAttendee(state, getters) {
			return !!getters.currentProfile.properties.ticketLevel;
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
		async login({ commit }, { email, password }) {
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
			}).then(response => response.json());
			commit("setToken", jwt);
			commit("setProfile", new Profile(user).properties);
		},
		logout({ commit }) {
			commit("logout");
		},
		setToken({ commit }, token) {
			commit("setToken", token);
		},
		setProfile({ commit }, profile) {
			commit("setProfile", profile);
		},
		async setAttendee({ commit, getters }, level) {
			let profile = getters.currentProfile;
			profile.setTicketLevel(level);
			await profile.update();
			commit("setProfile", profile.properties);
		},
		async fetchProfile({ getters, commit }) {
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
				return commit("setProfile", profile);
			}
		},
	},
};
