<template>
  <section class="sponsors">
    <h2>SPONSORS</h2>
    <ul v-if="premiumSponsor" class="platinum-sponsors">
      <li>Sponsor Here</li>
    </ul>
    <ul v-if="siteSponsors.length" class="gold-sponsors">
      <li v-for="(sponsor, index) in siteSponsors" :key="index">
        <a :href="sponsor.link">
          <img :src="sponsor.imageUrl" :alt="sponsor.name">
        </a>
      </li>
    </ul>

    <div class="sponsor-call-to-action">
      <p>Support the Denver development, product, and design community!</p>
      <a class="button" href="mailto:sponsorship@developdenver.org">Become a Sponsor</a>
    </div>
  </section>
</template>

<script>
import zeppelinLogo from "@/assets/logos/zeppelin_station_logo.png"
import denverFlatironLogo from '@/assets/logos/flatiron_Gray_Logo_white.png';
import checkrLogo from '@/assets/logos/Checkr_Logo_white-602x281-5c456d8.png';
export default {
    data() {
        return {
            premiumSponsor: null,
            siteSponsors: [{
					name: "Flatiron School",
					imageUrl: denverFlatironLogo,
					link: "https://flatironschool.com/",
			},{
					name: "Zeppelin Station",
					imageUrl: zeppelinLogo,
					link: "https://zeppelinstation.com/",
			},{
					name: "By The Pixel",
					imageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/efFNBfcJaL2uXmtlWcVeVA/ls.jpg",
					link: "https://bythepixel.com/",
			},{
					name: 'Devetry',
					imageUrl:
							'https://devetry.com/wp-content/uploads/2017/10/logo-opt.png',
					link: 'https://devetry.com/',
			},
			{
				name: 'Relentful',
				imageUrl: 'https://images.squarespace-cdn.com/content/5ca38424f4e5316dcd872aa8/1559102804487-AQ48MRHWI3ML0HCOUGGU/Relentful_Navy.png?format=1500w&content-type=image%2Fpng',
				link: 'https://www.relentful.com',
			},
			{
				name: 'Name.com',
				imageUrl: 'https://clip.brianschiller.com/NTda7M4-2019-07-24-NameLogoForJared.png',
				link: 'https://name.com',
			},
			{
				name: 'Checkr',
				imageUrl: checkrLogo,
				link: 'https://checkr.com/',
			},
			],
        };
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.sponsors {
	@include grid;
	.gold-sponsors {
		@include grid-heading;
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		@media (max-width: $small-breakpoint) {
			justify-content: center;
		}
		img {
			max-width: 200px;
			filter: grayscale(100%);
		}
		li {
			margin-right: $baseline;
			a {
				height: 100%;
				display: flex;
				align-items: center;
			}
			a[href="https://www.relentful.com"] {
				height: 200px;
				img {
					filter: invert(100%) grayscale(100%);
				}
			}
		}
	}
	.sponsor-call-to-action {
		@include grid;
		@include grid-full-width;
		p {
			margin-bottom: $baseline;
			grid-column: 3 / span 6;
			@media (max-width: $small-breakpoint) {
				margin-top: $baseline;
				grid-column: 1;
			}
		}
		.button {
			@include grid-cta;
			@include call-to-action;
		}
	}
}
</style>
