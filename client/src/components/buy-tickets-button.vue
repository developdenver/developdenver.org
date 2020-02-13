<template>
	<fragment>
		<router-link class="button" v-if="isLoggedIn" to="/tickets#buy-tickets">
			<button>Buy Tickets</button>
		</router-link>
		<span>
			<router-link
				class="button"
				v-if="!isLoggedIn"
				:to="{ name: 'register' }"
			>
				<button>Register To Buy</button>
			</router-link>
			<router-link class="login-link" :to="{ name: 'login' }"
				>Or login</router-link
			>
		</span>
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

<style lang="scss">
@import '@/styles/_general.scss';
.login-link {
	float: left;
	padding-top: $baseline / 2;
}
</style>
