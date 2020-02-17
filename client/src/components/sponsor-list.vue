<template>
	<section class="sponsors">
		<HeaderBar
			title="Current Sponsors"
			v-bind:imageUrl="
				require('@/assets/icons/DD_SITE_ICONS_SPONSORS.png')
			"
			v-bind:hoverUrl="require('@/assets/icons/DD_HOVER_SPONSORS.svg')"
		/>

		<!-- <ul v-if="premiumSponsor" class="platinum-sponsors">
			<li>Sponsor Here</li>
		</ul> -->
		<div class="plus-grid"></div>
		<ul v-if="siteSponsors.length" class="gold-sponsors">
			<li v-for="(sponsor, index) in siteSponsors" :key="index">
				<a :href="sponsor.link">
					<img
						:src="sponsor.imageUrl"
						:alt="sponsor.name"
						:class="{ white: sponsor.white }"
					/>
				</a>
			</li>
		</ul>
		<div class="sponsor-call-to-action" v-if="showButton">
			<p>
				Support the Denver development, product, and design community!
			</p>
			<a class="button" href="mailto:sponsorship@developdenver.org"
				><button>Become a Sponsor</button></a
			>
		</div>
	</section>
</template>

<script>
import HeaderBar from '@/components/header-bar.vue';
import zeppelinLogo from '@/assets/logos/zeppelin_station_logo_black.png';
import denverFlatironLogo from '@/assets/logos/flatiron_Gray_Logo_white.png';
import checkrLogo from '@/assets/logos/Checkr_Logo_white-602x281-5c456d8.png';
import visibleLogo from '@/assets/logos/visible_core_palette_logo_3.svg';
import mozillaLogo from '@/assets/logos/moz-logo-1color-white-rgb.png';
export default {
	data() {
		return {
			premiumSponsor: null,
			siteSponsors: [
				{
					name: 'Flatiron School',
					imageUrl: denverFlatironLogo,
					link: 'https://flatironschool.com/',
				},
				{
					name: 'Zeppelin Station',
					imageUrl: zeppelinLogo,
					link: 'https://zeppelinstation.com/',
				},
				{
					name: 'By The Pixel',
					imageUrl:
						'https://s3-media1.fl.yelpcdn.com/bphoto/efFNBfcJaL2uXmtlWcVeVA/ls.jpg',
					link: 'https://bythepixel.com/',
				},
				{
					name: 'Devetry',
					imageUrl:
						'https://devetry.com/wp-content/uploads/2017/10/logo-opt.png',
					link: 'https://devetry.com/',
				},
				{
					name: 'Relentful',
					imageUrl:
						'https://images.squarespace-cdn.com/content/5ca38424f4e5316dcd872aa8/1559102804487-AQ48MRHWI3ML0HCOUGGU/Relentful_Navy.png?format=1500w&content-type=image%2Fpng',
					link: 'https://www.relentful.com',
				},
				{
					name: 'Name.com',
					imageUrl:
						'https://clip.brianschiller.com/NTda7M4-2019-07-24-NameLogoForJared.png',
					link: 'https://name.com',
				},
				{
					name: 'Checkr',
					imageUrl: checkrLogo,
					link: 'https://checkr.com/',
				},
				{
					name: 'Visible',
					imageUrl: visibleLogo,
					link: 'https://www.visible.com',
				},
				{
					name: 'Mozilla',
					imageUrl: mozillaLogo,
					link: 'https://www.mozilla.org',
				},
			],
		};
	},
	components: {
		HeaderBar,
	},
	props: {
		showButton: Boolean,
	},
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.sponsors {
	.gold-sponsors {
		@include grid-heading;
		@include flexbox;
		@include flex-flow(row wrap);
		@include justify-content(flex-start);
		@media (max-width: $small-breakpoint) {
			@include justify-content(center);
		}

		li {
			@include flex(1);
			padding: $baseline;
			a {
				@include flexbox;
				@include align-items(center);
				height: 200px;
				img {
					filter: grayscale(100%);
					max-height: 200px;
					max-width: 200px;
				}
			}
			a[href="https://www.relentful.com"], a[href="https://www.visible.com"], a[href="https://flatironschool.com/"], a[href="https://www.mozilla.org"], a[href="https://checkr.com/"] {
				width: 200px;
				img {
					filter: invert(100%) grayscale(100%);
				}
			}
		}
		@media (max-width: $small-breakpoint) {
			li {
				@include flexbox;
				@include justify-content(center);
				@include flex(auto);
				width: 50%;
				&:nth-child(1n) {
					padding: 0 $baseline 0 0;
				}
				&:nth-child(2n) {
					padding: 0 0 0 $baseline;
				}
				a {
					@include justify-content(center);
					img {
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
	.sponsor-call-to-action {
		@include grid-full-width;
		padding-bottom: $baseline * 4;
		@media (max-width: $medium-breakpoint) {
			padding-bottom: $baseline * 3;
		}
		@media (max-width: $medium-breakpoint) {
			grid-column: 1;
		}
	}
}
</style>
