<template>
	<footer class="app-footer">
		<nav>
			<ul>
				<li><router-link :to="{name: 'register'}">Register</router-link></li>
				<li><router-link :to="{name: 'login'}">Login</router-link></li>
				<li><router-link :to="{name: 'tickets'}">Tickets</router-link></li>
				<li><router-link :to="{name: 'community'}">Community</router-link></li>
				<li><router-link :to="{name: 'schedule'}">Schedule</router-link></li>
				<li><router-link :to="{name: 'code-of-conduct'}">Code Of Conduct</router-link></li>
				<li><router-link :to="{name: 'privacy-policy'}">Privacy Policy</router-link></li>
				<li><router-link :to="{name: 'about'}">About</router-link></li>
			</ul>
			<ul>
				<li><a href="mailto:hello@developdenver.org">Contact</a></li>
				<li><a href="https://twitter.com/dvlpdnvr">Twitter</a></li>
				<li><a href="https://www.youtube.com/channel/UCFSQPaLHhmx44bmgpHoF4RQ">YouTube</a></li>
			</ul>
		</nav>
	</footer>
</template>

<style lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";

	.app-footer {
		position: relative;
		background-color: $dark-grey;
		color: $white;
		padding: $large;
		.bottom-bar {
			position: absolute;
			top: 0;
		}
		ul {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			@media (max-width: $large-breakpoint) {
				flex-flow: column nowrap;
			}
			li {
				display: inline-block;
				padding: $baseline;
				a {
					@include footer-link-font;
					transition: all $transition;
					text-decoration: none;
					&:hover {
						color: $secondary-color;
					}
				}
			}
		}
	}
</style>
