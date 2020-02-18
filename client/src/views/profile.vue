<template>
	<fragment>
		<section id="profile-landing" class="full landing-screen">
			<countdown />
			<h1>All About Me</h1>
			<div class="plus-grid red"></div>
		</section>
		<section v-if="talks.length">
			<HeaderBar
				title="My Submitted Talks"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div v-for="talk in talks" :key="talk.id">
				<p>
					<router-link
						class="button"
						:to="{ name: 'edit-talk', params: { id: talk.id } }"
					>
						{{ talk.properties.title }},
						{{ talk.properties.type }}
					</router-link>
				</p>
			</div>
		</section>
		<section class="ticket-management" v-if="tickets.length">
			<HeaderBar
				title="My Tickets"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<router-link class="button" :to="{ name: 'my-tickets' }"
				>Manage Tickets</router-link
			>
		</section>
		<section class="profile-editing">
			<HeaderBar
				title="Edit Profile"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<edit-profile
				buttonLabel="Update Profile"
				:isNewProfile="false"
				:profile="profile"
				@updateProfile="updateProfile"
			/>
			<router-link
				class="reset-password-link"
				:to="{ name: 'reset-password' }"
				>Reset password</router-link
			>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import EditProfile from '@/components/edit-profile.vue';
import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import { mapState } from 'vuex';

export default {
	components: {
		Countdown,
		EditProfile,
		HeaderBar,
	},
	computed: {
		...mapState({
			tickets: state => state.tickets.list,
		}),
		profile() {
			return this.$store.getters['services/user/currentProfile'];
		},
		talks() {
			return this.$store.getters['talks/getTalksByUserId'](
				this.profile.id,
			).filter(talk => talk.properties.isAccepted);
		},
	},
	methods: {
		async updateProfile(profile) {
			await this.$store.dispatch('services/user/setProfile', profile);
			this.$router.push({ name: 'news' });
		},
	},
	mounted() {
		this.$store.dispatch('talks/fetchTalks');
	},
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.profile-editing {
	a {
		@include grid-full-width;
		margin-top: $baseline;
	}
}
</style>
