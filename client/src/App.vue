<template>
	<div id="app">
		<header>
			<h1>Develop Denver</h1>
			<router-link to="/">
				<img class="logo" src="./assets/logo.svg" alt="Develop Denver Logo" />
			</router-link>
			<nav>
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
		</header>
		<main>
			<router-view/>
		</main>
		<section class="sponsors">
			<h2>Sponsors</h2>
			<ul class="platinum-sponsors">
				<li>Sponsor Here</li>
			</ul>
			<ul class="gold-sponsors">
				<li>Sponsor Here</li>
			</ul>
			<div class="sponsor-call-to-action">
			<a class="button" href="mailto:hello@developdenver.com">Interested in Sponsoring?</a>
			</div>
		</section>
		<footer>
			<nav>
				<ul>
					<li><router-link :to="{name: 'register'}">Register</router-link></li>
					<li><router-link :to="{name: 'logins'}">Login</router-link></li>
					<li><router-link :to="{name: 'tickets'}">Tickets</router-link></li>
					<li><router-link :to="{name: 'community'}">Community</router-link></li>
					<li><router-link :to="{name: 'schedule'}">Schedule</router-link></li>
					<li><router-link :to="{name: 'code-of-conduct'}">Code Of Conduct</router-link></li>
					<li><router-link :to="{name: 'about'}">About</router-link></li>
				</ul>
				<ul>
					<li><a href="mailto:hello@developdenver.org">Contact</a></li>
					<li><a href="https://twitter.com/dvlpdnvr">Twitter</a></li>
					<li><a href="https://www.youtube.com/channel/UCFSQPaLHhmx44bmgpHoF4RQ">YouTube</a></li>
				</ul>
			</nav>
		</footer>
	</div>
</template>

<style lang="scss">
	@import "@/styles/_reset.scss";
	@import "@/styles/_typography.scss";

	#app {
		min-height: 100vh;
		display: grid;
		grid-template:
			"header" auto
			"main" auto
			"sponsors" auto
			"footer" auto / auto;
		font-family: "Montserrat", sans-serif;
		@include body-font;
		h1 {
			display: none;
		}
		.logo {
			width: 150px;
			margin-top: 55px;
			margin-bottom: 55px;
		}
		header {
			grid-area: header;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			padding: 0 6rem;
			nav {
				width: 50%;
				margin-bottom: 12rem;
				ul {
					display: flex;
					flex-flow: row wrap;
					justify-content: center;
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
		}
		main {
			grid-area: main;
		}
		.sponsors {
			grid-area: sponsors;
			background-color: hsla(0, 0%, 0%, 0.03%);
			padding: 1rem;
			h2 {
				display: block;
				text-align: center;
				@include section-header-font;
			}
			a {
				display: inline-block;
				@include call-to-action-font;
			}
			ul {
				padding: 1rem;
				border-bottom: 1px solid #ddd;
			}
			.sponsor-call-to-action {
				display: flex;
				justify-content: center;
				padding: 3rem;
				.button {
					margin: 0 auto;
				}
			}
		}
		footer {
			background-color: #252525;
			grid-area: footer;
			color: #fff;
			padding: 1rem;
			ul {
				display: flex;
				justify-content: center;
				li {
					padding: 1rem;
					display: inline-block;
					a {
						text-decoration: none;
						@include footer-link-font;
						transition: all 0.2s;
						&:hover {
							color: #d43e53;
						}
					}
				}
			}
		}
		.button {
			background-color: #3e9dd4;
			transition: all 0.2s;
			color: #fff;
			text-decoration: none;
			padding: 1rem;
			&:hover {
				background-color: #d43e53;
			}
		}
	}
</style>
