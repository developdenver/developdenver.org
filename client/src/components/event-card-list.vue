<template>
    <ul class="event-card-list">
        <li
			v-for="(event, index) in events"
			:key="index"
		>
            <event-card :event="event" />
        </li>
    </ul>
</template>

<script>
import EventCard from "@/components/event-card.vue";

export default {
	components: {
		EventCard,
	},
	props: {
		events: Array,
	},
};
</script>

<style lang="scss">
    @import "@/styles/_typography.scss";

    .event-card-list {
    }
</style>
