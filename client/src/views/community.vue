<template>
	<section class="community">
		<h2>Community</h2>
		<profile-card-list :profiles="shuffledProfiles" />
	</section>
</template>

<script>
import ProfileCardList from "@/components/profile-card-list.vue";

export default {
	components: {
		ProfileCardList,
	},
	created() {
		return this.$store.dispatch("fetchProfiles");
	},
	computed: {
		shuffledProfiles() {
			const profilesWithPhotos = this.$store.state.profiles
				.filter(profile => profile.properties.profilePhotoUrl);
			return this.shuffle(profilesWithPhotos);
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
@import "@/styles/_typography.scss";

.community {
	width: 100%;
	h2 {
		@include section-header-font;
	}
}
</style>
