import Talk from "../models/talk";

export default {
	namespaced: true,
	state: {
		list: [],
		votedOnTalks: [],
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
		setVotedOnTalks(state, talks) {
			state.votedOnTalks = talks;
		}
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
		async fetchVotedOnTalks({ commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let talks = await Talk.fetchAllVoted();
			commit("setVotedOnTalks", talks);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async vote({ dispatch }, currentTalk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await currentTalk.vote();
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { root: true });
			}
			return success;
		},
		async unvote({ dispatch }, currentTalk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await currentTalk.unvote();
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { root: true });
			}
			return success;
		}
	},
};
