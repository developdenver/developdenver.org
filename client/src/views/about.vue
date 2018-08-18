<template>
    <section class="about">
		<div class="details">
			<h2>About</h2>
			<p>Behind the scenes is a group of friends that are passionate about building community and bringing people together. Our mission is to create something that empowers the makers and doers of the community.</p>
		</div>
		<profile-card-list :profiles="boardProfiles" />
    </section>
</template>

<script>
import ProfileCardList from "../components/profile-card-list";
import boardProfiles from "../data/board-profiles";

export default {
	components: {
		ProfileCardList,
	},
	computed: {
		boardProfiles() {
			return boardProfiles;
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_typography.scss";

.about {
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	.details {
		align-self: center;
		h2 {
			@include tertiary-header-font;
			margin-bottom: $baseline;
		}
	}
}
</style>
