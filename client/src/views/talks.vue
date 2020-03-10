<template>
	<fragment>
		<section id="talks-landing" class="full landing-screen">
			<countdown />
			<h1>What we're talkin' about</h1>
			<div class="plus-grid red"></div>
		</section>
		<section class="talks-view">
			<HeaderBar
				title="Submitted Talks"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<p class="description-text intro">
				These are the talks that have been submitted so far for Develop
				Denver 2019.
				<router-link :to="{ name: 'tickets' }"
					>Buy a ticket</router-link
				>
				so you can vote for what you want to see starting on June 1st!
			</p>
			<div class="talk-list">
				<TalkInfo
					view="allTalks"
					:talk="talk"
					v-for="(talk, ix) in shuffledTalks"
					:key="ix"
				/>
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down.vue';
import HeaderBar from '@/components/header-bar.vue';
import TalkInfo from '@/components/talk-info.vue';

const icons = ['bomb', 'happy', 'skull'];

export default {
	components: {
		Countdown,
		HeaderBar,
		TalkInfo,
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

#talks-landing {
	.plus-grid.red {
		grid-column: 3 / span 4;
		height: 40vh;
		margin-top: 20vh;
		width: 50vw;
		@media (max-width: $small-breakpoint) {
			height: 15vh;
			margin-top: 0;
		}
	}
}
.talks-view {
	.intro {
		padding-bottom: $baseline * 4;
	}
}
.talk-list {
	@include grid;
	@include grid-full-width;
	.talk {
		@include grid-full-width;
	}
}
</style>
