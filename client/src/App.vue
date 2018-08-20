<template>
    <div id="app">
		<loading-spinner v-if="isLoading" />
        <app-header />
        <main>
            <router-view/>
        </main>
        <sponsor-list />
        <app-footer />
    </div>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import SponsorList from "@/components/sponsor-list";
import LoadingSpinner from "@/components/loading-spinner";

export default {
	components: {
		AppHeader,
		AppFooter,
		SponsorList,
		LoadingSpinner,
	},
	computed: {
		isLoading() {
			return this.$store.getters["services/loading/isLoading"];
		},
	},
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
	> main {
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
