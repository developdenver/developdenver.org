<template>
	<div class="events-wrapper">
		<section class="events">
			<h2>Events</h2>
			<div class="list-wrapper">
				<header>
					<h3>Talks</h3>
				</header>
				<event-card-list
					:events="talks"
				/>
				<header>
					<h3>Panels</h3>
				</header>
				<event-card-list
					:events="panels"
				/>
				<header>
					<h3>Lightning Talks</h3>
				</header>
				<event-card-list
					:events="lightningTalks"
				/>
				<header>
					<h3>Workshops</h3>
				</header>
				<event-card-list
					:events="workshops"
				/>
				<header>
					<h3>Live Performances</h3>
				</header>
				<event-card-list
					:events="performances"
				/>
				<header>
					<h3>Featuring</h3>
				</header>
				<ul class="services">
					<li v-for="(service, index) in services" :key="index">
						{{service.properties.title}}
					</li>
				</ul>
			</div>
		</section>
		<sponsor-list />
	</div>
</template>

<script>
import EventCardList from "@/components/event-card-list";
import SponsorList from "@/components/sponsor-list";
import workshops from "@/data/workshops";
import services from "@/data/services";
import performances from "@/data/performances";
import {shuffle} from "@/utilities/shuffle";

export default {
	components: {
		EventCardList,
		SponsorList,
	},
	created() {
		this.$store.dispatch("events/fetchEvents");
	},
	computed: {
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
		services() {
			return services;
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

.events-wrapper {
}
.events {
}
</style>
