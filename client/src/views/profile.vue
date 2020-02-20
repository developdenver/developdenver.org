<template>
	<fragment>
		<section id="profile-landing" class="full landing-screen">
			<countdown />
			<h1>All About Me</h1>
			<div class="plus-grid red"></div>
		</section>
		<section v-if="acceptedTalks.length">
			<TalkInfo
				view="profile"
				:talk="talk"
				v-for="(talk, ix) in acceptedTalks"
				:key="'accepted' + ix"
			/>
		</section>
		<section v-if="submittedTalks.length">
			<HeaderBar
				title="My Submitted Talks"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<TalkInfo
				view="profile"
				:talk="talk"
				v-for="(talk, ix) in submittedTalks"
				:key="'submitted' + ix"
			/>
		</section>
		<section class="ticket-management" v-if="tickets.length">
			<HeaderBar
				title="My Tickets"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_TICKET.svg')"
			/>
			<div class="intro">
				<router-link class="button" :to="{ name: 'my-tickets' }"
					><button>Manage Tickets</button></router-link
				>
			</div>
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
			<router-link
				:to="{ name: 'profile', params: { id: profile.id || 0 } }"
				class="profile-link"
				:class="{ disabled: !profile.id }"
			>
				View My Profile Page
			</router-link>
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
import TalkInfo from '@/components/talk-info.vue';
import { mapState } from 'vuex';

export default {
	components: {
		Countdown,
		EditProfile,
		HeaderBar,
		TalkInfo,
	},
	computed: {
		...mapState({
			tickets: state => state.tickets.list,
		}),
		profile() {
			return this.$store.getters['services/user/currentProfile'];
		},
		submittedTalks() {
			return this.$store.getters['talks/getTalksByUserId'](
				this.profile.id,
			);
		},
		acceptedTalks() {
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
		abbreviatedText: function(text, maxLength) {
			if (text.length > maxLength) {
				//trim the string to the maximum length
				let trimmedString = text.substr(0, maxLength);

				//re-trim if we are in the middle of a word and
				trimmedString = trimmedString.substr(
					0,
					Math.min(
						trimmedString.length,
						trimmedString.lastIndexOf(' '),
					),
				);
				return trimmedString + '...';
			}
			return text;
		},
	},
	mounted() {
		this.$store.dispatch('talks/fetchTalks');
	},
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

#profile-landing {
	@include grid-full-width;
	position: relative;
	h1 {
		z-index: 2;
	}
	.plus-grid.red {
		@include plus-grid;
		grid-column: 3 / span 4;
		height: 40vh;
		margin-top: 20vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
		z-index: 1;
	}
	@media (max-width: $small-breakpoint) {
		grid-column: 1;
		h1 {
			grid-column: 1;
			grid-row: 2;
		}
		.plus-grid.red {
			grid-column: 1;
			grid-row: 2;
			height: 15vh;
			margin-top: 15vh;
			width: 100vw;
		}
		.countdown {
			grid-row: 2;
		}
	}
}
.profile-editing {
	.profile-link {
		padding-bottom: $baseline;
	}
	a {
		@include grid-full-width;
		margin-top: $baseline / 2;
	}
}
</style>
