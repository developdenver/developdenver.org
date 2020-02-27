<template>
	<fragment>
		<section id="claim-landing" class="full landing-screen short-landing">
			<countdown />
			<div class="plus-grid"></div>
		</section>
		<section>
			<div class="intro">
				<Await :p="ticketInfoP">
					<p>Checking on your ticket...</p>
					<ValidClaimToken
						slot="then"
						slot-scope="[{ purchaser, ticket }]"
						:purchaser="purchaser"
						:ticket="ticket"
					/>
					<div slot="catch" slot-scope="[error]">
						<HeaderBar
							title="Uh Oh. We've Got a Problem"
							v-bind:imageUrl="
								require('@/assets/icons/DD_SITE_ICONS_SAD.svg')
							"
						/>
						<p>Something went wrong claiming the ticket.</p>
						<p>{{ error }}</p>
					</div>
				</Await>
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import { mapGetters } from 'vuex';
import Await from 'vue-await';
import { ticketInfoFromClaim } from '../modules/api';
import ValidClaimToken from '../components/valid-claim-token';

export default {
	name: 'ClaimTicket',
	components: { Await, ValidClaimToken, Countdown, HeaderBar },
	data() {
		return {
			claimToken: this.$route.params.claimToken,
			ticketInfoP: ticketInfoFromClaim(this.$route.params.claimToken),
		};
	},
	computed: {},
};
</script>

<style lang="scss"></style>
