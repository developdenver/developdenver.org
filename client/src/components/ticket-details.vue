<template>
	<section id="ticket-details">
		<HeaderBar
			title="Tickets"
			v-bind:imageUrl="require('@/assets/icons/DD_SITE_ICONS_TIX.png')"
			v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_TICKET.svg')"
		/>
		<div class="benefits">
			<p>
				All badges include a custom printed 2-day conference badge,
				access to keynote, talks, workshops, and live podcasts, coffee,
				breakfast, and lunch at Zeppelin Station vendors both days,
				opening and closing parties, 8th annual Ballmer Peak Hackathon
			</p>
			<router-link :to="{ name: 'tickets' }">
				<button>Buy Tickets</button>
			</router-link>
		</div>
		<div class="groups">
			<p>
				Don’t worry, we’re all setup so you can purchase a group of
				conference badges. You’ll be asked to provide an email address
				for each attendee and you’re good to go. Have questions?
			</p>
			<p>
				Please contact us at
				<a href="mailto:hello@developdenver.org"
					>hello@developdenver.org</a
				>
				if you need help.
			</p>
		</div>
	</section>
</template>

<script>
import HeaderBar from '@/components/header-bar.vue';
export default {
	components: {
		HeaderBar,
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

#ticket-details {
	.benefits {
		grid-column: 1 / span 3;
		grid-row: 2;
	}
	.groups {
		grid-column: 5 / span 2;
		grid-row: 2;
	}
	@media (max-width: $medium-breakpoint) {
		.benefits,
		.groups {
			grid-column: 1 / span 6;
		}
		.groups {
			grid-row: 3;
			padding-top: $baseline * 3;
		}
	}
	@media (max-width: $small-breakpoint) {
		.benefits,
		.groups {
			grid-column: 1;
		}
	}
}
</style>
