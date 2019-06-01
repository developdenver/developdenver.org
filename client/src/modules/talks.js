import Talk from "../models/talk";
import { shuffle } from "../utilities/shuffle";
import updateInList from '../utilities/updateInList';
import withLoading from '../utilities/withLoading';

export default {
	namespaced: true,
	state: {
		list: [],
	},
	getters: {
		noDependencies: ()=>{ return true; },
		getTalksByUserId: (state) => (userId) => {
			return state.list.filter(talk => talk.properties.userId === userId);
		},
		getTalkById: (state) => (id) => {
			return state.list.find(talk => talk.id == id) || {
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
		setVotes(state, votes) {
			state.votes = votes;
		},
		UPDATE_VOTE(state, { id, voted }) {
			updateInList(state.list, (t) => t.id === id, t => {
				t.properties.voted = voted;
				// FUUUCK this pattern!!
				return new Talk(t.serialize());
			});
		},
		VOTING_ERROR(state, { id, error }) {
			updateInList(state.list, (t) => t.id === id, t => {
				t.properties.error = error;
				// have I mentioned that I find this model shit distasteful?
				return new Talk(t.serialize());
			});
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
		async fetchTalks({ state, commit, dispatch, rootState }) {
			dispatch("services/loading/pushLoading", {}, { root: true });

			let talks = await Talk.fetchAll("talk", rootState.services.user.token);
			talks = talks.map(talk => new Talk(talk));
			commit("updateTalks", shuffle(talks));
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		vote({ dispatch, rootState, commit }, currentTalk) {
			return withLoading(dispatch, () =>
				currentTalk.vote(rootState.services.user.token)
					.then(() => commit('UPDATE_VOTE', { id: currentTalk.id, voted: true }))
					.catch((error) => commit('VOTING_ERROR', { id: currentTalk.id, error }))
			);
		},
		unvote({ dispatch, rootState, commit }, currentTalk) {
			return withLoading(dispatch, () =>
				currentTalk.unvote(rootState.services.user.token)
					.then(() => commit('UPDATE_VOTE', { id: currentTalk.id, voted: false }))
					.catch((error) => commit('VOTING_ERROR', { id: currentTalk.id, error }))
			);
		},
	},
	hagridResources: {
		fetchTalks: 'noDependencies',
	},
};
