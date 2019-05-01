<template>
  <div class="index">
    <section class="hero">
      <hero-banner/>
    </section>
    <section class="ticket-info">
      <feature-benefit
        v-for="featureBenefit in featureBenefits"
        :key="featureBenefit.heading"
        v-bind="featureBenefit"
      />
      <div class="ticket-details">
        <h2>Conference Details</h2>
        <p>When: August 15 and 16, 2019</p>
        <p>Where: RiNo Brighton Boulevard</p>
      </div>

      <div class="ticket-details">
        <h2>Venues</h2>
        <venue-list/>
      </div>

      <div class="ticket-details">
        <h2>Conference Badges</h2>
        <p>Conference badges are now on sale!</p>
        <p>All badges include access to:</p>
        <ul>
          <li>Custom printed 2-day conference badge</li>
          <li>Access to keynote, talks, workshops, and live podcasts</li>
          <li>Coffee, Breakfast, and Lunch at Zeppelin Station vendors both days</li>
          <li>Opening and closing parties</li>
          <li>8th annual Ballmer Peak Hackathon</li>
        </ul>
      </div>

      <div class="ticket-details">
        <h3>Pricing</h3>
        <p>
          Early Bird - $149
          <em>($299 after May 1st)</em>
        </p>
        <p>
          Employer - $399
          <em>(Help make Develop Denver affordable to all attendees)</em>
        </p>

        <p>
          Don’t worry, we’re all setup so you can purchase a group of conference badges. You’ll be asked to provide an email address for each attendee and you’re good to go. Have questions? Please contact us at
          <a
            href="mailto:hello@developdenver.org"
          >hello@developdenver.org</a> if you need help.
        </p>
        <router-link class="button" :to="{name: 'tickets'}">Purchase Badge</router-link>
      </div>
    </section>
    <FeaturedTalks/>
    <CallForTalks/>
    <sponsor-list/>
  </div>
</template>

<script>
import HeroBanner from '@/components/hero-banner.vue';
import ProfileCardList from '@/components/profile-card-list';
import FeatureBenefit from '@/components/feature-benefit.vue';
import SponsorList from '@/components/sponsor-list';
import CallForTalks from '@/components/call-for-talks';
import VenueList from '@/components/venue-list';
import FeaturedTalks from '@/components/featured-talks.vue';

import boardProfiles from '@/data/board-profiles';
import featureBenefits from '@/data/feature-benefits';

export default {
    components: {
        HeroBanner,
        ProfileCardList,
        FeatureBenefit,
        SponsorList,
        CallForTalks,
        VenueList,
        FeaturedTalks,
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
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_general.scss';

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
        align-items: center;
        max-width: $max-line-length;
        padding: $baseline;
        .button {
            @include call-to-action-button;
            margin: 0 auto;
        }
        h2 {
            @include section-header-font;
            width: 100%;
            align-self: flex-start;
        }
        p {
            @include stylized-body-font;
            max-width: $max-line-length;
        }
        .ticket-details {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            width: 100%;
            margin-bottom: $large;
            h3 {
                @include tertiary-header-font;
                width: 100%;
                align-self: flex-start;
            }
            ul {
                list-style-type: circle;
                max-width: 79vw;
                li {
                    margin-bottom: $small;
                }
            }
        }
    }
}
</style>
