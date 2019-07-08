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
		UPDATE_TALK(state, { id, changes }) {
			updateInList(state.list, (t) => t.id === id, t => {
				t.properties = { ...t.properties, ...changes };
				// FUUUCK this pattern!!
				return new Talk(t.serialize());
			});
		},
		INSERT_TALK(state, talk) {
			state.list = [...state.list, new Talk(talk.serialize())];
		},
	},
	actions: {
		async createTalk({ dispatch, commit, rootState }, talk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				success = await talk.create(rootState.services.user.token);
				commit('INSERT_TALK', talk);
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
				commit('UPDATE_TALK', { id: talk.id, changes: talk.properties });
				// grumble grumble
				await dispatch('events/updatedEvent', { id: talk.id, changes: talk.properties }, { root: true });
			} catch (error) {
				console.error(error);
				success = false;
				commit('UPDATE_TALK', { id: talk.id, changes: { error } });
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
					.then(() => commit('UPDATE_VOTE', { id: currentTalk.id, changes: { voted: true } }))
					.catch((error) => commit('VOTING_ERROR', { id: currentTalk.id, changes: { error } }))
			);
		},
		unvote({ dispatch, rootState, commit }, currentTalk) {
			return withLoading(dispatch, () =>
				currentTalk.unvote(rootState.services.user.token)
					.then(() => commit('UPDATE_VOTE', { id: currentTalk.id, changes: { voted: false } }))
					.catch((error) => commit('VOTING_ERROR', { id: currentTalk.id, changes: { error } }))
			);
		},
	},
	hagridResources: {
		fetchTalks: 'noDependencies',
	},
};
