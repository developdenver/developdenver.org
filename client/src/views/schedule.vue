<template>
	<div class="schedule-wrapper">
		<div class="filters">
			<div class="filter category-filter">
				<label>Filter by Category:</label>
				<select v-model="selectedCategory">
					<option
						v-for="(category, index) in categories"
						:key="index"
						:value="category.id"
					>{{category.label}}</option>
				</select>
			</div>
			<div class="filter venue-filter">
				<label>Filter by Venue:</label>
				<select v-model="selectedVenue">
					<option
						v-for="(venue, index) in venues"
						:value="venue.id"
						:key="index"
					>{{venue.label}}</option>
				</select>
			</div>
		</div>
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
	data() {
		return {
			selectedCategory: "all",
			categories: [{
				id: "all",
				label: "All",
				includedCategories: ["development", "product", "careers", "devops", "workshop", "event"],
			}, {
				id: "development",
				label: "Development",
				includedCategories: ["development", "workshop", "event"],
			}, {
				id: "product",
				label: "Product",
				includedCategories: ["product", "workshop", "event"],
			}, {
				id: "careers",
				label: "Careers",
				includedCategories: ["careers", "workshop", "event"],
			}, {
				id: "devops",
				label: "DevOps",
				includedCategories: ["devops", "workshop", "event"],
			}, {
				id: "workshops",
				label: "Workshops",
				includedCategories: ["workshop", "event"],
			}],
			selectedVenue: "all",
			venues: [{
				id: "all",
				label: "All",
				includedVenues: ["Bigsby's Folly", "The Urban Cyclist", "Catalyst HTI", "Big Trouble", "The Source Hotel", "RINO Yacht Club"],
			}, {
				id: "Bigsby's Folly",
				label: "Bigsby's Folly",
				includedVenues: ["Bigsby's Folly"],
			}, {
				id: "The Urban Cyclist",
				label: "The Urban Cyclist",
				includedVenues: ["The Urban Cyclist"],
			}, {
				id: "Catalyst HTI",
				label: "Catalyst HTI",
				includedVenues: ["Catalyst HTI"],
			}, {
				id: "Big Trouble",
				label: "Big Trouble",
				includedVenues: ["Big Trouble"],
			}, {
				id: "The Source Hotel",
				label: "The Source Hotel",
				includedVenues: ["The Source Hotel"],
			}],
		};
	},
	components: {
		SponsorList,
		ScheduleCardList,
	},
	created() {
		this.$store.dispatch("scheduleListings/fetchAll");
	},
	mounted() {
		const isChrome = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
		const isSafari = window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;
		if (isChrome || isSafari) {
			const $friday = document.querySelector(".friday");
			$friday.style.marginTop = "37rem";
			$friday.style.marginBottom = "5rem";
		}
	},
	computed: {
		events() {
			const events = [...this.$store.state.scheduleListings.list];
			return events.sort(this.sortEvents);
		},
		filteredEvents() {
			return this.events
				.filter(event => this.filterByCategory(this.selectedCategory)(event.properties.category))
				.filter(event => this.filterByVenue(this.selectedVenue)(event.properties.venue));
		},
		thursdayEventsByTime() {
			return this.filteredEvents.filter(event => event.properties.day === "Thursday");
		},
		fridayEventsByTime() {
			return this.filteredEvents.filter(event => event.properties.day === "Friday");
		},
		getCategory(category) {
			return events => {
				events.filter(event => event.properties.category === category);
			};
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
		filterByCategory(selectedCategory) {
			return eventCategory => this.categories
				.find(category => category.id === selectedCategory).includedCategories.includes(eventCategory);
		},
		filterByVenue(selectedVenue) {
			return eventVenue => this.venues
				.find(venue => venue.id === selectedVenue).includedVenues.includes(eventVenue);
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
@import "@/styles/_colors.scss";

.schedule-wrapper {
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	.filters {
		position: sticky;
		top: 0;
		background-color: $white;
		z-index: 50;
		padding: $baseline;
		opacity: 0.97;
		.filter {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			margin-bottom: $small;
			width: 100%;
			label, select {
				display: inline;
			}
			label {
				margin-right: $baseline;
			}
			select {
				min-width: 10rem;
			}
		}
	}
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
