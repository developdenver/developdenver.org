<template>
	<section class="profile-page">
		<countdown />
		<user-profile v-if="currentProfile" :profile="currentProfile" />
	</section>
</template>

<script>
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

.profile-page {
	@include grid;

	.user-profile {
		@include grid-full-width;
	}
}
</style>
