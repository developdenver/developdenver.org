<template>
	<div class="index">
		<call-to-registration />
		<feature-benefit
			v-for="featureBenefit in featureBenefits"
			:key="featureBenefit.heading"
			:copy="featureBenefit.copy"
			:heading="featureBenefit.heading"
			:image="featureBenefit.image"
		/>
	</div>
</template>

<script>
	import CallToRegistration from "@/components/call-to-registration.vue";
	import FeatureBenefit from "@/components/feature-benefit.vue";

	import featureBenefits from "@/data/feature-benefits";

	export default {
		components: {
			CallToRegistration,
			FeatureBenefit
		},
		data(){
			return {
				featureBenefits
			};
		}
	};
</script>

<style lang="scss">
	@import "@/styles/_sizes.scss";

	.index {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		.feature {
			max-width: 90%;
			@media (max-width: $large-breakpoint){
				flex-flow: column nowrap;
				align-self: flex-start;
				max-width: 100%;
				img {
					order: 1;
					width: 100%;
				}
				.benefit {
					order: 2;
					width: 90%;
				}
			}
			&:nth-child(odd){
				align-self: flex-start;
				img {
					order: 1;
				}
				.benefit {
					order: 2;
					margin-left: $xl * -1;
				}
				@media (max-width: $large-breakpoint){
					align-self: auto;
					img {
						order: 1;
					}
					.benefit {
						order: 2;
						margin-left: 0;
						margin-top: $xl * -1;
					}
				}
			}
			&:nth-child(even){
				align-self: flex-end;
				img {
					order: 2;
				}
				.benefit {
					order: 1;
					margin-right: $xl * -1;
				}
				@media (max-width: $large-breakpoint){
					align-self: auto;
					img {
						order: 1;
					}
					.benefit {
						order: 2;
						margin-right: 0;
						margin-top: $xl * -1;
					}
				}
			}
		}
	}
</style>
