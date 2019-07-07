<template>
  <div class="claim-ticket">
    <Await :p="ticketInfoP">
      <p>Checking on your ticket...</p>
      <ValidClaimToken
        slot="then"
        slot-scope="[{ purchaser, ticket }]"
        :purchaser="purchaser"
        :ticket="ticket"
      />
      <div slot="catch" slot-scope="[error]">
        <p>Uh oh, something went wrong claiming the ticket.</p>
        <p>{{ error }}</p>
      </div>
    </Await>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Await from 'vue-await';
import { ticketInfoFromClaim } from '../modules/api';
import ValidClaimToken from '../components/valid-claim-token';

export default {
    name: 'ClaimTicket',
    components: { Await, ValidClaimToken },
    data() {
        return {
            claimToken: this.$route.params.claimToken,
            ticketInfoP: ticketInfoFromClaim(this.$route.params.claimToken),
        };
    },
    computed: {},
};
</script>

<style lang="scss">
.claim-ticket {
  margin-left: 100px;
  margin-top: 100px;
}
</style>
