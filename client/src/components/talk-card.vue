<template>
    <div class="talk-card">
		<router-link :to="{name: 'talk', params: {id: talk.id}}" :class="{disabled: !talk.id}">
            <div class="frame"></div>
			<div class="image-wrapper" :style="{backgroundImage: `url(${talk.properties.talkPhotoUrl})`}"></div>
            <div class="title-plate">
                <p class="title">{{talk.properties.title}}</p>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
	props: {
		talk: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss">
    @import "@/styles/_sizes.scss";
    @import "@/styles/_colors.scss";
    @import "@/styles/_typography.scss";

    .talk-card {
        position: relative;
        width: 100%;
        height: 400px;
        overflow: hidden;
		background-color: $light-grey;
		z-index: 1;
        &:hover {
            .frame {
                border: 10px solid $primary-color;
            }
            .title-plate {
                transform: translateY(0);
                opacity: 1;
            }
			.image-wrapper {
				transform: scale(1.2);
			}
        }
		.disabled {
			pointer-events: none;
		}
		.image-wrapper {
			position: relative;
			z-index: -10;
			width: 100%;
			height: 100%;
			background-size: cover;
			transition: transform 3s cubic-bezier(0, 1, 1, 1);
		}
        .title-plate {
            position: absolute;
            bottom: 0;
            height: 40%;
            width: 100%;
            transition: all 0.3s cubic-bezier(0.666, 0, 0.333, 1);
            opacity: 0;
            transform: translateY(100%);
            background-color: transparentize($dark-grey, 0.1);
            color: $white;
            padding: $large;
            .title {
                @include bold-body-font;
                margin-bottom: 0;
            }
            .type {
                @include body-font;
            }
        }
        .frame {
            position: absolute;
            width: 100%;
            height: 100%;
            transition: border 0.3s cubic-bezier(0.666, 0, 0.333, 1);
            z-index: 10;
            border: 0 solid $primary-color;
        }
    }
</style>
