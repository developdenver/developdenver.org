<template>
  <section class="featured-talks">
    <h2>Featured Talks</h2>
    <div class="talks">
      <TalkInfo :talk="talk" v-for="(talk, ix) in talks" :key="ix"/>
    </div>
  </section>
</template>

<script>
import talkData from '../data/featured-talks';
import TalkInfo from '@/components/talk-info';

export default {
    name: 'FeaturedTalks',
    data() {
        return {
			talks: talkData.map(talk => {
				const featuredTalk = Object.assign({}, talk, { isFeatured: true })
				return { properties: featuredTalk };
			})
		}
    },
    components: { TalkInfo },
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';

.featured-talks {
	@include grid;
	h2, .talks {
		@include grid-full-width;
	}
	.talk {
		@include grid-full-width;
	}
	h2 {
		@include grid-heading;
	}
}
</style>
