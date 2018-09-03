import Talk from "../models/talk";

export default {
	namespaced: true,
	state: {
		list: [],
	},
	getters: {
		getTalksByUserId: (state) => (userId) => {
			return state.list.filter(talk => talk.properties.userId === userId);
		},
		getTalkById: (state) => (id) => {
			return state.list.find(talk => talk.id === id) || {
				properties: {
					title: "Loading...",
					type: "",
					talkPhotoUrl: "",
					description: "Loading..."
				},
			};
		},
	},
	mutations: {
		updateTalks(state, talks) {
			state.list = talks;
		},
	},
	actions: {
		async createTalk({ dispatch, commit, rootState }, talk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await talk.create(rootState.services.user.token);
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { root: true });
			}
			return success;
		},
		async updateTalk({ dispatch, commit, rootState }, talk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await talk.update(rootState.services.user.token);
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { root: true });
			}
			return success;
		},
		async fetchTalks({ commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let talks = await Talk.fetchAll("talk");
			talks = talks.map(talk => new Talk(talk));
			commit("updateTalks", talks);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
	},
};
