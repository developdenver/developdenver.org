<template>
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
				<h3>Services</h3>
			</header>
			<ul class="services">
				<li v-for="service in services">
					{{service.properties.title}}
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import EventCardList from "@/components/event-card-list";
import workshops from "@/data/workshops";
import services from "@/data/services";

export default {
	components: {
		EventCardList,
	},
	created() {
		this.$store.dispatch("events/fetchEvents");
	},
	computed: {
		events() {
			return this.$store.state.events.list;
		},
		talks() {
			return this.events.filter(event => event.properties.type === "talk");
		},
		panels() {
			return this.events.filter(event => event.properties.type === "panel");
		},
		lightningTalks() {
			return this.events.filter(event => event.properties.type === "lightning");
		},
		workshops() {
			return workshops;
		},
		services() {
			return services;
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";

.events {
	max-width: 600px;
	display: flex;
	flex-flow: column nowrap;
	flex: 1;
	h2 {
		@include tertiary-header-font;
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
