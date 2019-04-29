<template>
  <div class="claim-ticket-button">
    <Await :p="claimP">
      <button slot="none" @click="claim">Claim My Ticket</button>
      <p>claiming...</p>
      <p slot="then">Success!</p>
      <p
        slot="catch"
        slot-scope="[error]"
      >Uh oh, something went wrong claiming your ticket: {{ error }}</p>
    </Await>
  </div>
</template>

<script>
import Await from 'vue-await';
import { claimTicket } from '../modules/api';
import sleep from '../utilities/sleep';
import { mapState } from 'vuex';
export default {
    name: 'ClaimTicketButton',
    components: { Await },
    data() {
        return { claimP: null };
    },
    computed: {
        ...mapState({
            token: state => state.services.user.token,
        }),
        claimToken() {
            return this.$route.params.claimToken;
        },
    },
    methods: {
        claim() {
            this.claimP = claimTicket(this.token, this.claimToken);
            this.claimP
                .then(() => sleep(3000))
                .then(() => this.$router.push({ name: 'news' }));
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.claim-ticket-button {
}
</style>
