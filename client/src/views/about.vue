<template>
	<section class="about">
		<div class="details">
			<h2>About</h2>
			<p>
				Behind the scenes is a group of friends who are passionate about
				building community and bringing people together. Our mission is
				to create something that empowers the makers and doers of the
				community.
			</p>
		</div>
		<div class="demo-reel">
			<h2>2018 Demo Reel</h2>
			<div class="video responsive-iframe-container">
				<iframe
					class="responsive-iframe"
					src="https://www.youtube.com/embed/ZsRunRoI8Rk?controls=0&rel=0&showInfo=0"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</div>
		<profile-card-list :profiles="boardProfiles" />
	</section>
</template>

<script>
import ProfileCardList from '../components/profile-card-list';
import boardProfiles from '../data/board-profiles';

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
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.about {
}
</style>
