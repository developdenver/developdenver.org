<template>
  <section class="register">
    <h2>Register</h2>
    <p>
      Create a profile to use for the conference. Already have a profile?
      <router-link :to="{name: 'login', query: $route.query }">Log in</router-link>to purchase a badge.
    </p>
    <edit-profile
      buttonLabel="Register"
      :isNewProfile="true"
      :profile="profile"
      @updateProfile="updateProfile"
    />
  </section>
</template>

<script>
import EditProfile from '../components/edit-profile';
import Profile from '../models/profile';

export default {
	data() {
		return {
			profile: new Profile({}),
		};
	},
	components: {
		EditProfile,
	},
	methods: {
		async updateProfile(profile) {
			await this.$store.dispatch('profiles/createProfile', profile);
			const next = this.$route.query.redirect || { name: 'tickets' };
			this.$router.push(next);
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';
@import '@/styles/_colors.scss';

.register {
	@include grid;
	grid-template: auto / repeat(8, 1fr);
	margin: $baseline * 8 0;
	> div {
		grid-column: 2 / span 6;
		> p {
			margin-bottom: $baseline;
		}
	}
}
</style>
