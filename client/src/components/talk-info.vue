<template>
  <section class="talk">
	<div class="image-icon" v-if="talk.properties.icon">
	  <img :src="iconSrc" alt="Icon" />
	</div>
	<div class="talk-details">
	  <h3>{{talk.properties.title}}</h3>
	  <div class="description">
		<p v-if="talk.properties.isFeatured" class="author">
		  <router-link
			:to="{
							name: 'profile',
							params: {
								id: talk.properties.authorId,
							},
						}"
		  >{{talk.properties.firstName}} {{talk.properties.lastName}}</router-link>
		</p>
		<details class="description-html">
			<summary v-html="truncatedDescriptionHtml"></summary>
			<div v-html="descriptionHtml"></div>
		</details>
	  </div>
	</div>
  </section>
</template>

<script>
import bomb from '@/assets/icons/bomb_white.svg';
import happy from '@/assets/icons/happy_white.svg';
import skull from '@/assets/icons/skull_white.svg';
import Showdown from 'showdown';
const showdown = new Showdown.Converter();
const icons = { bomb, happy, skull };

export default {
    data() {
        return {
            talkTypes: [
                {
                    label: 'Talk (30 - 45 minutes)',
                    value: 'talk',
                },
                {
                    label: 'Lightning Talk (5 - 10 minutes)',
                    value: 'lightning',
                },
                {
                    label: 'Panel (30 - 45 minutes, multiple people)',
                    value: 'panel',
                },
                {
                    label: 'Workshop',
                    value: 'workshop',
                },
                {
                    label: 'Event',
                    value: 'event',
                },
                {
                    label: 'Performance',
                    value: 'performance',
                },
            ],
        };
    },
    props: {
        talk: {
            type: Object,
            required: true,
        },
    },
    computed: {
		iconSrc() {
			return icons[this.talk.properties.icon];
		},
		truncatedDescriptionHtml() {
			const summaryLength = 250;
			let truncatedDescription = this.talk.properties.description || ''
			truncatedDescription = truncatedDescription.length > summaryLength
				? `${truncatedDescription.substring(0, summaryLength)}...`
				: truncatedDescription;
            return showdown.makeHtml(truncatedDescription);
		},
        descriptionHtml() {
            return this.talk.properties.description
                ? showdown.makeHtml(this.talk.properties.description)
                : '';
        },
        talkLabel() {
            return this.talk.properties.type
                ? this.talkTypes.find(
                      type => type.value === this.talk.properties.type,
                  ).label
                : '';
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.talk {
	@include grid;
	margin-bottom: $baseline * 2;
	.image-icon {
		grid-row: 1;
		grid-column: 3 / span 1;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
		img {
			width: 50%;
		}
	}
	.talk-details {
		grid-row: 1;
		grid-column: 5 / span 4;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			column-width: initial;
		}
		a {
			text-decoration: underline;
		}
		.description-html {
			margin-top: $baseline;
			@include grid;
			grid-template-columns: repeat(2, 1fr);
			&[open] {
				summary p {
					display: none;
				}
			}
		}
		summary::-webkit-details-marker {
			color: $accent-color;
		}
		summary::marker {
			color: $accent-color;
		}
	}
}
</style>
