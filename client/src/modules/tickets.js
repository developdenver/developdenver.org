import withLoading from '../utilities/withLoading';
import { listTickets, claimTicket, ticketInfoFromClaim } from './api';

export default {
	namespaced: true,
	state: {
		status: 'unfetched',
		error: null,
		list: [],
		claimToken: null,
	},
	getters: {
		fetchTicketsDependencies(state, getters, rootState, rootGetters) {
			const loggedInUserId = rootGetters['services/user/loggedInUserId'];
			if (!loggedInUserId) return false;
			return {
				loggedInUserId,
				token: rootState.services.user.token,
			};
		},
		isAttendee(state, getters, rootState, rootGetters) {
			const loggedInUserId = rootGetters['services/user/loggedInUserId'];
			if (!loggedInUserId) return false;
			if (state.status !== 'success') return false;
			return !!state.list.find(t => t.attendee_id === loggedInUserId);
		},
	},
	mutations: {
		LOADING_TICKETS(state) {
			state.status = 'loading';
		},
		SET_TICKETS(state, tickets) {
			state.status = 'success';
			state.list = tickets;
			state.error = null;
		},
		FETCH_TICKETS_ERROR(state, err) {
			state.status = 'error';
			state.error = err.message || err;
		},
	},
	actions: {
		fetchTickets({ dispatch, commit }, { token }) {
			commit('LOADING_TICKETS');
			return withLoading(dispatch, () =>
				listTickets(token)
					.then(tickets => commit('SET_TICKETS', tickets))
					.catch(err => commit('FETCH_TICKETS_ERROR', err)),
			);
		},
	},
	hagridResources: {
		fetchTickets: 'fetchTicketsDependencies',
	},
};
