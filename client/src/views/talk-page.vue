<template>
	<fragment>
		<section id="talk-landing" class="full landing-screen short-landing">
			<countdown />
			<div class="plus-grid"></div>
		</section>
		<section class="talk-page">
			<router-link class="back-link" :to="{ name: 'talks' }"
				>See all talks</router-link
			>
			<TalkInfo view="talkPage" :talk="currentTalk" />
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import TalkInfo from '@/components/talk-info.vue';
import Countdown from '@/components/count-down';

export default {
	components: {
		Countdown,
		TalkInfo,
	},
	created() {
		this.$store.dispatch('talks/fetchTalks');
	},
	computed: {
		isLoading() {
			return this.$store.getters['services/loading/isLoading'];
		},
		/*
		voteType() {
			if (this.$store.getters["talks/votedTalksById"][this.$route.params.id]) {
				return "Unvote";
			} else {
				return "Vote";
			}
		},
		isAttendee() {
			return this.$store.getters["tickets/isAttendee"];
		},
		*/
		currentUser() {
			return this.$store.getters['services/user/currentProfile'];
		},
		isCurrentUserTalk() {
			return this.currentUser
				? +this.currentTalk.properties.userId === +this.currentUser.id
				: false;
		},
		currentTalk() {
			return this.$store.getters['talks/getTalkById'](
				this.$route.params.id,
			);
		},
	},
	methods: {
		/*
		async updateVote() {
			if (this.voteType === "Vote") {
				await this.$store.dispatch("talks/vote", this.currentTalk);
			} else {
				await this.$store.dispatch("talks/unvote", this.currentTalk);
			}
			await this.$store.dispatch("talks/fetchAllVotes");
		}
		*/
	},
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';

.talk-page {
	@include grid;
	.back-link {
		padding-bottom: $baseline;
	}
	.talk {
		@include grid-full-width;
	}
}
</style>
