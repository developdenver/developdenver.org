<template>
  <div class="valid-claim-token">
    <h1>Nice! {{ purchaserName }} gave you a ticket to DVLP DNVR!</h1>
    <div
      v-if="isAttendee"
    >But, you already have a ticket. Contact {{ purchaserName }} to let them know they can share with someone else</div>
    <div v-if="!isLoggedIn">
      &nbsp;
      <router-link :to="{name: 'register', query: redirectToPageQuery }">make an account</router-link>&nbsp;or&nbsp;
      <router-link :to="{name: 'login', query: redirectToPageQuery }">login</router-link>&nbsp;to claim your ticket
    </div>
    <div v-if="!isAttendee && isLoggedIn">
      <ClaimTicketButton/>
    </div>
  </div>
</template>

<script>
import ClaimTicketButton from './claim-ticket-button';
import { mapGetters } from 'vuex';
export default {
    components: { ClaimTicketButton },
    props: ['purchaser', 'ticket'],
    computed: {
        ...mapGetters({
            profileLoaded: 'services/user/profileLoaded',
            isAttendee: 'tickets/isAttendee',
            isLoggedIn: 'services/user/isLoggedIn',
        }),

        purchaserName() {
            if (!this.purchaser.first_name) return this.purchaser.email;
            return this.purchaser.first_name + ' ' + this.purchaser.last_name;
        },
        redirectToPageQuery() {
            if (this.$route.meta.takeItBackNowYall) {
                return { redirect: this.$route.path };
            }
            return null;
        },
    },
};
</script>

<style lang="scss" scoped>
.valid-claim-token {
    > div {
        margin-top: 20px;
    }
}
</style>
