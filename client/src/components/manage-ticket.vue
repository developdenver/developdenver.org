<template>
  <div class="manage-ticket">
    <div v-if="attendee">
      <div class="ticket-status">
        <font-awesome-icon :icon="['fas', 'ticket-alt']"/>Claimed
      </div>
      by {{ attendeeName }}
      <span v-if="myTicket">(that's you!)</span>
    </div>
    <div v-else-if="unclaimed_ticket && unclaimed_ticket.emailed_to">
      <div class="ticket-status">
        <font-awesome-icon :icon="['fas', 'ticket-alt']"/>Unclaimed
      </div>
      emailed to {{ unclaimed_ticket.emailed_to }}
      <div class="ticket-actions">
        <button @click="remind">Send a reminder</button>
        <button @click="revoke">Revoke invitation</button>
      </div>
    </div>
    <div v-else>
      <div class="ticket-status">
        <font-awesome-icon :icon="['fas', 'ticket-alt']"/>Not yet shared
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
.manage-ticket {
    display: flex;
    flex-direction: column;
    margin: 20px;
    > div {
        width: 100%;
        min-width: 400px;
    }
    .svg-inline--fa {
        margin-top: 3px;
        margin-right: 3px;
    }
    .ticket-status {
        font-size: 1.5rem;
        margin-bottom: 5px;
    }
    .ticket-actions {
        display: flex;
        margin-top: 4px;
        font-size: 1.3rem;
        input {
            margin-bottom: 0;
            padding: 2px 4px;
        }
        button {
            max-width: 150px;
            width: fit-content;
            padding: 2px 8px;
        }
    }
}
</style>
