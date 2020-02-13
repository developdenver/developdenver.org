<template>
	<fragment>
		<section id="sponsorship-landing" class="full landing-screen">
			<countdown />
			<h1>Support the conference. Support the community.</h1>
			<div class="plus-grid red"></div>
		</section>

		<section class="exposure">
			<HeaderBar
				title="Sponsor"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SPONSORS.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_SPONSORS.svg')
				"
			/>
			<div class="intro">
				<p>
					Promote your product to over 500 attendees, while showing
					support for the Denver developer community.
				</p>
				<p>
					Atendees include:
				</p>
				<ul class="bullet-list">
					<li>Developers</li>
					<li>Designers</li>
					<li>Infrastructure Engineers</li>
					<li>Product Designers</li>
					<li>Engineering Managers</li>
				</ul>
				<p>
					This year we're doing more than giving an amazing conference
					experience, we're also committing to helping Denver stay
					educated and connected by funding local meetups. That's why
					a small portion of every single sponsor's donation this year
					will go towards helping local meetups in need. If you want
					to be more involved in this aspect of giving, please let us
					know and we will facilitate accordingly.
				</p>
				<p>
					Have questions? Email:
					<a href="mailto:sponsorship@developdenver.org"
						>sponsorship@developdenver.org</a
					>
				</p>
				<a class="button" href="/dvlp_schedule_digital.pdf"
					><button>Download Sponsor Deck</button></a
				>
			</div>
		</section>
		<section class="benefits">
			<HeaderBar
				title="Sponsor Discounts"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SPONSORS.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_SPONSORS.svg')
				"
			/>
			<div class="intro">
				<p>
					Sponsors get a discounted ticket rate of <b>$199 </b> for
					one-to-ten tickets and <b>$149 </b> for more than ten
					tickets purchased.
				</p>

				<p>
					Want to become a sponsor? Have questions? Email us at:
					<a href="mailto:sponsorship@developdenver.org"
						>sponsorship@developdenver.org</a
					>
				</p>
			</div>
		</section>
		<sponsor-list :showButton="false" />
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import Countdown from '@/components/count-down';
import HeaderBar from '@/components/header-bar.vue';
import SponsorList from '@/components/sponsor-list.vue';
export default {
	components: {
		Countdown,
		HeaderBar,
		SponsorList,
	},
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

#sponsorship-landing {
	@include grid-full-width;
	position: relative;
	h1 {
		z-index: 2;
	}
	.plus-grid.red {
		@include plus-grid;
		grid-column: 3 / span 4;
		height: 80vh;
		margin-top: 60vh;
		position: absolute !important;
		width: 50vw;
		right: 0;
		z-index: 1;
	}
}
.exposure a {
	display: inline;
}
.benefits b {
	font-weight: 700;
	color: $red;
}
</style>
