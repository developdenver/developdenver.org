<template>
  <div id="app">
    <!--loading-spinner v-if="isLoading" /-->
    <app-header v-if="this.$route.name !== 'index'"/>
    <main>
      <router-view/>
    </main>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import LoadingSpinner from '@/components/loading-spinner';

export default {
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

#app {
    min-height: 100vh;
    display: grid;
    grid-template:
        'header' auto
        'main' auto
        'sponsors' auto
        'footer' auto / auto;
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
