<template>
	<fragment>
		<section id="manage-tickets-landing" class="full landing-screen">
			<countdown />
			<div class="plus-grid"></div>
		</section>
		<section class="my-tickets">
			<HeaderBar
				title="My Tickets"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_TIX.png')
				"
				v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_TICKET.svg')"
			/>
			<ManageTicket
				v-for="(ticket, ix) in tickets"
				:key="'ticket' + ix"
				v-bind="ticket"
			/>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';
import { mapState } from 'vuex';

import Countdown from '../components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import ManageTicket from '../components/manage-ticket';

export default {
	name: 'MyTickets',
	components: { HeaderBar, ManageTicket, Countdown },
	computed: {
		...mapState({
			tickets: state => state.tickets.list,
		}),
	},
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

#manage-tickets-landing {
	@include grid-full-width;
	position: relative;
	.plus-grid {
		@include plus-grid;
		grid-column: 1 / span 4;
		height: 35vh;
		margin-top: 0vh;
		position: absolute !important;
		width: 100vw;
		right: 0;
		z-index: 0;
	}
	.countdown {
		z-index: 2;
	}
	@media (max-width: $small-breakpoint) {
		.plus-grid {
			height: 15vh;
		}
	}
}

.my-tickets {
	@include grid;
	@include grid-full-width;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
}
</style>
