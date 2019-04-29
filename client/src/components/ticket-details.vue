<template>
	<div class="ticket-details">
		<h2>Tickets</h2>
		<div class="date-and-location">
			<p>Conference badges are now on sale!</p>
			<p>When: August 15 and 16, 2019</p>
			<p>Where: RiNo Brighton Boulevard</p>
		</div>
		<div class="benefits">
			<p>All badges include a custom printed 2-day conference badge, access to keynote, talks, workshops, and live podcasts, coffee, breakfast, and lunch at Zeppelin Station vendors both days, opening and closing parties, 8th annual Ballmer Peak Hackathon</p>
		</div>
		<div class="groups">
			<p>Don’t worry, we’re all setup so you can purchase a group of conference badges. You’ll be asked to provide an email address for each attendee and you’re good to go. Have questions? Please contact us at <a href="mailto:hello@developdenver.org">hello@developdenver.org</a> if you need help.</p>
		</div>
		<router-link class="button" :to="{ name: joinUsLink }">Buy Tickets</router-link>
	</div>
</template>

<script>
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.ticket-details {
	@include grid;
	grid-template: repeat(3, auto) / repeat(4, 1fr);

	h2 {
		grid-row: 1;
		grid-column: 1 / span 4;
	}
	.date-and-location {
		grid-row: 2;
		grid-column: 1 / span 1;
		p {
			margin-bottom: $baseline;
		}
	}
	.benefits {
		grid-row: 2;
		grid-column: 2 / span 1;
	}
	.groups {
		grid-row: 2;
		grid-column: 3 / span 2;
	}
	.button {
		grid-row: 3;
		margin-top: $baseline;
		@include call-to-action;
	}
}
</style>
