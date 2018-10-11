<template>
	<div class="schedule-wrapper">
		<section class="schedule">
			<h2>Thursday</h2>
			<schedule-card-list :events="thursdayEventsByTime" />
		</section>
		<section class="schedule friday">
			<h2>Friday</h2>
			<schedule-card-list :events="fridayEventsByTime" />
		</section>
		<sponsor-list />
	</div>
</template>

<script>
import ScheduleCardList from "@/components/schedule-card-list";
import SponsorList from "@/components/sponsor-list";

export default {
	components: {
		SponsorList,
		ScheduleCardList,
	},
	created() {
		this.$store.dispatch("scheduleListings/fetchAll");
	},
	mounted() {
		const isChrome = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
		if (isChrome) {
			document.querySelector(".friday").style.marginTop = "10rem";
		}
	},
	computed: {
		events() {
			const events = [...this.$store.state.scheduleListings.list];
			return events.sort(this.sortEvents);
		},
		thursdayEventsByTime() {
			return this.events.filter(event => event.properties.day === "Thursday");
		},
		fridayEventsByTime() {
			return this.events.filter(event => event.properties.day === "Friday");
		},
		thursdayEventsByVenue() {
			return this.splitByVenues(this.events.filter(event => event.properties.day === "Thursday"));
		},
		fridayEventsByVenue() {
			return this.splitByVenues(this.events.filter(event => event.properties.day === "Friday"));
		},
	},
	methods: {
		sortEvents(firstEvent, secondEvent) {
			return this.compareNumbers(firstEvent.properties.startTime, secondEvent.properties.startTime);
		},
		compareNumbers(firstNumber, secondNumber) {
			return Number(firstNumber) - Number(secondNumber);
		},
		splitByVenues(events) {
			return [{
				label: "Bigsby's Folly",
				events: events.filter(event => event.properties.venue === "Bigsby's Folly"),
			}, {
				label: "Catalyst",
				events: events.filter(event => event.properties.venue === "Catalyst"),
			}, {
				label: "Big Trouble",
				events: events.filter(event => event.properties.venue === "Big Trouble"),
			}, {
				label: "Source Hotel",
				events: events.filter(event => event.properties.venue === "Source Hotel"),
			}, {
				label: "Urban Cyclist",
				events: events.filter(event => event.properties.venue === "Urban Cyclist"),
			}];
		},
	}
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";

.schedule-wrapper {
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
}
.schedule {
	max-width: 600px;
	display: flex;
	flex-flow: column nowrap;
	flex: 1;
	h2 {
		@include secondary-header-font;
		align-self: center;
		margin-bottom: $baseline;
		padding: $baseline;
	}
	header {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		h3 {
			@include section-header-font;
			margin-bottom: $baseline;
			padding: $baseline;
		}
	}
	.list-wrapper {
		width: 100%;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		.event-card-list {
			max-width: 800px;
		}
	}
	.services {
		align-self: flex-start;
		margin-bottom: $xl;
		padding: 0 $baseline;
		list-style-type: circle;
		li {
			margin-left: $baseline;
			margin-bottom: $small;
		}
	}
}
</style>
