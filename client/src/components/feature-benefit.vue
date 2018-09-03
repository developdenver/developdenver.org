<template>
    <section class="feature">
        <img :src="image.url" :alt="image.altText" />
        <div class="benefit">
			<!-- <h2>{{heading}}</h2> -->
			<img src="../assets/logos/celebration.svg" alt="A Celebration." class="celebration-svg" />
            <div v-html="parsedCopy"></div>
            <slot />
        </div>
    </section>
</template>

<script>
import Showdown from "showdown";

const showdown = new Showdown.Converter();

export default {
	props: {
		image: Object,
		heading: String,
		copy: String,
	},
	computed: {
		parsedCopy() {
			return showdown.makeHtml(this.copy);
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_sizes.scss";

$clip-amount: 80px;

.feature {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-top: $clip-amount * -1;
    margin-bottom: calc($clip-amount * -1) + $large;
	padding: $large $xxl;

    img {
        clip-path: inset($clip-amount 0);
    }
    .benefit {
        background-color: $pure-white;
        padding: $large;
        z-index: 10;
        p {
            @include stylized-body-font;
        }
		.celebration-svg {
			height: $large;
			max-width: 100%;
			padding: 0;
			clip-path: none;
			margin-bottom: $baseline;
		}
    }
    @media (max-width: $large-breakpoint){
        & {
            margin-top: 0;
            margin-bottom: $large;
			padding: 0;
            img {
                display: block;
                width: 100%;
                clip-path: none;
            }
        }
    }
}
</style>
