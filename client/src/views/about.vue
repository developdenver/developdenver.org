<template>
    <section class="about">
        <h2>About</h2>
		<p>Behind the scenes is a group of friends that are passionate about building community and bringing people together. Our mission is to create something that empowers the makers and doers of the community.</p>
		<profile-card-list :profiles="boardProfiles" />
    </section>
</template>

<script>
import ProfileCardList from "../components/profile-card-list";

export default {
	components: {
		ProfileCard
	},
	computed: {
		boardProfiles(){
			return [{
				firstName: "Kyle",
				lastName: "Coberly",
				position: "Executive Director",
				employer: "Develop Denver",
				profilePhotoUrl: "https://kylecoberly.com/images/headshot.jpg",
			}];
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_typography.scss";

.about {
	h2 {
		@include tertiary-header-font;
		margin-bottom: $baseline;
	}
}
</style>
