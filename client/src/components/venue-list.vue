<template>
	<div class="yellow-background">
		<section id="locations">
			<HeaderBar
				title="Locations"
				v-bind:imageUrl="require('@/assets/icons/happy_black.svg')"
			/>
			<div class="logos-row">
				<a
					v-for="venue in venues"
					:key="venue.name"
					:href="venue.linkUrl"
					target="blank"
				>
					<img :src="venue.imageUrl" :alt="venue.name" />
				</a>
			</div>
			<div class="map">
				<LocationMap />
			</div>
		</section>
	</div>
</template>

<script>
// Components
import HeaderBar from '@/components/header-bar.vue';
import LocationMap from '@/components/location-map.vue';
// Logos
import bigsbyLogo from '../assets/logos/bigsbys_folly_logo_small-black.png';
import catalystLogo from '@/assets/logos/catalyst_logo_rgb_black.png';
import helikonLogo from '../assets/logos/helikon_logo_final-black.png';
import sourceLogo from '../assets/logos/source_hotel_logo_black.png';
import zeppelinLogo from '@/assets/logos/zeppelin_station_logo_black.png';

export default {
	data() {
		return {
			venues: [
				{
					name: 'The Source Hotel',
					linkUrl: 'https://thesourcehotel.com/',
					imageUrl: sourceLogo,
				},
				{
					name: 'Zeppelin Station',
					linkUrl: 'https://zeppelinstation.com/',
					imageUrl: zeppelinLogo,
				},
				{
					name: 'Helikon Gallery',
					linkUrl: 'https://helikongallery.com/',
					imageUrl: helikonLogo,
				},
				{
					name: 'Catalyst HTI',
					linkUrl: 'http://www.catalysthealthtech.com/',
					imageUrl: catalystLogo,
				},

				{
					name: "Bigsby's Folly",
					linkUrl: 'https://www.bigsbysfolly.com/',
					imageUrl: bigsbyLogo,
				},
			],
		};
	},
	components: {
		HeaderBar,
		LocationMap,
	},
};
</script>

<style lang="scss">
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';

section {
	.logos-row {
		@include flexbox;
		grid-column: 1 / span 6;
		grid-row: 2;
		a {
			@include flex(1);
			margin: $baseline $baseline * 2;
			img {
				width: 16.66%;
				min-width: 100px;
			}
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			justify-content: center;
		}
	}
	.map {
		grid-column: 1 / span 6;
		grid-row: 3;
		svg {
			width: 100%;
			height: auto;
		}
	}
}
</style>
