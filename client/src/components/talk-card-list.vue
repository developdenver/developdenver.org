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
        display: flex;
        flex-flow: row wrap;
        li {
            width: calc((100vw - (100vw - 100%)) * (1/4));
			@media (max-width: $large-breakpoint) {
				width: calc(100% * (1/2));
			}
			@media (max-width: $small-breakpoint) {
				width: 100%;
			}
        }
    }
</style>
