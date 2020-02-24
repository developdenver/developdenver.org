import Vue from 'vue';
import Router from 'vue-router';

import store from './store';

import About from '@/views/about';
import CodeOfConduct from '@/views/code-of-conduct.vue';
import ClaimTicket from '@/views/claim-ticket';
import Contact from '@/views/contact.vue';
import DiscountTickets from '@/views/discount-tickets';
import EditProfile from '@/views/profile.vue';
import Events from '@/views/events';
import Index from '@/views/index.vue';
import LetterToBoss from '@/views/letter-to-boss';
import Login from '@/views/login';
import MyTickets from '@/views/my-tickets';
import PrivacyPolicy from '@/views/privacy-policy.vue';
import ProfilePage from '@/views/profile-page.vue';
import Register from '@/views/register';
import ResetPassword from '@/views/reset-password';
import RequestReset from '@/views/request-reset';
//import Schedule from '@/views/schedule';
import ScheduleListingPage from '@/views/schedule-listing-page';
import StudentTickets from '@/views/student-tickets';
import Sponsorship from '@/views/sponsorship';
import SubmitTalk from '@/views/submit-talk';
import Talks from '@/views/talks';
import TalkPage from '@/views/talk-page';
import Tickets from '@/views/tickets';
import UserTalk from '@/views/user-talk';
import WorkshopPage from '@/views/workshop-page';

Vue.use(Router);

const ticketsOnSale = true;

/* Add new routes in alphabetical order */

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index,
		},
		{
			path: '/about',
			name: 'about',
			component: About,
		},
		{
			path: '/claim-ticket/:claimToken',
			name: 'claim-ticket',
			component: ClaimTicket,
			meta: {
				takeItBackNowYall: true,
			},
		},
		{
			path: '/code-of-conduct',
			name: 'code-of-conduct',
			component: CodeOfConduct,
		},

		{
			path: '/contact',
			name: 'contact',
			component: Contact,
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
			path: '/discount-tickets',
			name: 'discount-tickets',
			component: DiscountTickets,
			meta: {
				notYetAvailable: !ticketsOnSale,
			},
		},
		{
			path: '/events',
			name: 'events',
			component: Events,
		},
		{
			path: '/letter-to-boss',
			name: 'letter-to-boss',
			component: LetterToBoss,
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
			path: '/privacy-policy',
			name: 'privacy-policy',
			component: PrivacyPolicy,
		},
		{
			path: '/profiles/me',
			name: 'my-profile',
			component: EditProfile,
			meta: {
				requiresAuth: true,
				takeItBackNowYall: true,
			},
		},
		{
			path: '/profiles/me/conference-badges',
			alias: '/profiles/me/tickets',
			name: 'my-tickets',
			component: MyTickets,
			meta: {
				requiresAuth: true,
				takeItBackNowYall: true,
			},
		},
		{
			path: '/profiles/:id',
			name: 'profile',
			component: ProfilePage,
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
			path: '/reset-password',
			name: 'reset-password',
			component: ResetPassword,
		},
		{
			path: '/request-reset',
			name: 'request-reset',
			component: RequestReset,
		},
		{
			path: '/schedule',
			name: 'schedule',
			component: Events,
		},

		{
			path: '/schedule/:id',
			name: 'schedule-listing',
			component: ScheduleListingPage,
		},
		{
			path: '/sponsorship',
			name: 'sponsorship',
			component: Sponsorship,
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
			path: '/submit-talk',
			name: 'submit-talk',
			component: SubmitTalk,
			meta: {
				requiresAuth: true,
				takeItBackNowYall: true,
			},
		},
		{
			path: '/talks',
			name: 'talks',
			component: Talks,
		},
		{
			path: '/talks/:id',
			name: 'talk',
			component: TalkPage,
		},
		{
			path: '/tickets',
			name: 'tickets',
			component: Tickets,
			meta: {
				notYetAvailable: !ticketsOnSale,
			},
		},
		{
			path: '/workshops/:id',
			name: 'workshop',
			component: WorkshopPage,
		},
	],
	scrollBehavior(to) {
		return to.hash ? { selector: to.hash } : { x: 0, y: 0 };
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
	const takeItBackNowYall = to.matched.find(
		record => record.meta.takeItBackNowYall,
	);
	await store.getters['services/user/profileLoaded'];
	const userIsLoggedIn = store.getters['services/user/isLoggedIn'];
	if (routeNotYetAvailable) {
		next({ name: 'news' });
	} else if (routeRequiresAuth && !userIsLoggedIn) {
		const query = takeItBackNowYall && { redirect: takeItBackNowYall.path };
		next({ name: 'login', query });
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
