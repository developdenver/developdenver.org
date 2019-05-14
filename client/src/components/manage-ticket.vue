<template>
  <div class="manage-ticket">
    <div v-if="attendee">
      <div class="ticket-status">
		  <font-awesome-icon class="ticket-icon" :icon="['fas', 'ticket-alt']"/>
		  <p>Claimed by {{ attendeeName }} <span v-if="myTicket">(that's you!)</span></p>
      </div>
    </div>
    <div v-else-if="unclaimed_ticket && unclaimed_ticket.emailed_to">
      <div class="ticket-status">
        <font-awesome-icon class="ticket-icon" :icon="['fas', 'ticket-alt']"/>Unclaimed
      </div>
	  <p>Emailed to {{ unclaimed_ticket.emailed_to }}</p>
      <div class="ticket-actions">
        <button @click="remind">Send a reminder</button>
        <button @click="revoke">Revoke invitation</button>
      </div>
    </div>
    <div v-else>
      <div class="ticket-status">
        <font-awesome-icon class="ticket-icon" :icon="['fas', 'ticket-alt']"/>Not yet shared
      </div>
      <div class="ticket-actions">
        <input type="email" v-model="shareWith" placeholder="friend@email.com">
        <button @click="share">Invite</button>
      </div>
    </div>
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'ManageTicket',
    props: ['id', 'attendee', 'attendee_id', 'unclaimed_ticket', 'status'],
    data() {
        return {
            shareWith: null,
        };
    },
    computed: {
        ...mapGetters({
            profile: 'services/user/currentProfile',
        }),
        myTicket() {
            return this.attendee_id === this.profile.properties.id;
        },
        attendeeName() {
            if (!this.attendee) return null;
            if (!this.attendee.first_name) return this.attendee.email;
            return this.attendee.first_name + ' ' + this.attendee.last_name;
        },
    },
    methods: {
        remind() {
            this.$store.dispatch(
                'tickets/remind',
                this.unclaimed_ticket.ticket_id,
            );
        },
        revoke() {
            this.$store.dispatch(
                'tickets/revoke',
                this.unclaimed_ticket.ticket_id,
            );
        },
        share() {
            this.$store.dispatch('tickets/invite', {
                ticketId: this.id,
                email: this.shareWith,
            });
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

.manage-ticket {
	@include grid;
	> div, > p {
		@include grid-form;
	}
	input {
		width: 100%;
	}
	button {
		@include call-to-action;
		background: none;
		color: $white;
		@include footer-font;
		margin-bottom: $baseline / 2;
	}
	.ticket-actions {
		margin-bottom: $baseline;
	}
	.ticket-status {
		margin-bottom: $baseline / 2;
		p {
			display: inline-block;
		}
	}
	.ticket-icon {
		margin-right: $baseline;
	}
}
</style>
