<template>
	<section class="events">
		<countdown />
		<h2>Events</h2>
		<section class="event-categories" v-for="category in categories" :key="category.title">
			<header>
				<h3>{{category.title}}</h3>
			</header>
			<event-card-list
				:events="category.data"
			/>
		</section>
	</section>
</template>

<script>
import EventCardList from "@/components/event-card-list";
import SponsorList from "@/components/sponsor-list";
import workshops from "@/data/workshops";
import performances from "@/data/performances";
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
				/*
			},{
				title: "Workshops",
				data: this.workshops,
			},{
				title: "Performances",
				data: this.workshops,
				*/
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
			return workshops;
		},
		performances() {
			return performances;
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
	h2 {
		@include grid-heading;
	}
	.event-categories {
		@include grid-full-width;
		@include grid;
		header {
			@include grid-heading;
			h3 {
				@include primary-header-font;
			}
		}
		.event-card-list {
			@include grid-full-width;
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
