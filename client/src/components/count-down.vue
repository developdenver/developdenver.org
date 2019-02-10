<template>
<div class="countdown-parent">
	<span>
		<p class="numbers">{{toTwoDigits(countDownToConference.days)}}</p>
		<p class="counter-label">days</p>
	</span>
	<span class="divider">/</span>
	<span>
		<p class="numbers">{{toTwoDigits(countDownToConference.hours)}}</p>
		<p class="counter-label">hours</p>
	</span>
	<span class="divider">/</span>
	<span>
		<p class="numbers">{{toTwoDigits(countDownToConference.minutes)}}</p>
		<p class="counter-label">minutes</p>
	</span>
	<span class="divider">/</span>
	<span>
		<p class="numbers">{{toTwoDigits(countDownToConference.seconds)}}</p>
		<p class="counter-label">seconds</p>
	</span>
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
	computed: {
		countDownToConference() {
			this.startInterval();
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
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

.countdown-parent {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	@include countdown-font;
	.numbers, .divider {
		font-size: $xxxl;
	}
	.divider {
		margin: 0 $large;
	}
	.counter-label {
		font-size: $small;
		text-transform: uppercase;
	}
}

</style>
