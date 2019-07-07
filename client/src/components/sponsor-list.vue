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

export default {
    data() {
        return {
            premiumSponsor: null,
            siteSponsors: [{
					name: "Flatiron School",
					imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/FS_wiki.png/250px-FS_wiki.png",
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
			}],
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
