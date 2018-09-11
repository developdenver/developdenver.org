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
		this.$store.dispatch("talks/fetchTalks");
		this.$store.dispatch("talks/fetchAllVotes");
	},
	computed: {
		shuffledTalks() {
			return this.$store.state.talks.list;
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
