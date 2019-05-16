<template>
	<footer class="app-footer">
		<nav>
			<ul>
				<li class="coc">
					<router-link :to="{name: 'code-of-conduct'}">Code Of Conduct</router-link>
				</li>
				<li class="pp">
					<router-link :to="{name: 'privacy-policy'}">Privacy Policy</router-link>
				</li>
				<li class="contact-email">
					<a href="mailto:hello@developdenver.org" target="_BLANK">Contact</a>
				</li>
				<ul class="social-links">
					<li v-for="socialLink in socialLinks" :key="socialLink.linkUrl">
						<a :href="socialLink.linkUrl" target="BLANK">
							<img :src="socialLink.iconUrl" alt="socialLink.altText" />
						</a>
					</li>
				</ul>
			</ul>
		</nav>
		<div class="devetry-plug">
			<p>Website maintained by <a href="https://devetry.com/">Devetry</a>.  We simplify the complex world of software.</p>
		</div>
	</footer>
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
	computed: {
		isLoggedIn() {
			return this.$store.getters['services/user/isLoggedIn'];
		},
		isAttendee() {
			return this.$store.getters['tickets/isAttendee'];
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.app-footer {
	padding: 0 $baseline * 2;
	max-width: $max-width;
	margin-top: $baseline * 8;
	@media (max-width: $small-breakpoint) {
		display: none;
	}
	> nav {
		margin-bottom: $baseline * 2;
		&> ul {
			@include grid;
			grid-template: auto / repeat(8, 1fr);
			li {
				writing-mode: vertical-lr;
				transform: rotate(180deg);
			}
			> li {
				@include footer-font;
				display: flex;
				align-items: flex-end;
				justify-content: flex-end;
				padding-right: $baseline;
				border-right: 1px solid $white;
				a:hover {
					color: $accent-color;
				}
			}
			ul.social-links {
				padding-left: $baseline;
				border-left: 1px solid $accent-color;
				color: $accent-color;
			}
			.coc {
				grid-column: 2;
			}
			.pp {
				grid-column: 4;
			}
			.contact-email {
				grid-column: 6;
			}
			.social-links {
				grid-column: 8;
				li {
					display: inline-block;
					writing-mode: horizontal-tb;
					transform: rotate(0);
					text-align: right;
					@include primary-header-font;
					img {
						margin: $baseline / 2 $baseline * 2;
						height: 40px;
						width: 40px;
					}
				}
			}
		}
	}
	.devetry-plug {
		@include grid;
		grid-template: auto / repeat(8, 1fr);
		p {
			grid-column: 2 / span 7;
		}
	}
}
</style>
