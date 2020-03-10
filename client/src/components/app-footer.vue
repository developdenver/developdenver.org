<template>
	<footer class="app-footer">
		<nav>
			<ul>
				<li class="contact-email">
					<router-link :to="{ name: 'contact' }">
						Contact Us
					</router-link>
				</li>
				<li class="pp">
					<router-link :to="{ name: 'privacy-policy' }"
						>Privacy Policy</router-link
					>
				</li>
				<li class="coc">
					<router-link :to="{ name: 'code-of-conduct' }"
						>Code Of Conduct</router-link
					>
				</li>
			</ul>
		</nav>
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
			socialLinks: [
				{
					linkUrl: 'https://twitter.com/dvlpdnvr',
					altText: 'Twitter',
					iconUrl: twitterIcon,
				},
				{
					linkUrl: 'https://www.instagram.com/dvlpdnvr/',
					altText: 'Instagram',
					iconUrl: instagramIcon,
				},
				{
					linkUrl: 'https://www.youtube.com/dvlpdnvr',
					altText: 'YouTube',
					iconUrl: youtubeIcon,
				},
				{
					linkUrl: 'https://www.facebook.com/dvlpdnvr',
					altText: 'Facebook',
					iconUrl: facebookIcon,
				},
			],
		};
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
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.app-footer {
	background: $yellow;
	bottom: 0;
	border-top: $thin-border-width solid $black;
	left: 100px;
	margin-top: $baseline * 8;
	position: fixed;
	right: 0;
	z-index: 100;
	@media (max-width: $small-breakpoint) {
		display: none;
	}
	> nav {
		& > ul {
			@include footer-font;
			@include flexbox;
			@include justify-content(flex-end);
			> li {
				border-left: $thin-border-width solid $black;
				font-size: 12px;
				padding: $baseline/2 $baseline;
				min-width: 150px;
				a {
					text-align: center;
					text-decoration: none;
					width: 100%;
				}
				&:hover {
					background: $black;
					a {
						color: $yellow;
					}
				}
			}
		}
	}
}
</style>
