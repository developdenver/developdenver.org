<template>
  <section class="talk-list">
	  <TalkInfo :talk="talk" v-for="(talk, ix) in talks" :key="ix"/>
  </section>
</template>

<script>
import TalkInfo from '@/components/talk-info';

export default {
    name: 'TalkList',
	props: {
		talks: Array,
	},
    components: { TalkInfo },
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';

.talk-list {
	@include grid;
	@include grid-full-width;
	.talk {
		@include grid-full-width;
	}
}
</style>
