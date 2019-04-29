<template>
    <ul class="talk-card-list">
        <li
			v-for="(talk, index) in talks"
			:key="index"
		>
            <talk-card :talk="talk" />
        </li>
    </ul>
</template>

<script>
import TalkCard from "@/components/talk-card.vue";

export default {
	components: {
		TalkCard,
	},
	props: {
		talks: Array,
	},
};
</script>

<style lang="scss">
    @import "@/styles/_typography.scss";

    .talk-card-list {
    }
</style>
