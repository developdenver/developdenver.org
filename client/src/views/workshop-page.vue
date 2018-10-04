<template>
    <section class="talk-page">
		<div class="talk-info-wrapper">
			<talk-info :talk="currentTalk" />
		</div>
    </section>
</template>

<script>
import TalkInfo from "@/components/talk-info.vue";
import workshops from "@/data/workshops";

export default {
	components: {
		TalkInfo,
	},
	mounted() {
	},
	computed: {
		currentTalk() {
			return workshops.find(workshop => workshop.id === this.$route.params.id);
		},
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
