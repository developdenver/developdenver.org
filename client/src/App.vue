<template>
	<div id="app">
		<app-header />
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
};
</script>

<style lang="scss">
@import '@/styles/_reset.scss';
@import '@/styles/_sizes.scss';

#app {
	min-height: 100vh;
	display: flex;
	flex-flow: row nowrap;
	main {
	}
}
</style>
