<template>
	<section class="ticket-details">
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
		<router-link class="button" :to="{ name: 'tickets' }">Buy Tickets</router-link>
	</section>
</template>

<script>
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.ticket-details {
	@include grid;
	@media (max-width: $small-breakpoint) {
		grid-auto-rows: auto;
	}

	a:not(.button) {
		text-decoration: underline;
		color: $accent-color;
	}
	h2 {
		@include grid-heading;
		grid-row: 1;
	}
	.date-and-location {
		grid-row: 2;
		@include grid-text-0;
		@media (max-width: $small-breakpoint) {
		}
	}
	.benefits {
		grid-row: 2;
		@include grid-text-1;
		@media (max-width: $small-breakpoint) {
			grid-row: 3;
		}
	}
	.groups {
		grid-row: 2;
		@include grid-text-2;
		@media (max-width: $small-breakpoint) {
			grid-row: 4;
		}
	}
	.button {
		grid-row: 3;
		margin-top: $baseline * 2;
		@include grid-cta;
		@include call-to-action;
		@media (max-width: $small-breakpoint) {
			grid-row: 5;
		}
	}
}
</style>
