<template>
  <div class="featured-talks">
    <h2>Featured Talks</h2>
    <div class="the-talks">
      <TalkInfo :talk="talk" v-for="(talk, ix) in talks" :key="ix"/>
    </div>
  </div>
</template>

<script>
import talkData from '../data/featured-talks';
import TalkInfo from '@/components/talk-info';
export default {
    name: 'FeaturedTalks',
    data() {
        return { talks: talkData.map(t => ({ properties: t })) };
    },
    components: { TalkInfo },
};
</script>

<style lang="scss" scoped>
h2 {
    font-family: DVLP;
    font-weight: 700;
    font-size: 2.618rem;
    max-width: 40rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    width: 100%;
    -ms-flex-item-align: start;
    align-self: flex-start;

    margin-left: 20px;
}
.the-talks {
    margin-top: 40px;
}
.the-talks .talk {
    min-width: 400px;
}
</style>
