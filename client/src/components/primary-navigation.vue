<template>
  <nav class="primary-navigation">
    <ul>
      <li v-if="!isLoggedIn">
        <router-link :to="{name: 'register', query: redirectToPageQuery }">Register</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link :to="{name: 'login', query: redirectToPageQuery }">Login</router-link>
      </li>
      <li>
        <router-link :to="{name: 'tickets'}">Purchase Badges</router-link>
      </li>
      <li>
        <router-link :to="{name: 'news'}">News</router-link>
      </li>
      <!--
            <li>
                <router-link :to="{name: 'schedule'}">Schedule</router-link>
            </li>
            <li>
                <router-link :to="{name: 'talks'}">submissions</router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link :to="{name: 'submit-talk'}">Submit a Talk</router-link>
            </li>
            <li>
                <router-link :to="{name: 'community'}">Community</router-link>
            </li>
      -->
      <li v-if="isLoggedIn">
        <router-link :to="{name: 'my-profile'}">My Profile</router-link>
      </li>
      <li v-if="isLoggedIn">
        <a href="#" @click.prevent="logout">Logout {{userFirstName}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'PrimaryNavigation',
    computed: {
        isLoggedIn() {
            return this.$store.getters['services/user/isLoggedIn'] || false;
        },
        isAttendee() {
            return this.$store.getters['tickets/isAttendee'] || false;
        },
        currentUser() {
            return this.$store.getters['services/user/currentProfile'];
        },
        userFirstName() {
            return this.currentUser.properties.firstName || '';
        },
        redirectToPageQuery() {
            if (this.$route.meta.takeItBackNowYall) {
                return { redirect: this.$route.path };
            }
            if (this.$route.query.redirect) {
                return this.$route.query;
            }
            return null;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('services/user/logout');
            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';

.primary-navigation {
    max-width: 50%;
    margin-bottom: $xl;
    ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        @media (max-width: $large-breakpoint) {
            li {
                margin-bottom: $baseline;
            }
        }
        li {
            display: inline-block;
            padding: 0 1.5rem;
            a {
                @include link-font;
                text-decoration: none;
            }
        }
    }
    @media (max-width: $medium-breakpoint) {
        max-width: 90%;
    }
}
</style>
