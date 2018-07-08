import Vue from "vue";
import Router from "vue-router";

import Index from "@/views/index.vue";
import Profile from "@/views/profile.vue";
import Community from "@/views/community.vue";
import CodeOfConduct from "@/views/code-of-conduct.vue";
import PrivacyPolicy from "@/views/privacy-policy.vue";

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
	},{
		path: "/community",
		name: "community",
		component: Community
	},{
		path: "/code-of-conduct",
		name: "code-of-conduct",
		component: CodeOfConduct
	},{
		path: "/privacy-policy",
		name: "privacy-policy",
		component: PrivacyPolicy
	}]
});
