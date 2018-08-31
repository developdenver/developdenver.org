export default {
	namespaced: true,
	state: {
		currentTalks: [],
		talks: [],
	},
	getters: {
		getAllTalksByUser(state) {
			// mapState
			return state.currentTalks;
		},
		getTalkById: (state) => (id) => {
			return state.talks.find(talk => talk.id === id);
		},
	},
	mutations: {
		addTalk(state, talk) {
			// make this vuexy
			state.talks.push(talk);
		},
		setCurrentTalk(state, talk) {
			// make this vuexy
			state.currentTalks.push(talk);
		},
	},
	actions: {
		async createTalk({ dispatch, commit }, talk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			await talk.create();
			commit("setCurrentTalk", talk.properties);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async setTalk({ dispatch, commit }, talk) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			await talk.update();
			commit("setCurrentTalk", talk.properties);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async fetchAllTalks({ commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			// hmmmm
			dispatch("services/loading/popLoading", {}, { root: true });
		},
		async fetchTalk({ commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			// hmmmmm
			dispatch("services/loading/popLoading", {}, { root: true });
		},
	},
};
