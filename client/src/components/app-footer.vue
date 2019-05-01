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
					<a href="mailto:hello@developdenver.org">Contact</a>
				</li>
				<ul class="social-links">
					<li>
						<a href="https://twitter.com/dvlpdnvr">Twitter</a>
					</li>
					<li>
						<a href="https://www.instagram.com/dvlpdnvr/">Instagram</a>
					</li>
					<li>
						<a href="https://www.youtube.com/channel/dvlpdnvr">YouTube</a>
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
export default {
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
	> nav {
		margin-bottom: $baseline * 2;
		&> ul {
			@include grid;
			grid-template: auto / repeat(8, 1fr);
			li {
				writing-mode: vertical-lr;
				@include primary-header-font;
				text-align: right;
				a:hover {
					color: $accent-color;
				}
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
					text-align: right;
					@include primary-header-font;
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
