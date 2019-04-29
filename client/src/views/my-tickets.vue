<template>
  <div class="my-tickets">
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
export default {
    name: 'MyTickets',
    components: { ManageTicket },
    computed: {
        ...mapState({
            tickets: state => state.tickets.list,
        }),
    },
};
</script>

<style lang="scss" scoped>
.my-tickets {
}
</style>
