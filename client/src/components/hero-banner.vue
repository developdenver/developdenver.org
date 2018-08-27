<template>
  <div class="hero">
    <app-header />
    <countdown />
    <call-to-registration />
  </div>
</template>

<script>
import Countdown from "@/components/count-down.vue";
import AppHeader from "@/components/app-header.vue";
import CallToRegistration from "@/components/call-to-registration.vue";

export default {
	components: {
        Countdown,
        AppHeader,
        CallToRegistration,
	},
};
</script>

<style scoped lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_general.scss";
@import "@/styles/_sizes.scss";

.hero {
    height: 800px;
    width: 100%;
    background: linear-gradient(rgba(0,0,0,0.7)), url("/img/gathering.jpg");
    background-size: cover;
    position: relative;
    color: $white;
    @media (max-width: $large-breakpoint){
        display: block;
        position: relative;
        padding: 0 $baseline;
    }
}
</style>
