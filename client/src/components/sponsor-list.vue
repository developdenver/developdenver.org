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
export default {
    data() {
        return {
            premiumSponsor: null,
            siteSponsors: [
                {
					name: "By The Pixel",
					imageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/efFNBfcJaL2uXmtlWcVeVA/ls.jpg",
					link: "https://bythepixel.com/",
			}, {
                    name: 'Devetry',
                    imageUrl:
                        'https://devetry.com/wp-content/uploads/2017/10/logo-opt.png',
                    link: 'https://devetry.com/',
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
	.button {
		@include call-to-action;
	}
}
</style>
