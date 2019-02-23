import Profile from '../models/profile';
import jwtDecode from 'jwt-decode';
import withLoading from '../utilities/withLoading';

const loginUrl = `${process.env.VUE_APP_API_URL}/${
	process.env.VUE_APP_LOGIN_PATH
}`;
const profileUrl = `${process.env.VUE_APP_API_URL}/profiles`;
const passwordResetUrl = `${process.env.VUE_APP_API_URL}/${
	process.env.VUE_APP_RESET_PASSWORD_PATH
}`;
const resetRequestUrl = `${process.env.VUE_APP_API_URL}/${
	process.env.VUE_APP_RESET_REQUEST_PATH
}`;

export default {
	namespaced: true,
	state: {
		currentProfile: {},
		token: '',
	},
	getters: {
		isLoggedIn(state) {
			return state.currentProfile ? !!state.currentProfile.id : false;
		},
		isAttendee(state) {
			return state.currentProfile
				? !!state.currentProfile.ticketLevel
				: false;
		},
		hasToken(state) {
			return !!state.token;
		},
		currentProfile(state) {
			return state.currentProfile
				? new Profile(state.currentProfile)
				: {};
		},
	},
	mutations: {
		logout(state) {
			state.token = '';
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
			dispatch('services/loading/pushLoading', {}, { root: true });
			await fetch(loginUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: email,
					password: password,
				}),
			})
				.then(response => {
					if (+response.status !== 201) {
						dispatch('logout');
						throw new Error('Incorrect username or password');
					} else {
						return response.json();
					}
				})
				.then(response => {
					commit('setToken', response.jwt);
					commit('setProfile', new Profile(response.user).properties);
					dispatch('services/loading/popLoading', {}, { root: true });
				})
				.catch(error => {
					dispatch('services/loading/popLoading', {}, { root: true });
					throw new Error(error.message);
				});
		},
		logout({ commit }) {
			commit('logout');
		},
		setToken({ commit }, token) {
			commit('setToken', token);
		},
		async setProfile({ dispatch, commit, state }, profile) {
			dispatch('services/loading/pushLoading', {}, { root: true });
			await profile.update(state.token);
			commit('setProfile', profile.properties);
			dispatch('services/loading/popLoading', {}, { root: true });
		},
		async setAttendee({ dispatch, commit, getters, state }, level) {
			dispatch('services/loading/pushLoading', {}, { root: true });
			let profile = getters.currentProfile;
			profile.setTicketLevel(level);
			await profile.update(state.token);
			commit('setProfile', profile.properties);
			dispatch('services/loading/popLoading', {}, { root: true });
		},
		fetchProfile({ commit, dispatch, rootState }) {
			return withLoading(dispatch, async () => {
				const jwt = rootState.services.user.token;
				if (jwt) {
					const id = jwtDecode(jwt).sub;
					const userProfileUrl = `${profileUrl}/${id}`;
					await fetch(userProfileUrl, {
						headers: {
							authorization: `Bearer ${jwt}`,
						},
					})
						.then(response => response.json())
						.then(response => commit('setProfile', response.data))
						.catch(() => commit('logout'));
				}
			});
		},
		async requestReset({ dispatch }, email) {
			dispatch('services/loading/pushLoading', {}, { root: true });
			await fetch(resetRequestUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			}).catch(error => console.error(error.message));
			dispatch('services/loading/popLoading', {}, { root: true });
		},
		async resetPassword({ dispatch }, { password, token }) {
			dispatch('services/loading/pushLoading', {}, { root: true });
			await fetch(passwordResetUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ password }),
			})
				.then(response => {
					if (+response.status !== 201) {
						throw new Error('Server problem');
					}
					dispatch('services/loading/popLoading', {}, { root: true });
				})
				.catch(error => {
					console.error(error.message);
					dispatch('services/loading/popLoading', {}, { root: true });
					throw new Error(error.message);
				});
		},
	},
};
