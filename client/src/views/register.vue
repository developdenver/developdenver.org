<template>
	<fragment>
		<section id="register-landing" class="full landing-screen">
			<countdown />
			<h1>Sign Up to Get In</h1>
			<div class="plus-grid red"></div>
		</section>
		<section id="register">
			<HeaderBar
				title="Register"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_TICKET.svg')"
			/>
			<div class="registration-instructions">
				<p>
					Create a profile to buy tickets. Already have a profile?
					<router-link :to="{ name: 'login', query: $route.query }"
						>Log in</router-link
					>
					to purchase a badge.
				</p>
			</div>
			<edit-profile
				buttonLabel="Register"
				:isNewProfile="true"
				:profile="profile"
				@updateProfile="updateProfile"
			/>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import EditProfile from '../components/edit-profile';
import HeaderBar from '@/components/header-bar.vue';
import Profile from '../models/profile';

export default {
	data() {
		return {
			profile: new Profile({}),
		};
	},
	components: {
		Countdown,
		EditProfile,
		HeaderBar,
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

#register-landing {
	.plus-grid.red {
		grid-column: 2 / span 4;
		height: 30vh;
		margin-top: 25vh;
		width: 50vw;
		@media (max-width: $small-breakpoint) {
			height: 15vh;
			margin-top: 0;
		}
	}
}
#register {
	div {
		@include grid-full-width;
	}
	p {
		display: inline-block;
		a {
			display: inline-block;
		}
	}
}
</style>
