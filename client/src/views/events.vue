<template>
	<fragment>
		<section id="schedule-landing" class="full landing-screen">
			<countdown />
			<h1>The devil-opment is in the details</h1>
			<div class="plus-grid red"></div>
			<div class="cta">
				<!-- NOTE: After Schedule Available Comment in and remove BUY TICKETS -->
				<!--
				<a href="dvlp_schedule_digital.pdf" class="schedule-button">
					<button>Download the full schedule</button>
				</a>
			-->
				<BuyTicketsButton />
			</div>
		</section>
		<section class="intro-image full">
			<div class="image-wrapper">
				<img src="/img/2020/dd_20_schedule.jpg" alt="schedule photo" />
			</div>
		</section>
		<section id="schedule-intro">
			<HeaderBar
				title="The Run of Show"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SKULL.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="intro">
				<p>
					The schedule for Develop Denver is determined by you. So get
					a ticket, vote on your favorite talks and check back for the
					full run of show.
				</p>
				<p>
					No matter what mind-bending topics end up on the bill you
					can expect free food and alcohol both days, an unforgettable
					opening keynote, an opening-night party, the 9th annual
					Ballmer Peaker Hackathon, and a closing night party. It's
					not to be missed.
				</p>
			</div>
			<router-link class="button" :to="{ name: 'submit-talk' }"
				><button>Submit a Talk</button></router-link
			>
			<span class="register-wrapper">
				<BuyTicketsButton />
			</span>
		</section>
		<!-- NOTE: This section needs to be reworked with filtering when the schedule is available -->
		<!-- <section
			class="event-categories"
			v-for="category in categories"
			:key="category.title"
		>
			<header>
				<h3>{{ category.title }}</h3>
			</header>
			<event-card-list :events="category.data" />
		</section>
		<section class="event-categories">
			<header>
				<h3>PLUS!</h3>
			</header>
			<p class="extra-events">
				Free food and alcohol both days, opening keynote from Guild
				Education founder Rachel Carlson, Dev Trivia, opening night
				party at The Source, the 8th annual Ballmer Peaker Hackathon,
				closing night party on the rooftop of Industry, and more!
			</p>
		</section> -->
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import BuyTicketsButton from '@/components/buy-tickets-button.vue';
import Countdown from '@/components/count-down.vue';
import HeaderBar from '@/components/header-bar.vue';
import EventCardList from '@/components/event-card-list';
import SponsorList from '@/components/sponsor-list';
import { shuffle } from '@/utilities/shuffle';

export default {
	components: {
		BuyTicketsButton,
		EventCardList,
		SponsorList,
		Countdown,
		HeaderBar,
	},
	created() {
		this.$store.dispatch('events/fetchEvents');
	},
	computed: {
		categories() {
			return [
				{
					title: 'Talks',
					data: this.talks,
				},
				{
					title: 'Panels',
					data: this.panels,
				},
				{
					title: 'Lightning Talks',
					data: this.lightningTalks,
				},
				{
					title: 'Workshops',
					data: this.workshops,
				},
				{
					title: 'Performances',
					data: this.performances,
				},
			];
		},
		events() {
			return this.$store.state.events.list;
		},
		talks() {
			return shuffle(
				this.events.filter(event => event.properties.type === 'talk'),
			);
		},
		panels() {
			return shuffle(
				this.events.filter(event => event.properties.type === 'panel'),
			);
		},
		lightningTalks() {
			return shuffle(
				this.events.filter(
					event => event.properties.type === 'lightning',
				),
			);
		},
		workshops() {
			return shuffle(
				this.events.filter(
					event => event.properties.type === 'workshop',
				),
			);
		},
		performances() {
			return shuffle(
				this.events.filter(
					event => event.properties.type === 'performance',
				),
			);
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.intro {
	@include grid-full-width;
}
#schedule-landing {
	.plus-grid.red {
		grid-column: 2 / span 4;
		height: 50vh;
		margin-top: 60vh;
		width: 50vw;
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid.red {
			height: 25vh;
			margin-top: 0vh;
		}
	}
}

#schedule-intro {
	a {
		grid-column: 1 / span 3;
		&:last-child {
			grid-column: 4 / span 3;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			&:last-child {
				grid-column: 1;
			}
		}
	}
	.register-wrapper {
		grid-column: 4 / span 3;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			&:last-child {
				grid-column: 1;
			}
		}
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
</style>
