import Event from "../models/event";

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
		}
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
	},
};
