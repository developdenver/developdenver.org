import Talk from "../models/talk";

export default {
	namespaced: true,
	state: {
		talks: [],
		currentTalks: [],
	},
	getters: {
		getAllTalksByUser(state) {
			return state.currentTalks;
		},
		getTalksByUserId: (state) => (userId) => {
			return state.talks.find(talk => talk.properties.userId === userId);
		},
		getTalkById: (state) => (id) => {
			return state.talks.find(talk => talk.id === id) || {
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
		addTalk(state, talk) {
			// make this vuexy
			state.talks.push(talk);
		},
		setCurrentTalk(state, talk) {
			// make this vuexy
			// state.currentTalks.push(talk);
		},
		updateTalks(state, talks) {
			state.talks = talks;
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
		async fetchTalks({ commit, dispatch }) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let talks = await Talk.fetchAll("talk");
			talks = talks.map(talk => new Talk(talk));
			commit("updateTalks", talks);
			dispatch("services/loading/popLoading", {}, { root: true });
		},
	},
};
