import Vue from "vue";
import Router from "vue-router";

import Index from "@/views/index.vue";
import EditProfile from "@/views/profile.vue";
import Community from "@/views/community.vue";
import CodeOfConduct from "@/views/code-of-conduct.vue";
import PrivacyPolicy from "@/views/privacy-policy.vue";
import UserProfile from "@/views/a-profile.vue";
import Register from "@/views/register";
import Login from "@/views/login";
import Tickets from "@/views/tickets";
import Schedule from "@/views/schedule";
import About from "@/views/about";
import News from "@/views/news";

Vue.use(Router);

export default new Router({
	routes: [{
		path: "/",
		name: "index",
		component: Index,
	}, {
		path: "/register",
		name: "register",
		component: Register,
	}, {
		path: "/schedule",
		name: "schedule",
		component: Schedule,
	}, {
		path: "/login",
		name: "login",
		component: Login,
	}, {
		path: "/profile/me",
		name: "my-profile",
		component: EditProfile,
	}, {
		path: "/tickets",
		name: "tickets",
		component: Tickets,
	}, {
		path: "/profile/:id",
		name: "profile",
		component: UserProfile,
	}, {
		path: "/news",
		name: "news",
		component: News,
	}, {
		path: "/about",
		name: "about",
		component: About,
	}, {
		path: "/community",
		name: "community",
		component: Community,
	}, {
		path: "/code-of-conduct",
		name: "code-of-conduct",
		component: CodeOfConduct,
	}, {
		path: "/privacy-policy",
		name: "privacy-policy",
		component: PrivacyPolicy,
	} ],
});
