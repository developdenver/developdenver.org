<template>
	<fragment>
		<section id="talk-landing" class="full landing-screen">
			<countdown />
			<div class="plus-grid"></div>
		</section>
		<user-profile v-if="currentProfile" :profile="currentProfile" />
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import ProfileCardList from '@/components/profile-card-list.vue';
import UserProfile from '@/components/user-profile.vue';
import Countdown from '@/components/count-down';

export default {
	components: {
		ProfileCardList,
		UserProfile,
		Countdown,
	},
	created() {
		this.$store.dispatch('profiles/fetchProfiles');
	},
	computed: {
		currentProfile() {
			return this.$store.getters['profiles/getProfileById'](
				this.$route.params.id,
			);
		},
		shuffledProfiles() {
			return this.shuffle(this.$store.state.profiles.list);
		},
	},
	methods: {
		shuffle(array) {
			let currentIndex = array.length;
			let temporaryValue;
			let randomIndex;

			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
</style>
