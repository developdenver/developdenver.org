<template>
	<div class="hamburger-container">
		<div class="hamburger-menu" :class="{ open: isMenuOpen }">
			<nav>
				<ul>
					<li>
						<router-link
							class-active="active"
							:to="{ name: 'about' }"
							>About</router-link
						>
					</li>
					<li>
						<router-link
							class-active="active"
							:to="{ name: 'schedule' }"
						>
							Schedule
						</router-link>
					</li>
					<li>
						<router-link
							class-active="active"
							:to="{ name: 'tickets' }"
						>
							Tickets
						</router-link>
					</li>
					<li>
						<router-link
							class-active="active"
							:to="{ name: 'sponsorship' }"
						>
							Sponsorship
						</router-link>
					</li>
					<!--<li>
						<router-link :to="{ name: 'talks' }"
							>Submissions</router-link
						>
					</li> -->
					<li v-if="isLoggedIn">
						<router-link
							class-active="active"
							:to="{ name: 'submit-talk' }"
							>Submit a Talk</router-link
						>
					</li>
					<li>
						<router-link
							class-active="active"
							:to="{ name: 'contact' }"
						>
							Contact
						</router-link>
					</li>
					<li v-if="!isLoggedIn">
						<router-link
							class-active="active"
							:to="{ name: 'login', query: redirectToPageQuery }"
							>Login</router-link
						>
					</li>
					<li v-if="isLoggedIn">
						<router-link
							class-active="active"
							:to="{ name: 'my-profile' }"
							>My Profile</router-link
						>
					</li>
					<li v-if="isLoggedIn">
						<a href="#" @click.prevent="logout"
							>Logout {{ userFirstName }}</a
						>
					</li>
					<!-- <li v-if="!isLoggedIn">
						<router-link
							:to="{
								name: 'register',
								query: redirectToPageQuery,
							}"
							>Register</router-link
						>
					</li> -->

					<li class="social-links">
						<ul>
							<li
								v-for="socialLink in socialLinks"
								:key="socialLink.linkUrl"
							>
								<a :href="socialLink.linkUrl" target="BLANK">
									<component
										v-bind:is="socialLink.icon"
									></component>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</template>

/* SCRIPT */
<script>
import twitterIcon from '@/components/icon-twitter.vue';
import instagramIcon from '@/components/icon-instagram.vue';
import youtubeIcon from '@/components/icon-youtube.vue';
import facebookIcon from '@/components/icon-facebook.vue';

export default {
	data() {
		return {
			socialLinks: [
				{
					linkUrl: 'https://twitter.com/dvlpdnvr',
					altText: 'Twitter',
					icon: 'twitterIcon',
				},
				{
					linkUrl: 'https://www.instagram.com/dvlpdnvr/',
					altText: 'Instagram',
					icon: 'instagramIcon',
				},
				{
					linkUrl: 'https://www.youtube.com/channel/dvlpdnvr',
					altText: 'YouTube',
					icon: 'youtubeIcon',
				},
				{
					linkUrl: 'https://www.facebook.com/dvlpdnvr',
					altText: 'Facebook',
					icon: 'facebookIcon',
				},
			],
		};
	},
	components: {
		twitterIcon,
		instagramIcon,
		youtubeIcon,
		facebookIcon,
	},
	props: {
		isMenuOpen: Boolean,
	},
	computed: {
		currentIconComponent: function() {
			return this.icon;
		},
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

/* STYLES */
<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.hamburger-container {
	position: relative;
	.hamburger-menu {
		@include align-items(center);
		background: $yellow;
		bottom: 0;
		display: flex;
		left: -200vw;
		position: fixed;
		width: calc(100% - 100px);
		right: auto;
		top: 0;
		transition: left 0.5s linear;
		z-index: 50;
		@media (max-width: $small-breakpoint) {
			bottom: -200vh;
			height: calc(100% - #{$mobile-footer-size});
			left: 0;
			right: 0;
			top: auto;
			width: 100%;
		}
		&.open {
			left: 100px;
			@media (max-width: $small-breakpoint) {
				@include align-items(flex-end);
				@include justify-content(flex-end);
				bottom: $mobile-footer-size;
				border: none;
				left: 0;
				right: 0;
				top: 0;
				transition: bottom 0.3s linear;
			}
		}
		nav {
			height: 100%;
			padding-bottom: $baseline * 3;
			width: 100%;
			> ul {
				display: flex;
				flex-flow: rows nowrap;
				height: 100%;
				@media (max-width: $small-breakpoint) {
					flex-flow: column nowrap;
					width: 100%;
				}
				> li {
					@include primary-header-font;
					font-size: 5vw;
					border-left: $thin-border-width solid $black;

					@media (max-width: $small-breakpoint) {
						border: none;
					}

					a {
						padding: $baseline;
						padding-top: $baseline * 2;
						&.router-link-active {
							background: $black;
							color: $yellow;
						}
					}
					&:hover {
						background: $black;
						a {
							color: $yellow;
						}
					}

					&:not(.social-links) {
						transform: rotate(180deg);
						writing-mode: vertical-rl;
						@media (max-width: $small-breakpoint) {
							font-size: $baseline;
							padding: $baseline / 2;
							transform: initial;
							writing-mode: initial;
						}
					}
					&.social-links {
						border-left: none;
						border-right: $thin-border-width solid $black;
						&:hover {
							background: $yellow;
							a {
								color: $black;
							}
						}
						ul {
							@include flexbox;
							@include flex-flow(column);
							@include justify-content(space-between);
							height: 100%;
							@media (max-width: $small-breakpoint) {
								width: auto;
							}
							svg {
								margin: auto $baseline;
								width: 50px;
								path {
									fill: $black;
								}
								&:hover {
									fill: $red;
								}
								@media (max-width: $small-breakpoint) {
									height: 30px;
									width: 30px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
