<template>
    <ul class="schedule-card-list">
        <li
			v-for="(event, index) in events"
			:key="index"
		>
            <schedule-card :event="event" />
        </li>
    </ul>
</template>

<script>
import ScheduleCard from "@/components/schedule-card.vue";

export default {
	components: {
		ScheduleCard,
	},
	props: {
		events: Array,
	},
};
</script>

<style lang="scss">
    @import "@/styles/_typography.scss";

    .schedule-card-list {
        display: flex;
        flex-flow: column nowrap;
		width: 100%;
    }
</style>
