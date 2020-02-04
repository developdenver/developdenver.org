<template>
	<section class="profile">
		<countdown />
		<section v-if="talks.length">
			<h2>My Submitted Talks</h2>
			<div v-for="talk in talks" :key="talk.id">
				<p>
					<router-link
						class="button"
						:to="{ name: 'edit-talk', params: { id: talk.id } }"
					>
						{{ talk.properties.title }}, {{ talk.properties.type }}
					</router-link>
				</p>
			</div>
		</section>
		<section class="ticket-management" v-if="tickets.length">
			<router-link :to="{ name: 'my-tickets' }"
				>Manage Tickets</router-link
			>
		</section>
		<section class="profile-editing">
			<h2>Edit Profile</h2>
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
	</section>
</template>

<script>
import EditProfile from '@/components/edit-profile.vue';
import Countdown from '@/components/count-down';
import { mapState } from 'vuex';

export default {
	components: {
		EditProfile,
		Countdown,
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
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';

.profile {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.ticket-management {
		@include grid-heading;
		margin-bottom: $baseline * 2;
		a {
			color: $accent-color;
			text-decoration: underline;
		}
	}
	.profile-editing {
		@include grid-full-width;
		@include grid;
		.edit-profile {
			@include grid-full-width;
		}
		h2 {
			@include grid-heading;
		}
		.reset-password-link {
			@include grid-form;
			margin-top: $baseline;
			color: $accent-color;
			text-decoration: underline;
		}
	}
}
</style>
