<template>
    <section class="talk-page">
		<div class="talk-info-wrapper">
			<talk-info :talk="currentTalk" />
		</div>
		<router-link
			class="edit-talk-link"
			v-if="isCurrentUserTalk"
			:to="{name: 'edit-talk', params: {id: currentTalk.id}}"
		>Edit Talk
		</router-link>
		<!--
		<button
			:class="{voted: voteType === 'Unvote'}"
			:disabled="isLoading"
			v-if="!isCurrentUserTalk && isAttendee"
			@click="updateVote"
			>{{voteType}}
		</button>
		-->
    </section>
</template>

<script>
import TalkInfo from "@/components/talk-info.vue";

export default {
	components: {
		TalkInfo,
	},
	mounted() {
		this.$store.dispatch("talks/fetchTalks");
	},
	computed: {
		isLoading() {
			return this.$store.getters["services/loading/isLoading"];
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
			return this.$store.getters["services/user/isAttendee"];
		},
		*/
		currentUser() {
			return this.$store.getters["services/user/currentProfile"];
		},
		isCurrentUserTalk() {
			return this.currentUser
				? +this.currentTalk.properties.userId === +this.currentUser.id
				: false;
		},
		currentTalk() {
			return this.$store.getters["talks/getTalkById"](Number(this.$route.params.id));
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
	@import "@/styles/_general.scss";
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";

    .talk-page {
        width: 100%;
        display: flex;
		flex-flow: column nowrap;
		.talk-info-wrapper {
			display: flex;
			justify-content: flex-end;
		}
		.edit-talk-link {
			@include call-to-action-button;
			margin-bottom: $large;
			align-self: center;
		}
		button {
			@include call-to-action-button;
			background-color: $tertiary-color;
			margin-bottom: $large;
			align-self: center;
			width: auto;
			&:hover {
				background-color:$primary-color;
			}
		}
		.voted {
			background-color: $secondary-color;
		}

    }
</style>
