<template>
  <div class="featured-talks">
    <h2>Featured Talks</h2>
    <div class="talks">
      <TalkInfo :talk="talk" v-for="(talk, ix) in talks" :key="ix"/>
    </div>
  </div>
</template>

<script>
import talkData from '../data/featured-talks';
import TalkInfo from '@/components/talk-info';
import bomb from '@/assets/icons/bomb_white.svg';
import happy from '@/assets/icons/happy_white.svg';
import skull from '@/assets/icons/skull_white.svg';

const icons = { bomb, happy, skull }

export default {
    name: 'FeaturedTalks',
    data() {
        return {
			talks: talkData.map(talk => {
				return { properties: Object.assign(talk, { icon: icons[talk.icon] }) }
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
	grid-template: repeat(8, 1fr);
	grid-auto-rows: auto;
	margin-bottom: $baseline * 8 0;
	h2 {
		grid-columns: 2 / span 5
	}
}
</style>
