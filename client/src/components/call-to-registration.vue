<template>
    <section class="call-to-registration">
        <div class="call-to-action">
            <span class="slogan">Bringing together developers, designers, strategists, 
                and those looking to dive deeper into the interactive world for two 
                days of hands on code &amp; design talks.</span>
            <p class="date">October 18th & 19th</p>
            <router-link class="button" :to="{name: 'register'}">Join Us</router-link>
        </div>
    </section>
</template>
<script>

export default {
	components: {
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
        padding-left: 50px;
        width: 70%;
        .slogan {
            @include section-header-font;
            display: block;
            line-height: 35px;
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
            z-index: 10;
            opacity: 0.85;
        }
        @media (max-width: $medium-breakpoint){
            z-index: 10;
            opacity: 0.85;
            width: 90%;
        }
    }
}
</style>
