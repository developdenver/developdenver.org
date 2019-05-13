<template>
	<div class="hamburger-container">
		<div class="hamburger-menu" :class="{open: isMenuOpen}">
			<nav>
				<ul>
					<li><router-link :to="{name: 'login'}">Login</router-link></li>
					<li><router-link :to="{name: 'news'}">News</router-link></li>
					<li><a href="mailto:hello@developdenver.org">Contact</a></li>
					<li><router-link :to="{name: 'tickets'}">Buy Tickets</router-link></li>
					<li><router-link :to="{name: 'talks'}">Talks</router-link></li>
					<li><router-link :to="{name: 'submit-talk'}">Submit a Talk</router-link></li>
					<li><a href="mailto:sponsorship@developdenver.org">Sponsorship</a></li>
					<li class="social-links">
						<ul>
							<li v-for="socialLink in socialLinks">
								<a :href="socialLink.linkUrl" target="BLANK">
									<img :src="socialLink.iconUrl" alt="socialLink.altText" />
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script>
import twitterIcon from '@/assets/icons/twitter_white.svg';
import instagramIcon from '@/assets/icons/instagram_white.svg';
import youtubeIcon from '@/assets/icons/youtube_white.svg';
import facebookIcon from '@/assets/icons/facebook_white.svg';

export default {
	data() {
		return {
			socialLinks: [{
				linkUrl: "https://twitter.com/dvlpdnvr",
				altText: "Twitter",
				iconUrl: twitterIcon,
			},{
				linkUrl: "https://www.instagram.com/dvlpdnvr/",
				altText: "Instagram",
				iconUrl: instagramIcon,
			},{
				linkUrl: "https://www.youtube.com/channel/dvlpdnvr",
				altText: "YouTube",
				iconUrl: youtubeIcon,
			},{
				linkUrl: "https://www.facebook.com/dvlpdnvr",
				altText: "Facebook",
				iconUrl: facebookIcon,
			}],
		}
	},
	props: {
		isMenuOpen: Boolean,
	}
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';

.hamburger-container {
	position: relative;
	.hamburger-menu {
		position: fixed;
		//width: 100%;
		z-index: 50;
		left: -200vw;
		right: auto;
		transition: left 0.2s, right 0.2s;
		background-color: black;
		@media (max-width: $small-breakpoint) {
			left: initial;
			right: initial;
			top: auto;
			bottom: -200vh;
			transition: bottom 0.2s, top 0.2s;
		}
		&.open {
			left: 80px;
			@media (max-width: $small-breakpoint) {
				left: initial;
				bottom: $mobile-footer-size;
					width: 100%;
			}
		}
		li {
			@include primary-header-font;
			background-color: $black;
		}
		nav {
			> ul {
				display: flex;
				flex-flow: rows nowrap;
				@media (max-width: $small-breakpoint) {
					flex-flow: column nowrap;
					width: 100%;
				}
				> li {
					border-left: 1px solid $white;
					padding: $baseline;
					&:not(.social-links) {
						writing-mode: vertical-rl;
						transform: rotate(180deg);
						@media (max-width: $small-breakpoint) {
							writing-mode: initial;
							transform: initial;
							font-size: $baseline;
						}
					}
					&.social-links {
						ul {
							display: flex;
							flex-flow: row wrap;
							width: 200px;
							@media (max-width: $small-breakpoint) {
								width: auto;
							}
							img {
								margin: auto $baseline;
								width: 60px;
								height: 60px;
								@media (max-width: $small-breakpoint) {
									width: 30px;
									height: 30px;
								}
							}
						}
					}
					a:hover {
						color: $accent-color;
					}
				}
			}
		}
	}
}
</style>
