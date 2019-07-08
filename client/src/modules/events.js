import Event from "../models/event";
import updateInList from "../utilities/updateInList";

export default {
	namespaced: true,
	state: {
		list: [],
	},
	getters: {
		getEventById: (state) => (id) => {
			return state.list.find(event => event.id == id) || {
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
		updateEvents(state, events) {
			state.list = events;
		},
		setVotes(state, votes) {
			state.votes = votes;
		},
		UPDATE_EVENT(state, { id, changes }) {
			updateInList(state.list, e => e.id === id, t => {
				t.properties = { ...t.properties, ...changes };
				// FUUUCK this pattern!!
				return new Event(t.serialize());
			});
		},
	},
	actions: {
		async fetchEvents({ state, commit, dispatch }) {
			if (!state.list.length) {
				dispatch("services/loading/pushLoading", {}, { root: true });
				let events = await Event.fetchAll("event");
				events = events.map(event => new Event(event));
				commit("updateEvents", events);
				dispatch("services/loading/popLoading", {}, { root: true });
			}
		},
		updatedEvent({ commit }, { id, changes }) {
			commit('UPDATE_EVENT', { id, changes });
		},
	},
};
