<template>
	<section class="events">
		<countdown />
		<h2>Events</h2>
		<a href="dvlp_schedule_digital.pdf" class="button">Download the full schedule</a>
		<section class="event-categories" v-for="category in categories" :key="category.title">
			<header>
				<h3>{{category.title}}</h3>
			</header>
			<event-card-list
				:events="category.data"
			/>
		</section>
		<section class="event-categories">
			<header>
				<h3>PLUS!</h3>
			</header>
			<p class="extra-events">Free food and alcohol both days, opening keynote from Guild Education founder Rachel Carlson, Dev Trivia, opening night party at The Source, the 8th annual Ballmer Peaker Hackathon, closing night party on the rooftop of Industry, and more!</p>
		</section>
	</section>
</template>

<script>
import EventCardList from "@/components/event-card-list";
import SponsorList from "@/components/sponsor-list";
import Countdown from "@/components/count-down.vue";
import {shuffle} from "@/utilities/shuffle";

export default {
	components: {
		EventCardList,
		SponsorList,
		Countdown,
	},
	created() {
		this.$store.dispatch("events/fetchEvents");
	},
	computed: {
		categories() {
			return [{
				title: "Talks",
				data: this.talks,
			},{
				title: "Panels",
				data: this.panels,
			},{
				title: "Lightning Talks",
				data: this.lightningTalks,
			},{
				title: "Workshops",
				data: this.workshops,
			},{
				title: "Performances",
				data: this.performances,
			}]
		},
		events() {
			return this.$store.state.events.list;
		},
		talks() {
			return shuffle(this.events.filter(event => event.properties.type === "talk"));
		},
		panels() {
			return shuffle(this.events.filter(event => event.properties.type === "panel"));
		},
		lightningTalks() {
			return shuffle(this.events.filter(event => event.properties.type === "lightning"));
		},
		workshops() {
			return shuffle(this.events.filter(event => event.properties.type === "workshop"));
		},
		performances() {
			return shuffle(this.events.filter(event => event.properties.type === "performance"));
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";

.events {
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.button {
		grid-row: 3;
		margin-top: $baseline;
		@include grid-cta;
		@include call-to-action;
		@media (max-width: $small-breakpoint) {
			grid-row: 2;
		}
		grid-column: 3/ span 5;
		margin-bottom: $baseline;
		color: white;
	}
	h2 {
		@include grid-heading;
		@media (max-width: $small-breakpoint) {
			margin-top: 30px;
		}
	}
	.event-categories {
		@include grid-full-width;
		@include grid;
		header {
			@include grid-heading;
			h3 {
				@include primary-header-font;
				font-size: 28px;
			}
		}
		.event-card-list {
			@include grid-full-width;
		}
		.extra-events {
			@include grid-heading;
		}
	}
	a {
		text-decoration: underline;
		color: $accent-color;
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>
