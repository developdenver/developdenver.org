import Vote from "../models/vote";

export default {
	namespaced: true,
	state: {
	},
	getters: {
	},
	mutations: {
		updateTalks(state, talks) {
			state.list = talks;
		},
	},
	actions: {
		async updateVote({ dispatch }, type) {
			dispatch("services/loading/pushLoading", {}, { root: true });
			let success = true;
			try {
				if (type === "vote") {
					success = await Vote.vote();
				}
				success = await Vote.unvote();
			} catch (error) {
				success = false;
			} finally {
				dispatch("services/loading/popLoading", {}, { roote: true });
			}
			return success;
		}
	},
};
