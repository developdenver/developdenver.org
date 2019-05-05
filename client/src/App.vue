<template>
	<div id="app">
		<app-header
			@toggleMenu="toggleMenu"
			:isMenuOpen="isMenuOpen"
		>
		<div class="hamburger-container">
		<div class="hamburger-menu" :class="{'open': isMenuOpen}">
			<nav>
				<ul>
					<li><router-link :to="{name: 'login'}">Login</router-link></li>
					<li><router-link :to="{name: 'news'}">News</router-link></li>
					<li><a href="mailto:hello@developdenver.org">Contact</a></li>
					<li><router-link :to="{name: 'tickets'}">Buy Tickets</router-link></li>
					<li><router-link :to="{name: 'submit-talk'}">Submit a Talk</router-link></li>
					<li><a href="mailto:sponsorship@developdenver.org">Sponsorship</a></li>
					<li class="social-links">
						<ul>
							<li>
								<a href="https://twitter.com/dvlpdnvr" target="BLANK">Twitter</a>
							</li>
							<li>
								<a href="https://www.instagram.com/dvlpdnvr/" target="BLANK">Instagram</a>
							</li>
							<li>
								<a href="https://www.youtube.com/channel/dvlpdnvr" target="BLANK">YouTube</a>
							</li>
							<li>
								<a href="https://www.facebook.com/dvlpdnvr" target="BLANK">Facebook</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
		</div>
		</app-header>
		<main>
			<router-view />
			<app-footer />
		</main>
	</div>
</template>

<script>
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import LoadingSpinner from '@/components/loading-spinner';

export default {
	hagridActions: ['tickets/fetchTickets'],
	data() {
		return {
			isMenuOpen: false
		}
	},
	watch: {
		'$route' (){
			this.isMenuOpen = false
		}
	},
	components: {
		AppHeader,
		AppFooter,
		LoadingSpinner,
	},
	mounted() {
		this.$store.dispatch('services/user/fetchProfile');
	},
	computed: {
		isLoading() {
			return this.$store.getters['services/loading/isLoading'];
		},
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		}
	},
};
</script>

<style lang="scss">
@import '@/styles/_reset.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';

#app {
	min-height: 100vh;
	display: flex;
	flex-flow: row nowrap;
	h2 {
		@include primary-header-font;
		border-bottom: 1px solid $white;
		margin-bottom: $baseline;
	}
	h3 {
		font-weight: 700;
		margin-bottom: $baseline / 2;
	}
	.app-header-content {
		z-index: 1000;
	}
	.hamburger-container {
		position: relative;
	}
	.hamburger-menu {
		position: fixed;
		z-index: 100;
		left: -100vw;
		right: auto;
		transition: left 0.2s, right 0.2s;
		background-color: black;
		&.open {
			left: 94px;
		}
		li {
			@include primary-header-font;
		}
		nav {
			> ul {
				display: flex;
				flex-flow: rows nowrap;
				> li {
					border-left: 1px solid $white;
					padding: $baseline;
					&:not(.social-links) {
						writing-mode: vertical-rl;
						transform: rotate(180deg);
					}
					.social-links {
						display: flex;
						flex-flow: row wrap;
					}
					a:hover {
						color: $accent-color;
					}
				}
			}
		}
	}
}
</style>
