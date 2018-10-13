import Talk from "../models/talk";
import {shuffle} from "../utilities/shuffle";

export default {
	namespaced: true,
	state: {
		list: [],
		votes: [],
	},
	getters: {
		getTalksByUserId: (state) => (userId) => {
			return state.list.filter(talk => talk.properties.userId === userId);
		},
		getTalkById: (state) => (id) => {
			console.log(JSON.parse(JSON.stringify(state.list)))
			return state.list.find(talk => talk.id === id) || {
				properties: {
					title: "Loading...",
					type: "",
					talkPhotoUrl: "",
					description: "Loading..."
				},
			};
		},
		/*
		votedTalksById: (state) => {
			return state.votes.reduce((byId, vote) => {
				byId[vote.talk_id] = true;
				return byId;
			}, {});
		},
		*/
	},
	mutations: {
		updateTalks(state, talks) {
			state.list = talks;
		},
		/*
		setVotes(state, votes) {
			state.votes = votes;
		}
		*/
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
		async fetchTalks({ state, commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });

			let talks = await Talk.fetchAll("talk");
			talks = talks.map(talk => new Talk(talk));
			commit("updateTalks", shuffle(talks));
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		/*
		async fetchAllVotes({ commit, dispatch, rootState }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let votes = await Talk.fetchVotes(rootState.services.user.token);
			commit("setVotes", votes.data);
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
		},
		*/
	},
};
