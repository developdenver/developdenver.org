<template>
	<div class="valid-claim-token">
		<HeaderBar
			title="You've Got A Ticket"
			v-bind:imageUrl="require('@/assets/icons/DD_SITE_ICONS_TIX.png')"
			v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_TICKET.svg')"
		/>
		<p>Nice! {{ purchaserName }} gave you a ticket to DVLP DNVR!</p>
		<p v-if="isAttendee">
			But, you already have a ticket. Contact {{ purchaserName }} to let
			them know they can share with someone else.
		</p>
		<div v-if="!isLoggedIn">
			<router-link :to="{ name: 'register', query: redirectToPageQuery }"
				>make an account</router-link
			>
			or
			<router-link :to="{ name: 'login', query: redirectToPageQuery }"
				>login</router-link
			>
			to claim your ticket.
		</div>
		<div v-if="!isAttendee && isLoggedIn">
			<ClaimTicketButton />
		</div>
	</div>
</template>

<script>
import ClaimTicketButton from './claim-ticket-button';
import HeaderBar from '@/components/header-bar.vue';
import { mapGetters } from 'vuex';
export default {
	components: { ClaimTicketButton, HeaderBar },
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
}
</style>
