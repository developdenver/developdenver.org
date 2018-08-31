<template>
    <section class="talk-page">
        <talk-info :talk="talk" />
        <!-- <profile-card-list v-if="shuffledProfiles" :profiles="shuffledProfiles" /> -->
    </section>
</template>

<script>
import TalkInfo from "@/components/talk-info.vue";

export default {
	components: {
		TalkInfo,
	},
	// created() {
	// for later when showing all talks
	// 	this.$store.dispatch("fetchTalks");
	// },
	computed: {
		currentTalk() {
			return this.$store.getters.getTalkById(this.$route.params.id);
		},
		shuffledProfiles() {
			return this.shuffle(this.$store.state.profiles);
		},
	},
	methods: {
        // want for showing all talks
		// shuffle(array) {
		// 	let currentIndex = array.length;
		// 	let temporaryValue;
		// 	let randomIndex;

		// 	while (currentIndex !== 0) {
		// 		randomIndex = Math.floor(Math.random() * currentIndex);
		// 		currentIndex -= 1;

		// 		temporaryValue = array[currentIndex];
		// 		array[currentIndex] = array[randomIndex];
		// 		array[randomIndex] = temporaryValue;
		// 	}

		// 	return array;
		// },
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
