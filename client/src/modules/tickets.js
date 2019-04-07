import withLoading from "../utilities/withLoading";

export default {
	namespaced: true,
	state: {
		list: [],
	},
	getters: {
        fetchTicketsDependencies(state, getters, rootState, rootGetters) {
            const loggedInUserId = rootGetters['services/user/loggedInUserId'];
            if (!loggedInUserId) return false;
            return {
                loggedInUserId,
            };
        },
        isAttendee(state, getters, rootState, rootGetters) {
/// TODO
        },
	},
	mutations: {
	},
	actions: {
		fetchTickets({ dispatch, commit, rootState }, { loggedInUser }) {
			return withLoading((dispatch, async () => {

            }));
		},
	},
};
