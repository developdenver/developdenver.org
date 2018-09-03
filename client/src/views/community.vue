<template>
	<section class="community">
		<h2>Our Community</h2>
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
		return this.$store.dispatch("profiles/fetchProfiles");
	},
	computed: {
		shuffledProfiles() {
			const profilesWithPhotos = this.$store.state.profiles.list
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
@import "@/styles/_sizes.scss";

.community {
	width: 100%;
	h2 {
		@include tertiary-header-font;
		text-align: center;
		margin-bottom: $baseline;
		padding: $baseline;
	}
}
</style>
