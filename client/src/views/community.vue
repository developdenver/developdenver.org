<template>
	<section class="community">
		<countdown />
		<h2>Community</h2>
		<profile-card-list :profiles="shuffledProfiles" />
	</section>
</template>

<script>
import ProfileCardList from "@/components/profile-card-list.vue";
import Countdown from '../components/count-down.vue';

export default {
	components: {
		ProfileCardList,
		Countdown,
	},
	created() {
		return this.$store.dispatch("profiles/fetchProfiles");
	},
	computed: {
		shuffledProfiles() {
			const profilesWithPhotos = this.$store.state.profiles.list
				.filter(profile => this.isValidUrl(profile.properties.profilePhotoUrl))
				.filter(profile => profile.properties.role);
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
		isValidUrl(url) {
			const baseUrl = "https://s3-us-west-2.amazonaws.com/develop-denver-user-images/";
			if (url && url.startsWith(baseUrl)) {
				return url.length > baseUrl.length;
			}
			return !!url;
		}
	},
};
</script>

<style lang="scss">
@import "@/styles/_general.scss";
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";

.community {
	@include grid;
	padding: $baseline;
	.profile-card-list {
		grid-column: 3 / span 8;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>
