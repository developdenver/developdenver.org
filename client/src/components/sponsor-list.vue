<template>
	<section class="sponsors">
		<h2>SPONSORS</h2>
		<ul v-if="premiumSponsor" class="platinum-sponsors">
			<li>Sponsor Here</li>
		</ul>
		<ul v-if="siteSponsors.length" class="gold-sponsors">
			<li v-for="(sponsor, index) in siteSponsors" :key="index">
				<a :href="sponsor.link"><img :src="sponsor.imageUrl" :alt="sponsor.name" /></a>
			</li>
		</ul>
		<div class="sponsor-call-to-action">
			<p>Interested in becoming a sponsor?</p>
			<a class="button" href="mailto:hello@developdenver.org">Contact Us</a>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			premiumSponsor: null,
			siteSponsors: [{
				name: "By The Pixel",
				imageUrl: "https://s3-media1.fl.yelpcdn.com/bphoto/efFNBfcJaL2uXmtlWcVeVA/ls.jpg",
				link: "https://bythepixel.com/",
			}, {
				name: "Hofstadter",
				imageUrl: "https://media.licdn.com/dms/image/C4E0BAQElS4RzXU1P8Q/company-logo_200_200/0?e=1545868800&v=beta&t=UycTVMNW77k4WIvnOTEt7GXa5QF1lh_tOs9pSZKhogw",
				link: "https://hofstadter.io/",
			}, {
				name: "Finkel & Garf",
				imageUrl: "http://finkelandgarf.com/assets/img/finkel-and-garf-logo-crest.svg",
				link: "http://finkelandgarf.com/",
			}, {
				name: "ReactiveOps",
				imageUrl: "https://s3-us-west-2.amazonaws.com/develop-denver-user-images/reactiveops.png",
				link: "https://www.reactiveops.com/",
			}],
		};
	},
};
</script>

<style lang="scss">
	@import "@/styles/_typography.scss";
	@import "@/styles/_sizes.scss";
	@import "@/styles/_colors.scss";
	@import "@/styles/_general.scss";

	.sponsors {
		padding: $xxl;
		background-color: $light-grey;
		h2 {
			display: block;
			text-align: center;
			letter-spacing: 0;
			@include section-header-font
		}
		a {
			display: inline-block;
			@include call-to-action-font;
		}
		ul {
			padding: $baseline;
			border-bottom: 1px solid $light-grey;
		}
		.gold-sponsors {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			li {
				margin: $baseline;
				img {
					max-width: 300px;
				}
			}
		}
		img.svg {
			height: $large;
			max-width: 100%;
			padding: 0;
			clip-path: none;
		}
		.sponsor-call-to-action {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: $xl;
			p {
				@include stylized-body-font;
				max-width: 100%;
				text-align: center;
			}
			.button {
				@include call-to-action-button;
				margin: 0 auto;
			}
		}
	}
</style>
