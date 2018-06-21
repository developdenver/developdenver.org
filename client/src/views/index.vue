<template>
	<div class="index">
		<section class="call-to-registration">
			<div class="mind-melter">
				<img src="@/assets/mind-melter.svg" alt="Skull with exposed brain" />
			</div>
			<div class="call-to-action">
				<span class="slogan">Code</span>
				<span class="slogan">Design</span>
				<span class="slogan">Community</span>
				<p class="date">October 11th & 12th</p>
				<router-link class="button" :to="{name: 'registration'}">Register Today</router-link>
			</div>
		</section>
		<section class="feature">
			<img src="https://developdenver.org/assets/home/experiment-d33d446160e8e1a4211073ce5f153de1632297127679320b17eaa0cdea6cafea.jpg" alt="Conference speaker" />
			<div class="benefit">
				<h2>An Experiment.</h2>
				<p>Bringing developers and designers together for two days of hands on code & design talks. Putting everyone on a level playing field. Pushing people to step out of their comfort zones to learn and try new things.</p>
				<p>Develop Denver has always been about applying creativity to all areas of interactive, be it code styles & techniques, or having a heart to heart with a designer & developer over a bottle of wine in front of a room full of people.</p>
				<p>Photo by <a href="https://www.flickr.com/photos/adammeek/">Adam Meek</a></p>
			</div>
		</section>
		<section class="feature">
			<img src="https://developdenver.org/assets/home/celebration-56a64091bee39e42ba25010850c4c958ac35816b9622078c5ff433e58d693ece.jpg" alt="People having fun" />
			<div class="benefit">
				<h2>A Celebration.</h2>
				<p>Over the past 6 years Develop Denver has become more than a conference. It’s been a place to learn and grow professionally, make new friends and have a great time. It’s been the starting place for great debates on technology and philosophy around creating things for our digital world.</p>
				<p>Bringing together developers, designers, strategists, and those looking to dive deeper into the interactive world.</p>
				<p>Photo by <a href="https://www.flickr.com/photos/adammeek/">Adam Meek</a></p>
			</div>
		</section>
		<section class="feature">
			<img src="https://developdenver.org/assets/home/mind-melter-a6d9a5381c4bf3fccdd422a7a5d4aa59854127ff4f60263a2c75942743884a8c.jpg" alt="Conference audience" />
			<div class="benefit">
				<h2>A Total Mind Melter.</h2>
				<p>Develop Denver exists to inspire and build community. It also has an ability to blow minds and introduce people to new concepts, languages & frameworks.</p>
				<p>Topics ranging from dev ops, frontend, backend, UX, strategy and more there is something for everyone. Talks are submitted by speakers and voted on by the community. The motto is what you put in is what you take out.</p>
			</div>
		</section>
		<section class="feature">
			<img src="https://developdenver.org/assets/home/gathering-013b9b499d852db6230c845e3f4714de5b74496ef226613bc276725c3adabd73.jpg" alt="Group of people registering" />
			<div class="benefit">
				<h2>A Gathering.</h2>
				<p>At the core, Develop Denver is all about the community. It’s about bringing people together from different disciplines to share tricks and create friendships. It’s about having a good time with others in the industry in an informal setting that encourages the sharing of ideas.</p>
				<p>Let's make something October 11th & 12th. </p>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
	@import "@/styles/_typography.scss";

	.index {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		align-items: center;
		.call-to-registration {
			display: grid;
			grid-template:
				"mind-melter call-to-action" auto / 1fr 1fr;
			margin-bottom: 3rem;
			.mind-melter {
				grid-area: mind-melter;
				position: relative;
				img {
					max-width: 500px;
					position: absolute;
					bottom: -30px;
					right: -100px;
				}
			}
			.call-to-action {
				grid-area: call-to-action;
				.slogan {
					@include secondary-header-font;
					display: block;
				}
				.date {
					@include tertiary-header-font;
					margin-top: 1rem;
					margin-bottom: 2rem;
				}
				a {
					display: inline-block;
					text-align: center;
					@include call-to-action-font;
				}
			}
		}
		.feature {
			margin-bottom: 2em;
			display: flex;
			max-width: 90%;
			flex-flow: row nowrap;
			align-items: center;
			img {
			}
			.benefit {
				background-color: #fff;
				max-width: 35em;
				padding: 1em;
				z-index: 10;
				h2 {
					@include section-header-font;
					margin-bottom: 1rem;
				}
				p {
					margin-bottom: 1rem;
				}
			}
			&:nth-child(odd){
				align-self: flex-start;
				img {
					order: 1;
				}
				.benefit {
					order: 2;
					margin-left:  -32px;
				}
			}
			&:nth-child(even){
				align-self: flex-end;
				img {
					order: 2;
				}
				.benefit {
					order: 1;
					margin-right:  -32px;
				}
			}
		}
	}
</style>
