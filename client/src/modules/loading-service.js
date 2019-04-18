export default {
	namespaced: true,
	state: {
		loadingCount: 0,
	},
	getters: {
		isLoading(state) {
			return state.loadingCount > 0;
		},
	},
	mutations: {
		pushLoading(state) {
			state.loadingCount++;
		},
		popLoading(state) {
			state.loadingCount--;
		},
	},
	actions: {
		pushLoading({ commit }) {
			commit("pushLoading");
		},
		popLoading({ commit }) {
			commit("popLoading");
		},
	},
};
