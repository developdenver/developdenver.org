<template>
    <section class="sponsorship">
		<div class="hero">
			<countdown />
			<div class="call-to-sponsorship">
				<span class="slogan">Support the <br /><strong>conference</strong></span>
				<img class="happy-icon" :src="happyIcon" alt="happy" />
				<span class="slogan" >Support the <br /><strong>community</strong></span>
				<a class="button" href="mailto:sponsorship@developdenver.org">Reach Out</a>
			</div>
		</div>
		<div class="sponsorship-details">
			<section class="exposure">
				<h2>Exposure</h2>
				<h3><strong>500 +</strong></h3>
				<div>
					<p>Attendees include:</p>
					<ul>
						<li>Developers</li>
						<li>Designers</li>
						<li>Infrastructure Engineers</li>
						<li>Product Designers</li>
						<li>Engineering Managers</li>
					</ul>
				</div>
				<div>
					<p>Develop Denver attendees are disproportionately influential in the community.</p>
					<p>Experience level of attendees covers the full range, with 10% of tickets last year going to students and attendees coming to the conference for 5 years or more.</p>
				</div>
			</section>
			<section class="benefits">
				<h2>Benefits</h2>
				<p>Every single sponsor this year will have the opportunity to purchase tickets at a discounted rate of $199. If you buy ten or more we will drop the price to $149 per ticket.</p>
				<p>This year we are trying to do more than give an amazing conference experience once a year. We are also trying to help Denver stay educated and connected by funding local meetups where we can. A small portion of every single sponsor's donation this year will go to helping local meetups in need. If you want to be more involved in this aspect of giving please let us know and we will facilitate accordingly.</p>
				<a class="button" href="mailto:sponsorship@developdenver.org">Become a sponsor</a>
			</section>
			<section class="partners">
				<h2>Current Partners</h2>
				<div class="logos">
					<a v-for="partner in partners" :key="partner.name" :href="partner.linkUrl">
					  <img :src="partner.imageUrl" :alt="partner.name">
					</a>
				</div>
			</section>
		</div>
    </section>
</template>

<script>
import Countdown from "@/components/count-down";
import happy from '@/assets/icons/happy_white.svg';

import zeppelinLogo from "@/assets/logos/zeppelin_station_logo.png"
import bigTroubleLogo from "@/assets/logos/big_trouble_logo.png"
import catalystLogo from "@/assets/logos/catalyst_logo_rgb_l.png"
import bigsbyLogo from "../assets/logos/bigsbys_folly_logo_small.png"
import sourceLogo from "../assets/logos/source_hotel_logo.png"
import helikonLogo from "../assets/logos/helikon_logo_final-01.png"

export default {
	components: {
		Countdown,
	},
	data(){
		return {
			partners: [{
				name: "By The Pixel",
				imageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/efFNBfcJaL2uXmtlWcVeVA/ls.jpg",
				link: "https://bythepixel.com/",
			}, {
				name: 'Devetry',
				imageUrl: 'https://devetry.com/wp-content/uploads/2017/10/logo-opt.png',
				link: 'https://devetry.com/',
			}, {
				name: "Zeppelin Station",
				linkUrl: "https://zeppelinstation.com/",
				imageUrl: zeppelinLogo,
			}, {
				name: "Big Trouble",
				linkUrl: "https://zeppelinstation.com/big-trouble",
				imageUrl: bigTroubleLogo,
			}, {
				name: "Catalyst HTI",
				linkUrl: "http://www.catalysthealthtech.com/",
				imageUrl: catalystLogo,
			}, {
				name: "Bigsby's Folly",
				linkUrl: "https://www.bigsbysfolly.com/",
				imageUrl: bigsbyLogo,
			}, {
				name: "The Source Hotel",
				linkUrl: "https://thesourcehotel.com/",
				imageUrl: sourceLogo,
			}, {
				name: "Helikon Gallery",
				linkUrl: "https://helikongallery.com/",
				imageUrl: helikonLogo,
			}]
		}
	},
    computed: {
		happyIcon() {
			return happy;
		},
	}
}
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";

.sponsorship {
	.hero {
		height: 100vh;
		@include grid;
		grid-auto-rows: min-content;
		@include grid-full-width;
		@media (max-width: $small-breakpoint) {
			height: calc(100vh - #{$mobile-header-size}); // header size
		}
		&::after {
			content: "";
			opacity: 0.3;
			position: absolute;
			z-index: -1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: url("/img/panel.jpg");
			background-size: cover;
		}
	}
	.call-to-sponsorship {
		@include grid-full-width;
		@include grid;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			padding: ($baseline * 4) $baseline ($baseline * 2) $baseline;
		}
		.slogan {
			grid-column: 3 / span 3;
			@include primary-header-font;
			@media (max-width: $small-breakpoint) {
				grid-column: 1;
			}
			strong {
				color: $accent-color;
			}
			&:nth-child(1) {
				grid-row: 1;
			}
			&:nth-child(3) {
				grid-row: 3;
			}
		}
		.button {
			grid-row: 4;
		}
		.happy-icon {
			grid-column: 8 / span 1;
			grid-row: 2;
			max-width: 50%;
			@media (max-width: $small-breakpoint) {
				display: none;
			}
		}
	}
	.button {
		@include call-to-action;
		grid-column: 3 / span 3;
		margin-top: $baseline * 2;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
	}
	.sponsorship-details {
		@include grid-full-width;
		@include grid;
		margin-top: $baseline * 4;
		@media (max-width: $small-breakpoint) {
			padding: $baseline;
		}
		h2 {
			@include grid-heading;
		}
		> section {
			margin-bottom: $baseline * 4;
		}
		.exposure {
			@include grid-full-width;
			@include grid;
			h3 {
				@include grid-text-0;
				@include primary-header-font;
				color: $accent-color;
			}
			div:nth-of-type(1) {
				@include grid-text-1;
				@include talk-title-font;
				margin-bottom: $baseline;
				ul {
					list-style: none;
					li {
						&:before {
							content: "+";
							margin-right: $baseline;
						}
					}
				}
			}
			div:nth-of-type(2) {
				@include grid-text-2;
			}
		}
		.benefits {
			@include grid-full-width;
			@include grid;
			p:nth-of-type(1) {
				@include grid-text-1;
			}
			p:nth-of-type(2) {
				@include grid-text-2;
			}
		}
		.partners {
			@include grid-full-width;
			@include grid;
			.logos {
				grid-column: 3 / span 7;
				display: flex;
				flex-flow: row wrap;
				justify-content: center;
				align-items: center;
				a {
					margin: $baseline $baseline * 2;
				}
				@media (max-width: $small-breakpoint) {
					grid-column: 1;
					justify-content: center;
				}
				img {
					width: 200px;
				}
			}
		}
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>

