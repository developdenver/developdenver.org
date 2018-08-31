<template>
	<section class="talks">
		<h2>Talks</h2>
		<talk-card-list :talks="shuffledTalks" />
	</section>
</template>

<script>
import TalkCardList from "@/components/talk-card-list.vue";

export default {
	components: {
		TalkCardList,
	},
	created() {
		this.$store.dispatch("services/talk/fetchTalks");
	},
	computed: {
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
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";

.talks {
	width: 100%;
	h2 {
		@include tertiary-header-font;
		text-align: center;
		margin-bottom: $baseline;
		padding: $baseline;
	}
}
</style>
