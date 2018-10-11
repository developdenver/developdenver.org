import ScheduleListing from "../models/schedule-listing";

export default {
	namespaced: true,
	state: {
		list: [],
	},
	getters: {
		getTalkById: (state) => (id) => {
			return state.list.find(scheduleListing => scheduleListing.id === id) || {
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
		updateScheduleListings(state, scheduleListings) {
			state.list = scheduleListings;
		},
	},
	actions: {
		async fetchAll({ state, commit, dispatch }) {
			if (!state.list.length) {
				dispatch("services/loading/pushLoading", {}, { root: true });
				let scheduleListings = await ScheduleListing.fetchAll("schedule-listing");
				scheduleListings = scheduleListings.map(scheduleListing => new ScheduleListing(scheduleListing));
				commit("updateScheduleListings", scheduleListings);
				dispatch("services/loading/popLoading", {}, { root: true });
		}
		},
	},
};
