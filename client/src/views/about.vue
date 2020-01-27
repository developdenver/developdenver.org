<template>
	<fragment>
		<section id="about-landing" class="full landing-screen">
			<countdown />
			<h1>Vote. Learn. Share. Develop. Repeat.</h1>
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
		<section id="what-to-expect">
			<HeaderBar
				title="What to Expect"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_COMMUNITY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="wte-intro">
				<p>
					DVLP DNVR is about you and what you want to hear.
					Ticketholders vote on submitted talks by their peers to make
					for an agenda with no bulls**t. DVLP DNVR is Denver
					developers coming together (for better or worse) to network,
					share, learn and most importantly, drink. You’ll hear from
					and meet members of the Denver's development community
					contributors. Have an idea? Great this conference is all
					about you.
				</p>
				<router-link :to="{ name: 'submit-talk' }"
					><button>Submit a Talk</button></router-link
				>
			</div>
			<div class="wte-list">
				<p>Expect this and more:</p>
				<ul>
					<li>Two days of talks on topics voted on by you</li>
					<li>Breakfast and snacks</li>
					<li>Free food and alcohol both days</li>
					<li>Opening Party</li>
					<li>9th annual Ballmer Peak Hackathon</li>
					<li>Closing Party</li>
				</ul>
				<router-link :to="{ name: 'tickets' }">
					<button>Buy Tickets</button>
				</router-link>
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
import Vue from 'vue';
import Fragment from 'vue-fragment';

import boardProfiles from '../data/board-profiles';
import Countdown from '@/components/count-down.vue';
import HeaderBar from '@/components/header-bar.vue';
import ProfileCardList from '../components/profile-card-list';

export default {
	components: {
		Countdown,
		HeaderBar,
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
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
#about-landing {
	grid-column: 1 / span 6;
	position: relative;
	.plus-grid.red {
		@include plus-grid;
		grid-column: 3 / span 4;
		grid-row: 2;
		height: 80vh;
		margin-top: 20vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
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
#what-to-expect {
	.wte-intro {
		grid-column: 1 / span 3;
		grid-row: 2;
	}
	.wte-list {
		grid-column: 5 / span 2;
		grid-row: 2;
		ul {
			margin-left: 20px;
			li {
				padding: 0 0 $baseline 0;
				position: relative;
				&:before {
					content: '+';
					left: -20px;
					position: absolute;
				}
			}
		}
	}
}
</style>
