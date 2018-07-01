<template>
	<div id="app">
		<color-bar class="top-bar" />
		<app-header />
		<main>
			<router-view/>
		</main>
		<sponsor-list />
		<app-footer />
	</div>
</template>

<script>
	import AppHeader from "@/components/app-header.vue";
	import AppFooter from "@/components/app-footer.vue";
	import SponsorList from "@/components/sponsor-list.vue";
	import ColorBar from "@/components/color-bar.vue";

	export default {
		components: {
			AppHeader,
			AppFooter,
			SponsorList,
			ColorBar
		}
	};
</script>

<style lang="scss">
	@import "@/styles/_reset.scss";

	#app {
		min-height: 100vh;
		display: grid;
		grid-template:
			"header" auto
			"main" auto
			"sponsors" auto
			"footer" auto / auto;
		.top-bar {
			position: fixed;
		}
		.app-header {
			grid-area: header;
		}
		.sponsors {
			grid-area: sponsors;
		}
		main {
			grid-area: main;
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
		}
		.app-footer {
			grid-area: footer;
		}
	}
</style>
