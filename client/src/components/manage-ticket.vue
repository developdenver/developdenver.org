<template>
	<fragment>
		<div class="ticket-status ticket-row" v-if="attendee">
			<div class="ticket-icon">
				<img
					src="@/assets/icons/DD_SITE_ICONS_SMILEY.png"
					alt="ticket icon"
					description="develop denver ticket icon"
				/>
			</div>
			<h3>
				Claimed by {{ attendeeName }}
				<span v-if="myTicket">(that's you!)</span>
			</h3>
		</div>

		<div
			v-else-if="unclaimed_ticket && unclaimed_ticket.emailed_to"
			class="ticket-status ticket-row"
		>
			<div class="ticket-icon">
				<img
					src="@/assets/icons/DD_SITE_ICONS_SMILEY.png"
					alt="ticket icon"
					description="develop denver ticket icon"
				/>
			</div>
			<h3>Emailed to {{ unclaimed_ticket.emailed_to }}</h3>
			<div class="ticket-actions">
				<button @click="remind">Send a reminder</button>
				<button @click="revoke">Revoke invitation</button>
			</div>
		</div>
		<div v-else class="ticket-status ticket-row">
			<div class="ticket-icon">
				<img
					src="@/assets/icons/DD_SITE_ICONS_TIX.png"
					alt="ticket icon"
					description="develop denver ticket icon"
				/>
			</div>
			<h3 v-if="!status">Not yet shared</h3>
			<h3 v-if="status">{{ status }}</h3>
			<div class="ticket-actions">
				<input
					type="email"
					v-model="shareWith"
					@change="updateShareWith"
					placeholder="friend@email.com"
				/>
				<button
					class="invite-link"
					:class="{ disabled: status }"
					@click="share"
				>
					Invite
				</button>
			</div>
		</div>
	</fragment>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';
import Fragment from 'vue-fragment';
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
		updateShareWith(event) {
			this.shareWith = event.target.value;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';

.ticket-row {
	@include grid-full-width;
	@include flexbox;
	@include flex-flow(row wrap);
	@include align-items(center);
	border-bottom: $thin-border-width solid $black;
	padding: $baseline;
	width: 100%;
	h3 {
		margin-bottom: 0;
		text-transform: capitalize;
		@media (max-width: $small-breakpoint) {
			font-size: 17px;
			line-height: 1.2rem;
			word-break: break-word;
		}
	}
	.ticket-actions {
		@include flexbox;
		@include justify-content(space-between) width: 100%;
		@include align-items(center);
		@include flex-flow(row);

		button {
			margin-top: $baseline;
			min-width: 300px;
			// width: calc(50% - 20px);
			&:first-child {
				margin-right: $baseline;
			}
			&:last-child {
				margin-left: $baseline;
			}
			&.invite-link {
				max-width: 300px;
				min-width: 200px;
				width: 30%;
			}
		}
		input {
			margin-bottom: 0;
			margin-top: $baseline;
		}
		@media (max-width: 966px) {
			@include flex-wrap(wrap);
			button {
				min-width: 200px;
				&:first-child,
				&:last-child {
					margin-left: 0;
					margin-right: 0;
				}
				&.invite-link {
					width: 100%;
					max-width: 100%;
				}
			}
		}
	}
}
.ticket-icon {
	height: auto;
	margin-right: $baseline;
	width: 50px;
	img {
		height: auto;
		width: 100%;
	}
}
</style>
