<template>
    <section class="profile-page">
        <user-profile v-if="currentProfile" :profile="currentProfile" />
        <profile-card-list v-if="shuffledProfiles" :profiles="shuffledProfiles" />
    </section>
</template>

<script>
import ProfileCardList from "@/components/profile-card-list.vue";
import UserProfile from "@/components/user-profile.vue";

export default {
	components: {
		ProfileCardList,
		UserProfile,
	},
	computed: {
		currentProfile() {
			return this.$store.getters.getProfileById(this.$route.params.id);
		},
		shuffledProfiles() {
			return this.shuffle(this.$store.state.profiles);
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
    .profile-page {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>
