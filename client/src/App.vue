<template>
	<div id="app">
		<app-header
			@toggleMenu="toggleMenu"
			:isMenuOpen="isMenuOpen"
		>
			<hamburger-menu
				:isMenuOpen="isMenuOpen"
			/>
		</app-header>
		<main
			@click="closeMenu"
		>
			<router-view />
			<app-footer />
		</main>
	</div>
</template>

<script>
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import HamburgerMenu from '@/components/hamburger-menu';

export default {
	hagridActions: ['tickets/fetchTickets'],
	components: {
		AppHeader,
		AppFooter,
		HamburgerMenu,
	},
	data() {
		return {
			isMenuOpen: false
		}
	},
	mounted() {
		this.$store.dispatch('services/user/fetchProfile');
	},
	watch: {
		'$route' (){
			this.isMenuOpen = false
		}
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
		closeMenu() {
			console.log('close')
			this.isMenuOpen = false
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
}
</style>
