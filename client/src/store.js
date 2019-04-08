import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import services from './modules/services';
import talks from './modules/talks';
import events from './modules/events';
import profiles from './modules/profiles';
import scheduleListings from './modules/schedule-listings';
import tickets from './modules/tickets';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: state => ({ services: { user: state.services.user } }),
});

export default new Vuex.Store({
	modules: {
		services,
		talks,
		events,
		profiles,
		scheduleListings,
		tickets,
	},
	state: {
		version: '',
	},
	plugins: [vuexLocal.plugin],
});
