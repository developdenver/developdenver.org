<template>
    <div class="index">
        <section class="hero">
            <hero-banner />
        </section>
        <feature-benefit
            v-for="featureBenefit in featureBenefits"
            :key="featureBenefit.heading"
            :copy="featureBenefit.copy"
            :heading="featureBenefit.heading"
            :image="featureBenefit.image"
        />
        <section class="ticket-info">
			<div class="ticket-details">
				<h2><img src="../assets/logos/tickets.svg" alt="Tickets" class="svg" /></h2>
				<p>Tickets are now on sale!</p>
				<p>When: October 18 - 19</p>
				<p>Where: RiNo Brighton Boulevard</p>
			</div>
            <div class="venues">
				<a href="https://zeppelinstation.com/big-trouble"><img src="../assets/logos/big_trouble_logo.svg" /></a>
				<a href="https://www.bigsbysfolly.com/"><img src="../assets/logos/bigsbys_folly_logo_small.png" /></a>
				<a href="http://www.catalysthealthtech.com/"><img src="../assets/logos/catalyst_logo_rgb_l.png" /></a>
            </div>
            <div class="venues">
				<a href="https://thesourcehotel.com/"><img src="../assets/logos/source_hotel_logo.svg" /></a>
				<a href="https://www.theucdenver.com/"><img src="../assets/logos/urban_cyclist_logo_small.png" /></a>
				<a href="https://zeppelinstation.com/"><img src="../assets/logos/zeppelin_station_logo.svg" /></a>
            </div>
			<div class="ticket-details">
				<p>All tickets include conference badge, attendance to keynote speakers, talks, and workshops. Your ticket also included coffee, breakfast, lunch at Zeppelin Station, afternoon open bar, opening and closing party drinks, and closing party taco bar!</p>
				<p>Looking to purchase a group of tickets? Our apologies, our setup requires each user to register and purchase tickets individually. Please contact us at <a href="mailto:hello@developdenver.org">hello@developdenver.org</a> if you need help purchasing multiple tickets.</p>
				<router-link class="button" :to="{name: 'tickets'}">Buy Tickets</router-link>
			</div>
        </section>
		<call-for-talks />
        <sponsor-list />
    </div>
</template>

<script>
import HeroBanner from "@/components/hero-banner.vue";
import ProfileCardList from "@/components/profile-card-list";
import FeatureBenefit from "@/components/feature-benefit.vue";
import SponsorList from "@/components/sponsor-list";
import CallForTalks from "@/components/call-for-talks";

import boardProfiles from "@/data/board-profiles";
import featureBenefits from "@/data/feature-benefits";

export default {
	components: {
		HeroBanner,
		ProfileCardList,
		FeatureBenefit,
		SponsorList,
		CallForTalks,
	},
	computed: {
		boardProfiles() {
			return boardProfiles;
		},
	},
	data() {
		return {
			featureBenefits,
		};
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_typography.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_general.scss";

.index {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    section {
        width: 100%;
        .call-to-registration {
            margin-top: 0;
        }
    }
	.about {
		margin-top: $xxl;
		.details {
			width: 100%;
			display: flex;
			align-items: center;
			flex-flow: column nowrap;
			h2 {
				padding: 0 $baseline;
				.board-svg {
					height: $large;
					padding: 0;
				}
			}
			p {
				padding: $baseline;
			}
			.details-wrapper {
				width: 100%;
				p {
					@include stylized-body-font;
					max-width: $max-line-length;
					padding: $baseline;
				}
			}
		}
	}
    .ticket-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: $xl;
        .button {
            @include call-to-action-button;
            margin: 0 auto;
        }
		h2 {
			@include section-header-font;
			width: 10rem;
		}
		p {
			@include stylized-body-font;
			max-width: $max-line-length;
		}
		.ticket-details {
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
		}
        .venues {
            margin: 0 auto;
            width: 800px;
            margin-bottom: 40px;
            img {
                width: 200px;
                height: auto;
                margin: 15px 30px 0;
            }
            @media (max-width: $medium-breakpoint) {
                width: 100%;
            }
            @media (max-width: $small-breakpoint) {
                img {
                    display: block;
                }
            }
        }
    }
    .feature {
        /*max-width: 90%;*/
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
			> img {
                order: 2;
                width: 60%;
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
