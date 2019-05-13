<template>
  <div class="my-tickets">
	<countdown />
    <h2>My Tickets</h2>
    <ul>
      <li v-for="ticket in tickets" :key="ticket.id">
        <ManageTicket v-bind="ticket"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ManageTicket from '../components/manage-ticket';
import Countdown from '../components/count-down';

export default {
    name: 'MyTickets',
    components: { ManageTicket, Countdown },
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

.my-tickets {
	@include grid;
	@include grid-full-width;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>
