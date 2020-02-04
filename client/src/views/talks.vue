<template>
	<fragment>
		<section id="talks-landing" class="full landing-screen">
			<countdown />
			<h1>What we're talkin' about</h1>
		</section>
		<section class="talks-view">
			<h2>Submitted Talks</h2>
			<p class="description-text">
				These are the talks that have been submitted so far for Develop
				Denver 2019.
				<router-link :to="{ name: 'tickets' }"
					>Buy a ticket</router-link
				>
				so you can vote for what you want to see starting on June 1st!
			</p>
			<talk-list :talks="shuffledTalks" />
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import Countdown from '@/components/count-down.vue';
import TalkList from '@/components/talk-list.vue';

const icons = ['bomb', 'happy', 'skull'];

export default {
	components: {
		TalkList,
		Countdown,
	},
	created() {
		this.$store.dispatch('talks/fetchTalks');
	},
	computed: {
		shuffledTalks() {
			return this.$store.state.talks.list.map(talk => {
				const randomIndex = Math.floor(Math.random() * 3);
				const icon = icons[randomIndex];
				talk.properties = Object.assign({}, talk.properties, { icon });
				return talk;
			});
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.talks-view {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.description-text {
		@include grid-text-0;
	}
	h2,
	p,
	.talk-list {
		@include grid-full-width;
	}
	a {
		text-decoration: underline;
		color: $accent-color;
	}
	h2 {
		@include grid-heading;
	}
}
</style>
