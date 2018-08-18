<template>
    <section class="a-profile">
        <profile v-if="currentProfile" :profile="currentProfile" />
        <profile-card-list v-if="shuffledProfiles" :profiles="shuffledProfiles" />
    </section>
</template>

<script>
import ProfileCardList from "@/components/profile-card-list.vue";
import Profile from "@/components/profile.vue";

export default {
	components: {
		ProfileCardList,
		Profile,
	},
	created() {
		return this.$store.dispatch("getProfiles");
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
			let currentIndex = array.length, temporaryValue, randomIndex;

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
    .a-profile {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>
