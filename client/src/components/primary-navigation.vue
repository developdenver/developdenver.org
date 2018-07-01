<template>
	<nav class="primary-navigation">
		<ul>
			<li>
				<router-link :to="{name: 'register'}">Register</router-link>
			</li>
			<li>
				<router-link :to="{name: 'login'}">Login</router-link>
			</li>
			<li>
				<router-link :to="{name: 'tickets'}">Tickets</router-link>
			</li>
			<li>
				<router-link :to="{name: 'schedule'}">Schedule</router-link>
			</li>
			<li>
				<router-link :to="{name: 'community'}">Community</router-link>
			</li>
		</ul>
	</nav>
</template>

<style lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_sizes.scss";

	.primary-navigation {
		max-width: 50%;
		margin-bottom: $xl;
		ul {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			@media (max-width: $large-breakpoint) {
				flex-flow: column nowrap;
				li {
					margin-bottom: $baseline;
				}
			}
			li {
				display: inline-block;
				padding: 0 1.5rem;
				a {
					@include link-font;
					text-decoration: none;
				}
			}
		}
	}
</style>
