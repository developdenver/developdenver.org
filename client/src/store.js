import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import services from "./modules/services";
import talks from "./modules/talks";
import profiles from "./modules/profiles";
import votes from "./modules/votes";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	reducer: state => ({services: {user: state.services.user}}),
});

export default new Vuex.Store({
	modules: {
		services,
		talks,
		profiles,
		votes,
	},
	state: {
		version: "",
	},
	plugins: [vuexLocal.plugin],
});
