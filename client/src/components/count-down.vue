<template>
<div class="countdown-parent">
	<div>
    {{toTwoDigits(countDownToConference.days)}}
	</div>
	<div>:</div>
	<div>
		{{countDownToConference.hours}}
	</div>
	<div>:</div>
	<div>
		{{countDownToConference.minutes}}
	</div>
	<div>:</div>
	<div>
		{{countDownToConference.seconds}}
	</div>
</div>
</template>

<script>
export default {
	name: "Countdown",
	data() {
		return {
			conferenceDate: new Date("oct 18, 2018 08:00:00").getTime(),
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
			return {days, hours, minutes, seconds};
		},
	},
	methods: {
		startInterval() {
			window.setInterval(() => {
				this.today = Date.now();
			}, 1000);
		},
		toTwoDigits(num) {
			return (num < 10 ? "0" : "") + num;
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
	flex-direction: row;
	justify-content: space-around;
	div {
		font-size: $xl;
	}
}

</style>
