<template>
    <section class="talk-page">
        <talk-info :talk="currentTalk" />
    </section>
</template>

<script>
import TalkInfo from "@/components/talk-info.vue";

export default {
	components: {
		TalkInfo,
	},
	mounted() {
		this.$store.dispatch("services/talk/fetchTalks");
	},
	computed: {
		currentTalk() {
			return this.$store.getters["services/talk/getTalkById"](Number(this.$route.params.id));
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
