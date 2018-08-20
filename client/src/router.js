import Vue from "vue";
import Router from "vue-router";

import store from "./store";

import Index from "@/views/index.vue";
import EditProfile from "@/views/profile.vue";
import Community from "@/views/community.vue";
import CodeOfConduct from "@/views/code-of-conduct.vue";
import PrivacyPolicy from "@/views/privacy-policy.vue";
import ProfilePage from "@/views/profile-page.vue";
import Register from "@/views/register";
import Login from "@/views/login";
import Tickets from "@/views/tickets";
import About from "@/views/about";
import News from "@/views/news";

Vue.use(Router);

const router = new Router({
	mode: "history",
	routes: [{
		path: "/",
		name: "index",
		component: Index,
	}, {
		path: "/register",
		name: "register",
		component: Register,
		meta: {
			isGuest: true,
		},
	}, {
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			isGuest: true,
		}
	}, {
		path: "/profiles/me",
		name: "my-profile",
		component: EditProfile,
		meta: {
			requiresAuth: true,
		},
	}, {
		path: "/tickets",
		name: "tickets",
		component: Tickets,
		meta: {
			requiresAuth: true,
		},
	}, {
		path: "/profiles/:id",
		name: "profile",
		component: ProfilePage,
	}, {
		path: "/news",
		name: "news",
		component: News,
		meta: {
			requiresAuth: true,
			isAttendee: true,
		},
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
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		console.log("needs auth", !store.getters["services/user/isLoggedIn"]);
		if (!store.getters["services/user/isLoggedIn"]) {
			console.log("should be going to login...");
			next({name: "login"});
		}
	}
	if (to.matched.some(record => record.meta.isGuest)) {
		if (store.getters["services/user/isLoggedIn"]) {
			next({name: "news"});
		}
	}
	if (to.matched.some(record => record.meta.isAttendee)) {
		if (!store.getters["services/user/isAttendee"]) {
			next({name: "tickets"});
		}
	}
	if (to.matched.some(record => record.meta.isAttendee === false)) {
		if (store.getters["services/user/isAttendee"]) {
			next({name: "news"});
		}
	}
	next();
});

export default router;
