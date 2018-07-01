import Vue from "vue";
import Router from "vue-router";

import Index from "@/views/index.vue";
import Profile from "@/views/profile.vue";

Vue.use(Router);

export default new Router({
	routes: [{
		path: "/",
		name: "index",
		component: Index
	},{
		path: "/profile",
		name: "profile",
		component: Profile
	}]
});
