<template>
    <section class="talk-page">
		<div class="talk-info-wrapper">
			<talk-info :talk="currentTalk" />
		</div>
		<router-link
			class="edit-talk-link"
			v-if="isCurrentUserTalk"
			:to="{name: 'edit-talk', params: {id: currentTalk.id}}"
		>Edit Talk</router-link>
		<button v-if="!isCurrentUserTalk" @click="updateVote">Upvote</button>
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
		updateVote() {
			console.log("update vote");
			// this.$store.dispatch('services/talks/updateVote');
		}
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
    }
</style>
