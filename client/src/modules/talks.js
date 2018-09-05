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
		hasVotedOnThisTalk: (state) => (talkId) => {
			const match = state.votedOnTalks.filter(talk => {
				return talk.talk_id === talkId;
			});
			return (match.length > 0);
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
		async fetchAllVotes({ commit, dispatch, rootState }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let talks = await Talk.fetchVotes(rootState.services.user.token);
			commit("setVotedOnTalks", talks.data);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async vote({ dispatch, rootState }, currentTalk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await currentTalk.vote(rootState.services.user.token);
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { root: true });
			}
			return success;
		},
		async unvote({ dispatch, rootState }, currentTalk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await currentTalk.unvote(rootState.services.user.token);
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { root: true });
			}
			return success;
		}
	},
};
