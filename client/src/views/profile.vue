<template>
	<fragment>
		<section id="profile-landing" class="full landing-screen">
			<countdown />
			<h1>All About Me</h1>
			<div class="plus-grid red"></div>
		</section>
		<section v-if="acceptedTalks.length">
			<TalkListItem :talks="acceptedTalks" />
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
			<TalkListItem :talks="submittedTalks" />
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
import TalkListItem from '@/components/talk-list-item.vue';
import { mapState } from 'vuex';

export default {
	components: {
		Countdown,
		EditProfile,
		HeaderBar,
		TalkListItem,
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
}
.talk-row {
	@include grid-full-width;
	@include grid;
	@include align-items(center);
	padding-bottom: $baseline * 4;
	.title-and-type {
		grid-column: 1 / span 6;
		grid-row: 1;
		padding-bottom: $baseline * 2;

		h4 {
			font-size: 22px;
			padding-bottom: $baseline / 5;
			width: 100%;
		}
	}
	.edit-talk {
		grid-column: 1 / span 6;
		padding-bottom: $baseline * 2;
		button {
			margin-top: 0;
		}
	}
	.talk-description {
		grid-column: 1 / span 6;
	}
	&:last-of-type {
		.talk-description {
			border-bottom: none;
		}
	}
}
.profile-editing {
	a {
		@include grid-full-width;
		margin-top: $baseline / 2;
	}
}
</style>
