<template>
  <div class="venues">
	<h2>Venues</h2>
	<div class="logos">
		<a v-for="venue in venues" :key="venue.name" :href="venue.linkUrl">
		  <img :src="venue.imageUrl" :alt="venue.name">
		</a>
	</div>
  </div>
</template>

<script>
import zeppelinLogo from "@/assets/logos/zeppelin_station_logo.svg"
import bigTroubleLogo from "@/assets/logos/big_trouble_logo.svg"
import catalystLogo from "@/assets/logos/catalyst_logo_rgb_l.png"
import bigsbyLogo from "../assets/logos/bigsbys_folly_logo_small.png"
import sourceLogo from "../assets/logos/source_hotel_logo.svg"
import helikonLogo from "../assets/logos/helikon_logo_final-01.png"

export default {
    data() {
        return {
            venues: [
                {
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
                },
            ],
        };
    },
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';

.venues {
	.logos {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		img {
			max-width: 200px;
		}
	}
}
</style>
