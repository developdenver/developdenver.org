<template>
    <div class="talk-card">
		<router-link :to="{name: 'talk', params: {id: talk.id}}" :class="{disabled: !talk.id}">
			<!-- <div class="frame" :class="{ 'voted-for-frame': voted }"></div> -->
			<div class="image-wrapper" :style="{backgroundImage: `url(${talk.properties.talkPhotoUrl})`}"></div>
            <div class="title-plate">
                <p class="title">{{talk.properties.title}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
	props: {
		talk: {
			type: Object,
			required: true,
		},
	},
	computed: {
		/*
		voted() {
			return this.$store.getters["talks/votedTalksById"][this.talk.id];
		}
		*/
	}
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

    .talk-card {
    }
</style>
