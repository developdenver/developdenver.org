import Vue from 'vue';
import Router from 'vue-router';

import store from './store';

import Index from '@/views/index.vue';
import EditProfile from '@/views/profile.vue';
import Community from '@/views/community.vue';
import CodeOfConduct from '@/views/code-of-conduct.vue';
import PrivacyPolicy from '@/views/privacy-policy.vue';
import ProfilePage from '@/views/profile-page.vue';
import Register from '@/views/register';
import Login from '@/views/login';
import StudentTickets from '@/views/student-tickets';
import DiscountTickets from '@/views/discount-tickets';
import Tickets from '@/views/tickets';
import About from '@/views/about';
import News from '@/views/news';
import ResetPassword from '@/views/reset-password';
import RequestReset from '@/views/request-reset';
import SubmitTalk from '@/views/submit-talk';
import TalkPage from '@/views/talk-page';
import ScheduleListingPage from '@/views/schedule-listing-page';
import WorkshopPage from '@/views/workshop-page';
import Talks from '@/views/talks';
import UserTalk from '@/views/user-talk';
import Events from '@/views/events';
import Schedule from '@/views/schedule';
import MyTickets from '@/views/my-tickets';
import ClaimTicket from '@/views/claim-ticket';

Vue.use(Router);

const ticketsOnSale = true;

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				isGuest: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				isGuest: true,
			},
		},
		{
			path: '/profiles/me',
			name: 'my-profile',
			component: EditProfile,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/profiles/me/conference-badges',
			name: 'my-tickets',
			component: MyTickets,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/claim-badges/:claimToken',
			name: 'claim-ticket',
			component: ClaimTicket,
			meta: {
				takeItBackNowYall: true,
			},
		},
		{
			path: '/events',
			name: 'events',
			component: Events,
		},
		{
			path: '/schedule',
			name: 'schedule',
			component: Schedule,
		},
		{
			path: '/submit-talk',
			name: 'submit-talk',
			component: SubmitTalk,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/talks/:id',
			name: 'talk',
			component: TalkPage,
		},
		{
			path: '/schedule/:id',
			name: 'schedule-listing',
			component: ScheduleListingPage,
		},
		{
			path: '/workshops/:id',
			name: 'workshop',
			component: WorkshopPage,
		},
		{
			path: '/talks',
			name: 'talks',
			component: Talks,
		},
		{
			path: '/edit-talk/:id',
			name: 'edit-talk',
			component: UserTalk,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/conference-badges',
			name: 'tickets',
			component: Tickets,
			meta: {
				notYetAvailable: !ticketsOnSale,
			},
		},
		{
			path: '/student-tickets',
			name: 'student-tickets',
			component: StudentTickets,
			meta: {
				notYetAvailable: !ticketsOnSale,
			},
		},
		{
			path: '/discount-tickets',
			name: 'discount-tickets',
			component: DiscountTickets,
			meta: {
				notYetAvailable: !ticketsOnSale,
			},
		},
		{
			path: '/profiles/:id',
			name: 'profile',
			component: ProfilePage,
		},
		{
			path: '/news',
			name: 'news',
			component: News,
		},
		{
			path: '/about',
			name: 'about',
			component: About,
		},
		{
			path: '/community',
			name: 'community',
			component: Community,
		},
		{
			path: '/code-of-conduct',
			name: 'code-of-conduct',
			component: CodeOfConduct,
		},
		{
			path: '/privacy-policy',
			name: 'privacy-policy',
			component: PrivacyPolicy,
		},
		{
			path: '/reset-password',
			name: 'reset-password',
			component: ResetPassword,
		},
		{
			path: '/request-reset',
			name: 'request-reset',
			component: RequestReset,
		},
	],
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

router.beforeEach(async (to, from, next) => {
	const routeRequiresAuth = to.matched.some(
		record => record.meta.requiresAuth,
	);
	const routeRequiresGuest = to.matched.some(record => record.meta.isGuest);
	const routeRequiresAttendee = to.matched.some(
		record => record.meta.isAttendee,
	);
	const routeRequiresNonAttendee = to.matched.some(
		record => record.meta.isAttendee,
	);
	const routeNotYetAvailable = to.matched.some(
		record => record.meta.notYetAvailable,
	);
	await store.getters['services/user/profileLoaded'];
	const userIsLoggedIn = store.getters['services/user/isLoggedIn'];
	if (routeNotYetAvailable) {
		next({ name: 'news' });
	} else if (routeRequiresAuth && !userIsLoggedIn) {
		next({ name: 'login' });
	} else if (routeRequiresGuest && userIsLoggedIn) {
		next({ name: 'news' });
	} else if (routeRequiresAttendee) {
		await store.getters['tickets/ticketLoaded'];
		const userIsAttendee = store.getters['tickets/isAttendee'];
		if (!userIsAttendee) {
			next({ name: 'tickets' });
		} else if (userIsAttendee) {
			next({ name: 'news' });
		}
	}
	next();
});

export default router;
