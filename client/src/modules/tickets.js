import withLoading from '../utilities/withLoading';
import sleep from '../utilities/sleep';
import emptyPromise from 'empty-promise';
import {
	listTickets,
	remindUnclaimedTicket,
	revokeUnclaimedTicket,
	shareUnclaimedTicket,
} from './api';

function updateInList(lst, where, update) {
	return lst.map(val => (where(val) ? update(val) : val));
}

const ticketsLoaded = emptyPromise();

export default {
	namespaced: true,
	state: {
		status: 'unfetched',
		error: null,
		list: [],
	},
	getters: {
		fetchTicketsDependencies(state, getters, rootState, rootGetters) {
			const loggedInUserId =
				rootGetters['services/user/loggedInUserId'].loggedInUserId;
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
		ticketsLoaded() {
			return ticketsLoaded;
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
		SET_TICKET_STATUS(state, { ticketId, status }) {
			state.list = updateInList(
				state.list,
				t => t.id === ticketId,
				t => ({ ...t, status }),
			);
		},
		REVOKE_SUCCESS(state, ticketId) {
			state.list = updateInList(
				state.list,
				t => t.id === ticketId,
				t => ({
					...t,
					status: 'revoked!',
					unclaimed_ticket: { ticket_id: ticketId, emailed_to: null },
				}),
			);
		},
		INVITE_SUCCESS(state, { ticketId, email }) {
			state.list = updateInList(
				state.list,
				t => t.id === ticketId,
				t => ({
					...t,
					status: 'invited!',
					unclaimed_ticket: {
						ticket_id: ticketId,
						emailed_to: email,
					},
				}),
			);
		},
	},
	actions: {
		fetchTickets({ dispatch, commit }, { token }) {
			commit('LOADING_TICKETS');
			return withLoading(dispatch, () =>
				listTickets(token)
					.then(({ tickets }) => commit('SET_TICKETS', tickets))
					.catch(err => commit('FETCH_TICKETS_ERROR', err))
					.finally(() => ticketsLoaded.resolve()),
			);
		},
		async remind({ state, commit, rootState }, ticketId) {
			const ticket = state.list.find(t => t.id === ticketId);
			if (!ticket.unclaimed_ticket) {
				throw new Error('cannot remind a ticket that is not unclaimed');
			}
			commit('SET_TICKET_STATUS', { ticketId, status: 'reminding...' });
			try {
				await remindUnclaimedTicket(
					rootState.services.user.token,
					ticketId,
				);
				commit('SET_TICKET_STATUS', { ticketId, status: 'reminded!' });
				await sleep(2000);
				commit('SET_TICKET_STATUS', { ticketId, status: undefined });
			} catch (error) {
				commit('SET_TICKET_STATUS', {
					ticketId,
					status: `error: ${error.message || error}`,
				});
			}
		},
		async revoke({ state, commit, rootState }, ticketId) {
			const ticket = state.list.find(t => t.id === ticketId);
			if (!ticket.unclaimed_ticket) {
				throw new Error('cannot revoke a ticket that is not unclaimed');
			}
			commit('SET_TICKET_STATUS', { ticketId, status: 'revoking' });
			try {
				await revokeUnclaimedTicket(
					rootState.services.user.token,
					ticketId,
				);
				commit('REVOKE_SUCCESS', ticketId);
				await sleep(2000);
				commit('SET_TICKET_STATUS', { ticketId, status: undefined });
			} catch (error) {
				commit('SET_TICKET_STATUS', {
					ticketId,
					status: `error: ${error.message || error}`,
				});
			}
		},
		async invite({ state, commit, rootState }, { ticketId, email }) {
			const ticket = state.list.find(t => t.id === ticketId);
			if (ticket.attendee) {
				throw new Error('Ticket has already been claimed');
			}
			commit('SET_TICKET_STATUS', { ticketId, status: 'inviting...' });
			try {
				await shareUnclaimedTicket(
					rootState.services.user.token,
					ticketId,
					email,
				);
				commit('INVITE_SUCCESS', { ticketId, email });
				await sleep(2000);
				commit('SET_TICKET_STATUS', { ticketId, status: undefined });
			} catch (error) {
				commit('SET_TICKET_STATUS', {
					ticketId,
					status: `error: ${error.message || error}`,
				});
			}
		},
	},
	hagridResources: {
		fetchTickets: 'fetchTicketsDependencies',
	},
};
