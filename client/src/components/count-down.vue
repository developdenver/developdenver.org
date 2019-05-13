<template>
<div class="countdown">
	<div class="numbers">
		<span class="days">{{toTwoDigits(countDownToConference.days)}}</span>
		<span class="days-divider">/</span>
		<span class="hours">{{toTwoDigits(countDownToConference.hours)}}</span>
		<span class="hours-divider">/</span>
		<span class="minutes">{{toTwoDigits(countDownToConference.minutes)}}</span>
		<span class="minutes-divider">/</span>
		<span class="seconds">{{toTwoDigits(countDownToConference.seconds)}}</span>
	</div>

	<div class="labels">
		<span class="days-label">Days</span>
		<span class="hours-label">Hours</span>
		<span class="minutes-label">Min</span>
		<span class="seconds-label">Sec</span>
	</div>

	<p class="description">Until Dvlp // Dvnr // 2019</p>
</div>
</template>

<script>
export default {
	name: "Countdown",
	data() {
		return {
			conferenceDate: new Date("Aug 15, 2019 08:00:00").getTime(),
			today: Date.now(),
		};
	},
	mounted() {
		this.startInterval();
	},
	computed: {
		countDownToConference() {
			const distance = this.conferenceDate - this.today;
			const days = this.toTwoDigits(Math.floor(distance / (1000 * 60 * 60 * 24)));
			const hours = this.toTwoDigits(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
			const minutes = this.toTwoDigits(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
			const seconds = this.toTwoDigits(Math.floor((distance % (1000 * 60)) / 1000));
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
			return (+num < 10 ? "0" : "") + +num;
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";

.countdown {
	width: 100%;

	.numbers {
		@include primary-header-font;
		display: grid;
		grid-template: 1 / 7;
		grid-template-areas:
			"days days-divider hours hours-divider minutes minutes-divider seconds";
		@media (max-width: $small-breakpoint) {
			font-size: $baseline;
		}
		span {
			max-width: 45px;
		}
		span[class$="-divider"] {
			max-width: 30px;
		}
	}

	.labels {
		display: grid;
		grid-template: 1 / 7;
		grid-template-areas:
			"days-label . hours-label . minutes-label . seconds-label";
		padding: $baseline 0;
		border-top: 1px solid $white;
		border-bottom: 1px solid $white;
		@media (max-width: $small-breakpoint) {
			font-size: $baseline / 2;
			padding: ($baseline / 2) 0;
		}
	}

	.description {
		grid-area: description;
		padding-top: $baseline;
		@media (max-width: $small-breakpoint) {
			font-size: $baseline / 2;
			padding-top: $baseline / 2;
			margin-bottom: 0;
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
	.minutes-divider {
		grid-area: minutes-divider;
	}
	.minutes-label {
		grid-area: minutes-label;
	}
	.seconds {
		grid-area: seconds;
	}
	.seconds-divider {
		grid-area: seconds-divider;
	}
	.seconds-label {
		grid-area: seconds-label;
	}
}

</style>
