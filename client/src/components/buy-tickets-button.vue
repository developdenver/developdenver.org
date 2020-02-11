<template>
	<fragment>
		<router-link
			class="button"
			v-if="isLoggedIn"
			:to="{ name: 'tickets#buy-tickets' }"
		>
			<button>Buy Tickets</button>
		</router-link>
		<router-link
			class="button"
			v-if="!isLoggedIn"
			:to="{ name: 'register' }"
		>
			<button>Buy Tickets</button>
		</router-link>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

export default {
	computed: {
		isLoggedIn() {
			return this.$store.getters['services/user/isLoggedIn'] || false;
		},
	},
};
</script>
