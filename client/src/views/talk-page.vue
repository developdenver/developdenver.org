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
};
</script>

<style lang="scss">
	@import "@/styles/_general.scss";
	@import "@/styles/_sizes.scss";

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
    }
</style>
