<template>
	<section class="talk-page">
		<countdown />
		<talk-info :talk="currentTalk" />
		<!--
		<button
			:class="{voted: voteType === 'Unvote'}"
			:disabled="isLoading"
			v-if="!isCurrentUserTalk && isAttendee"
			@click="updateVote"
			>{{voteType}}
		</button>
    --></section>
</template>

<script>
import TalkInfo from '@/components/talk-info.vue';
import Countdown from '@/components/count-down';

export default {
	components: {
		TalkInfo,
		Countdown,
	},
	mounted() {
		this.$store.dispatch('events/fetchEvents');
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
			return this.$store.getters['events/getEventById'](
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

	.talk {
		@include grid-full-width;
	}
}
</style>
