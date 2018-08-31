<template>
    <section class="talk">
        <img :src="talk.properties.talkPhotoUrl" alt="Talk photo" />
        <div class="talk-details">
            <h2>{{talk.properties.title}}</h2>
            <div class="description">
                <p>
                    {{talk.properties.description}}
                </p>
                <p class="talk-type">
					Type: {{talk.properties.type}}
				</p>
            </div>
        </div>
    </section>
</template>

<script>

export default {
	props: {
		talk: {
			type: Object,
			required: true,
		},
	},
	computed: {
		image() {
			return {
				url: this.talk.properties.talk_photo_url,
				altText: "Talk photo",
			};
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_typography.scss";
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";

$clip-amount: 80px;

.talk {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    // margin-bottom: calc($clip-amount * -1) + $large;
    .talk-details {
        order: 1;
        margin-top: $xl * -1;
        margin-right: $xl * -1;
        background-color: $pure-white;
        padding: $large;
        z-index: 10;
		min-width: 40%;
        h2 {
            @include section-header-font;
        }
        p {
            @include stylized-body-font;
        }
        .description {
            padding: $large 0;
            border-top: 0.5px solid $medium-light-grey;
            border-bottom: 0.5px solid $medium-light-grey;
            a {
                color: $primary-color;
            }
            .website {
                margin-top: $xl;
            }
        }
    }
    img {
        order: 2;
        clip-path: inset($clip-amount 0);
        max-width: 60%;
    }
	@media (max-width: $medium-breakpoint) {
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		width: 100%;
        img {
            order: 1;
            width: 100%;
			clip-path: none;
        }
		.talk-details {
			width: 100%;
			margin: 0;
		}
	}
    @media (max-width: $large-breakpoint){
        align-self: auto;
        flex-flow: column nowrap;
        align-self: flex-start;
		justify-content: center;
        width: 100%;
		margin-top: 0;
		margin-bottom: $large;
		img {
            order: 1;
			display: block;
			width: 100%;
			clip-path: none;
		}
		.talk-details {
			margin-right: 0;
		}
    }
}
</style>
