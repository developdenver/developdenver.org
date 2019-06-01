<template>
	<section class="talks-view">
		<countdown />
		<h2>Submitted Talks</h2>
		<p class="description-text">These are the talks that have been submitted so far for Develop Denver 2019. <router-link :to="{ name: 'tickets' }">Buy a ticket</router-link> so you can vote for what you want to see starting on June 1st!</p>
		<talk-list :talks="shuffledTalks" />
	</section>
</template>

<script>
import TalkList from "@/components/talk-list.vue";
import Countdown from "@/components/count-down.vue";

const icons = ["bomb", "happy", "skull" ]

export default {
	components: {
		TalkList,
		Countdown,
	},
	created() {
		this.$store.dispatch("talks/fetchTalks");
	},
	computed: {
		shuffledTalks() {
			return this.$store.state.talks.list.map(talk => {
				const randomIndex = Math.floor(Math.random() * 3)
				const icon = icons[randomIndex]
				talk.properties = Object.assign({}, talk.properties, { icon })
				return talk
			})
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";

.talks-view {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.description-text {
		@include grid-text-0;
	}
	h2, p, .talk-list {
		@include grid-full-width;
	}
	a {
		text-decoration: underline;
		color: $accent-color;
	}
	h2 {
		@include grid-heading;
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>
