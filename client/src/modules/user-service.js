import { hashPassword } from "../utilities/auth";
import Profile from "../models/profile";
import jwtDecode from "jwt-decode";

export default {
	namespaced: true,
	state: {
		currentProfile: new Profile({}),
		token: "",
	},
	getters: {
		isLoggedIn(state) {
			return !!state.currentProfile.id;
		},
		isAttendee(state) {
			return !!state.currentProfile.properties.ticketLevel;
		},
	},
	mutations: {
		logout(state) {
			state.token = "";
			state.currentProfile = new Profile({});
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
			commit("setProfile", new Profile(user));
		},
		logout({ commit }) {
			return commit("logout");
		},
		setToken({ commit }, token) {
			return commit("setToken", token);
		},
		setProfile({ commit }, profile) {
			return commit("setProfile", new Profile(profile));
		},
		setAttendee({ commit, getters }, value) {
			const profile = getters.currentProfile;
			console.log("setAttendee", profile);
			profile.setTicketLevel(value);
			return commit("setProfile", profile.serialize());
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
				return commit("setProfile", new Profile(profile));
			}
		},
	},
};
