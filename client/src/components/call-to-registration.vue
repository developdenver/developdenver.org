<template>
    <section class="call-to-registration">
        <div class="call-to-action">
            <span class="slogan">We're back for 2 days of talks, workshops, and celebrations in RiNo on August 15th and 16th!</span>
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
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
    @media (max-width: $large-breakpoint){
        position: relative;
        margin: $xxl 0;
        padding: 0 $baseline;
    }
    .call-to-action {
        width: 70%;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		margin-top: $xl;
        .slogan {
            @include tertiary-header-font;
            font-size: $large;
            display: block;
            line-height: 35px;
			margin-top: $xl;
        }
        .date {
            @include tertiary-header-font;
            margin-top: $baseline;
            margin-bottom: $large;
        }
        .button {
            @include call-to-action-button;
			width: 70%;
			margin-top: $xl;
			margin-bottom: $xl;
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
