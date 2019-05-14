<template>
	<div class="hamburger-container">
		<div class="hamburger-menu" :class="{open: isMenuOpen}">
			<nav>
				<ul>
					<li v-if="!isLoggedIn">
						<router-link :to="{name: 'register', query: redirectToPageQuery}">Register</router-link>
					</li>
					<li v-if="!isLoggedIn">
						<router-link :to="{name: 'login', query: redirectToPageQuery}">Login</router-link>
					</li>
					<li>
						<router-link :to="{name: 'news'}">News</router-link>
					</li>
					<li><a href="mailto:hello@developdenver.org">Contact</a></li>
					<li><router-link :to="{name: 'tickets'}">Buy Tickets</router-link></li>
					<li><router-link :to="{name: 'talks'}">Submissions</router-link></li>
					<li v-if="isLoggedIn">
					  <router-link :to="{name: 'submit-talk'}">Submit a Talk</router-link>
					</li>
					<li v-if="isLoggedIn">
					  <router-link :to="{name: 'my-profile'}">My Profile</router-link>
					</li>
					<li>
					  <router-link :to="{name: 'sponsorship'}">Sponsorship</router-link>
					</li>
					<li v-if="isLoggedIn">
					  <a href="#" @click.prevent="logout">Logout {{userFirstName}}</a>
					</li>
					<li class="social-links">
						<ul>
							<li v-for="socialLink in socialLinks" :key="socialLink.linkUrl">
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
	},
    computed: {
        isLoggedIn() {
            return this.$store.getters['services/user/isLoggedIn'] || false;
        },
        isAttendee() {
            return this.$store.getters['tickets/isAttendee'] || false;
        },
        currentUser() {
            return this.$store.getters['services/user/currentProfile'];
        },
        userFirstName() {
            return this.currentUser.properties.firstName || '';
        },
        redirectToPageQuery() {
            if (this.$route.meta.takeItBackNowYall) {
                return { redirect: this.$route.path };
            }
            if (this.$route.query.redirect) {
                return this.$route.query;
            }
            return null;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('services/user/logout');
            this.$router.push('/');
        },
    },
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
		display: flex;
		align-items: center;
		width: calc(100% - 80px);
		left: -200vw;
		top: 0;
		bottom: 0;
		right: auto;
		transition: left 0.5s linear;
		background-color: rgba($black, 0.9);
		z-index: 50;
		@media (max-width: $small-breakpoint) {
			left: 0;
			right: 0;
			top: auto;
			bottom: -200vh;
			width: 100%;
			height: calc(100% - #{$mobile-footer-size});
		}
		&.open {
			left: 80px;
			@media (max-width: $small-breakpoint) {
				align-items: flex-end;
				justify-content: flex-end;
				left: 0;
				top: 0;
				right: 0;
				bottom: $mobile-footer-size;
				border: none;
				transition: bottom 0.3s linear;
			}
		}
		li {
			@include primary-header-font;
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
					@media (max-width: $small-breakpoint) {
						border: none;
					}
					&:not(.social-links) {
						writing-mode: vertical-rl;
						transform: rotate(180deg);
						@media (max-width: $small-breakpoint) {
							writing-mode: initial;
							transform: initial;
							font-size: $baseline;
							padding: $baseline / 2;
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
