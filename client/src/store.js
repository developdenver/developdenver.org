import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import services from "./modules/services";
import talks from "./modules/talks";
import profiles from "./modules/profiles";

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
	},
	state: {
		version: "",
	},
	plugins: [vuexLocal.plugin],
});
