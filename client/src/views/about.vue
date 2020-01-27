<template>
	<fragment>
		<section class="about-landing">
			<h1>Learn, Network, Share, Develop .... love?</h1>
			<div class="plus-grid red"></div>
		</section>
		<section class="demo-reel full">
			<div class="video responsive-iframe-container">
				<iframe
					class="responsive-iframe"
					src="https://www.youtube.com/embed/ZsRunRoI8Rk?controls=0&rel=0&showInfo=0"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</section>
		<section class="about">
			<HeaderBar
				title="About"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_COMMUNITY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="full-text">
				<p>
					Behind the scenes is a group of friends who are passionate
					about building community and bringing people together. Our
					mission is to create something that empowers the makers and
					doers of the community.
				</p>
			</div>
		</section>

		<section class="organizers">
			<HeaderBar
				title="Organizers"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_COMMUNITY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="full-text">
				<p>
					Behind the scenes is a group of friends who are passionate
					about building community and bringing people together. Our
					mission is to create something that empowers the makers and
					doers of the community.
				</p>
			</div>
			<profile-card-list :profiles="boardProfiles" />
		</section>
	</fragment>
</template>

<script>
import ProfileCardList from '../components/profile-card-list';
import boardProfiles from '../data/board-profiles';
import Vue from 'vue';
import Fragment from 'vue-fragment';
import HeaderBar from '@/components/header-bar.vue';

export default {
	components: {
		ProfileCardList,
		HeaderBar,
	},
	computed: {
		boardProfiles() {
			return boardProfiles;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
.about-landing {
	background: $yellow;
	grid-column: 1 / span 6;
	height: 80vh;
	// overflow: visible;
	h1 {
		grid-column: 1 / span 3;
		grid-row: 1;
	}
	.plus-grid.red {
		@include plus-grid;
		grid-column: 3 / span 4;
		grid-row: 1;
		height: 80vh;
		margin-top: 20vh;
		z-index: 1;
	}
}
.demo-reel {
	background: $yellow;
	grid-column: 1 / span 6;
	position: relative;
	.video {
		grid-column: 1 / span 5;
	}
}
.organizers {
	.full-text {
		padding-bottom: $baseline * 2;
	}
}
</style>
