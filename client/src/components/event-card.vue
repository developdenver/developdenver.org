<template>
	<section class="event-card" :id="`submission-${event.id}`">
		<div class="speaker-image">
			<img :src="photoUrl" alt="Speaker headshot" />
		</div>
		<div class="talk-details">
			<h3>{{event.properties.title}}</h3>
			<div class="description">
				<p class="author">
					<router-link
						:to="{
							name: 'profile',
							params: {
								id: event.properties.authorId,
							},
						}"
					>{{authorName}}</router-link>
				</p>
				<div class="description-html" v-html="descriptionHtml"></div>
				<div class="share-icon" v-if="!isLinkShowing" @click="showLink">
					<img :src="shareIcon" alt="Share" />
				</div>
				<p v-else><router-link :to="{
					name: 'talk',
					params: {
						id: event.id,
					},
				}">Link to this talk</router-link></p>
			</div>
		</div>
  </section>
</template>

<script>
import Showdown from 'showdown';
const showdown = new Showdown.Converter();
import shareIcon from "@/assets/icons/share.png";

export default {
	data() {
		return {
			isLinkShowing: false,
			shareIcon,
		}
	},
	props: {
		event: {
			type: Object,
			required: true,
		},
	},
	computed: {
		authorName() {
			return `${this.event.properties.firstName} ${this.event.properties.lastName}`;
		},
		photoUrl() {
			const fallback = "https://pbs.twimg.com/profile_images/1033908994870374400/2nUcOGak_400x400.jpg";
			return this.event.properties.profilePhotoUrl || fallback;
		},
        descriptionHtml() {
            return this.event.properties.description
                ? showdown.makeHtml(this.event.properties.description)
                : '';
        },
	},
	methods: {
		showLink() {
			this.isLinkShowing = true;
		},
	}
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.event-card {
	@include grid;
	margin-bottom: $baseline * 2;
	.image-icon {
		grid-row: 1;
		grid-column: 3 / span 1;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
		img {
			width: 30%;
		}
	}
	.speaker-image {
		grid-row: 1;
		grid-column: 3 / span 2;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
		img {
			width: 100%;
			filter: grayscale(100%);
		}
	}
	h3 {
		@include talk-title-font;
		font-size: $baseline;
	}
	.talk-details {
		margin-left: $baseline;
		grid-row: 1;
		grid-column: 5 / span 4;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			column-width: initial;
		}
		a {
			text-decoration: underline;
		}
		.share-icon {
			img {
				width: 32px;
				cursor: pointer;
			}
		}
		.description-html {
			margin-top: $baseline;
			ul, ol {
				list-style: disc;
				margin-bottom: $baseline;
				li {
					margin-left: $baseline;
				}
			}
			strong {
				font-weight: 700;
			}
			em {
				font-style: italic;
			}
			h1, h2, h3, h4, h5, h6 {
				font-size: 1rem;
			}
		}
	}
}
</style>
