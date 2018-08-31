<template>
    <section class="talk-page">
        <talk-info :talk="currentTalk" />
		<!-- <pre>{{this.shuffledTalks}}</pre> -->
        <!-- <profile-card-list v-if="shuffledProfiles" :profiles="shuffledProfiles" /> -->
    </section>
</template>

<script>
import TalkInfo from "@/components/talk-info.vue";

export default {
	components: {
		TalkInfo,
	},
	created() {
		this.$store.dispatch("services/talk/fetchTalks");
	},
	computed: {
		currentTalk() {
			return this.$store.getters["services/talk/getTalkById"](Number(this.$route.params.id));
		},
		shuffledTalks() {
			return this.shuffle(this.$store.state.services.talk.talks);
		},
	},
	methods: {
		shuffle(array) {
			let currentIndex = array.length;
			let temporaryValue;
			let randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		},
	},
};
</script>

<style lang="scss">
    .talk-page {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>
