<template>
  <fragment>
    <section id="talk-landing" class="full landing-screen">
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
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import Countdown from '@/components/count-down';
import TalkInfo from '@/components/talk-info.vue';
import workshops from '@/data/workshops';

export default {
	components: {
    		Countdown,
		TalkInfo,
	},
	mounted() {},
	computed: {
		currentTalk() {
			return workshops.find(
				workshop => workshop.id === this.$route.params.id,
			);
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
#talk-landing {
	@include grid-full-width;
	position: relative;
	.plus-grid {
		@include plus-grid;
		grid-column: 1 / span 4;
		height: 25vh;
		margin-top: 0vh;
		position: absolute !important;
		width: 100vw;
		right: 0;
		z-index: 1;
		@media (max-width: $small-breakpoint) {
			height: 20vh;
		}
	}
	.countdown {
		z-index: 2;
	}
}
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
