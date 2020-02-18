<template>
	<div class="countdown">
		<div class="numbers" v-if="unixDeltaToStart">
			<span class="days">{{ countDownToConference.days }}</span>
			<span class="days-divider">/</span>
			<span class="hours">{{ countDownToConference.hours }}</span>
			<span class="hours-divider">/</span>
			<span class="minutes">{{ countDownToConference.minutes }}</span>
		</div>
		<div class="numbers" v-else>
			<span class="hours dvlp">DVLP</span>
			<span class="hours-divider">/</span>
			<span class="minutes">DNVR</span>
		</div>

		<div class="labels" v-if="unixDeltaToStart">
			<span class="days-label">Days</span>
			<span class="hours-label">Hours</span>
			<span class="minutes-label">Min</span>
		</div>
	</div>
</template>

/* SCRIPTS */
<script>
export default {
	name: 'Countdown',
	data() {
		return {
			conferenceDate: new Date('Aug 13, 2020 08:00:00').getTime(),
			today: Date.now(),
		};
	},
	mounted() {
		this.startInterval();
	},
	computed: {
		unixDeltaToStart() {
			const distance = this.conferenceDate - this.today;
			if (distance < 0) {
				return null;
			}
			return distance;
		},
		countDownToConference() {
			const distance = this.unixDeltaToStart;
			const days = this.toTwoDigits(
				Math.floor(distance / (1000 * 60 * 60 * 24)),
			);
			const hours = this.toTwoDigits(
				Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
				),
			);
			const minutes = this.toTwoDigits(
				Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
			);
			const seconds = this.toTwoDigits(
				Math.floor((distance % (1000 * 60)) / 1000),
			);
			return { days, hours, minutes, seconds };
		},
	},
	methods: {
		startInterval() {
			window.setInterval(() => {
				this.today = Date.now();
			}, 1000);
		},
		toTwoDigits(num) {
			return (+num < 10 ? '0' : '') + +num;
		},
	},
};
</script>

/* STYLES */
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';

.countdown {
	@include grid-countdown;
	background: $yellow;
	grid-row: 1;

	.numbers {
		@include primary-header-font;
		@include justify-content(space-between);
		border-bottom: $thin-border-width solid $black;
		display: grid;
		font-size: 30px;
		grid-template: 1 / 5;
		grid-template-areas: 'days days-divider hours hours-divider minutes';
		span {
			padding-right: 5px;
			&:last-child {
				padding-right: 0;
			}
		}
	}
	@media (max-width: $small-breakpoint) {
		justify-self: end;
		.numbers {
			font-size: $baseline;
		}
	}

	.labels {
		@include secondary-font;
		@include justify-content(space-between);
		display: grid;
		font-size: 12px;
		grid-template: 1 / 5;
		grid-template-areas: 'days-label . hours-label . minutes-label';
		letter-spacing: 0.25em;
		padding-top: 10px;
		text-transform: uppercase;
		@media (max-width: $small-breakpoint) {
			font-size: $baseline / 2;
			padding: ($baseline / 2) 0;
		}
	}

	.days {
		grid-area: days;
	}
	.days-divider {
		grid-area: days-divider;
	}
	.days-label {
		grid-area: days-label;
	}
	.hours {
		grid-area: hours;
	}
	.hours-divider {
		grid-area: hours-divider;
	}
	.hours-label {
		grid-area: hours-label;
	}
	.minutes {
		grid-area: minutes;
	}
	.minutes-label {
		grid-area: minutes-label;
	}
}
</style>
