<template>
    <section class="call-to-registration">
        <HeroBanner />
        <div class="call-to-action">
            <span class="slogan">Code</span>
            <span class="slogan">Design</span>
            <span class="slogan">Community</span>
            <p class="date">October 18th & 19th</p>
            <router-link class="button" :to="{name: 'register'}">Join Us</router-link>
        </div>
    </section>
</template>
<script>
import HeroBanner from "@/components/hero-banner.vue";

export default {
	components: {
		HeroBanner,
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

.call-to-registration {
    width: 100%;
    @media (max-width: $large-breakpoint){
        display: block;
        position: relative;
        margin: $xxl 0;
        padding: 0 $baseline;
    }
    .call-to-action {
        .slogan {
            @include secondary-header-font;
            display: block;
        }
        .date {
            @include tertiary-header-font;
            margin-top: $baseline;
            margin-bottom: $large;
        }
        .button {
            @include call-to-action-button;
        }
        @media (max-width: $large-breakpoint){
            background-color: $white;
            z-index: 10;
            opacity: 0.85;
        }
    }
}
</style>
