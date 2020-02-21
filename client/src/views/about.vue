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
		<section id="what-it-is">
			<HeaderBar
				title="What is it"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<div class="intro">
				<p>
					DVLP DNVR (Develop Denver) is a two-day conference focused
					on inspiring and building community – and blowing a few
					minds along the way. Over the past eight years we've brought
					together developers, designers, and anyone looking to dive
					deeper into tech, to hear talks that you vote on presented
					by your peers on topics ranging from design, dev ops,
					frontend, backend, UX, strategy and more.
				</p>
				<p>
					We are unique in that we are one of the only conference
					where the content is picked by you. You read that right,
					every talk, presentation and speaker at Develop Denver is
					voted on by the ticketholders, which means more of exactly
					what you want to hear.
				</p>
			</div>

			<router-link
				v-if="isLoggedIn"
				class="button"
				:to="{ name: 'submit-talk' }"
				><button>Submit a Talk</button></router-link
			>
			<span class="register-wrapper" :class="{ full: !isLoggedIn }">
				<BuyTicketsButton />
			</span>
		</section>
		<section class="about-image full no-padding">
			<div class="plus-grid red"></div>
			<div class="about-image">
				<img
					src="/img/2020/dd_20_community.jpg"
					alt="Develop Denver Community"
				/>
			</div>
			<div class="plus-grid red"></div>
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
			<div class="wte-list">
				<p>Expect this and more:</p>
				<ul class="bullet-list">
					<li>Two days of talks on topics voted on by you</li>
					<li>Breakfast and snacks</li>
					<li>Free food and alcohol both days</li>
					<li>After hours fun and community building</li>
					<li>
						A chance to network and connect with your community and
						peers
					</li>
					<li>Opening Party</li>
					<li>9th annual Ballmer Peak Hackathon</li>
					<li>Closing Party</li>
				</ul>
				<BuyTicketsButton />
			</div>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import boardProfiles from '../data/board-profiles';
import BuyTicketsButton from '@/components/buy-tickets-button.vue';
import Countdown from '@/components/count-down.vue';
import HeaderBar from '@/components/header-bar.vue';

export default {
	components: {
		BuyTicketsButton,
		Countdown,
		HeaderBar,
	},
	computed: {
		boardProfiles() {
			return boardProfiles;
		},
		isLoggedIn() {
			return this.$store.getters['services/user/isLoggedIn'] || false;
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
	.plus-grid.red {
		grid-column: 3 / span 4;
		height: 80vh;
		margin-top: 20vh;
		width: 50vw;
	}
	@media (max-width: $small-breakpoint) {
		grid-column: 1;
		.plus-grid.red {
			height: 15vh;
			margin-top: 25vh;
		}
	}
}
.demo-reel {
	background: $yellow;
	@include grid-full-width;
	position: relative;
	.video {
		grid-column: 1 / span 5;
	}
	@media (max-width: $small-breakpoint) {
		grid-column: 1;
		padding-top: 0;
		.video {
			grid-column: 1;
		}
	}
}
.organizers {
	.full-text {
		padding-bottom: $baseline * 2;
	}
}
#what-to-expect,
#what-it-is {
	.intro,
	.wte-list {
		@include grid-full-width;
		grid-row: 2;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
	}
	a {
		grid-column: 1 / span 3;
		&:last-child {
			grid-column: 4 / span 3;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			&:last-child {
				grid-column: 1;
			}
		}
	}
	.register-wrapper {
		grid-column: 4 / span 3;
		&.full {
			@include grid-full-width;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			&:last-child {
				grid-column: 1;
			}
		}
	}
}
.about-image {
	padding-top: $baseline * 2;
}
</style>
