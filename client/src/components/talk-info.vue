<template>
	<section class="talk" :id="`submission-${talk.id}`">
	<div class="image-icon">
	  <img :src="photoUrl" alt="Speaker headshot" />
	</div>
	<div class="talk-details">
	  <h3>
		  {{talk.properties.title}}
		  <router-link
			v-if="isCurrentUserTalk"
			class="edit-talk-link"
		    :to="{name: 'edit-talk', params: {id: talk.id}}"
	  	  >Edit Talk</router-link>
	  </h3>
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
		<div v-html="descriptionHtml"></div>
		<p class="events-link"><router-link :to="{name: 'events'}">See our other great events!</router-link></p>
	  </div>
	</div>
	<button v-if="isAttendee && !talk.properties.isFeatured" class="vote-button" @click="voteOrUnvote">
		{{ voteText }}
	</button>
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
	methods: {
		voteOrUnvote() {
			if (this.talk.properties.voted) {
				this.$store.dispatch('talks/unvote', this.talk);
			} else {
				this.$store.dispatch('talks/vote', this.talk);
			}
		},
	},
    computed: {
		isAttendee() {
			return this.$store.getters['tickets/isAttendee'];
		},
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
		currentUser() {
            return this.$store.getters['services/user/currentProfile'];
        },
        isCurrentUserTalk() {
            return this.currentUser
                ? +this.talk.properties.userId === +this.currentUser.id
                : false;
		},
		voteText() {
			return this.talk.properties.voted ? 'unvote' : 'vote';
		},
		photoUrl() {
			const fallback = "https://pbs.twimg.com/profile_images/1033908994870374400/2nUcOGak_400x400.jpg";
			return this.talk.properties.profilePhotoUrl || fallback;
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
	margin-top: $baseline * 4;
	a {
		text-decoration: underline;
		color: $accent-color;
	}
	.image-icon {
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
	}
	.talk-details {
		grid-row: 1;
		grid-column: 5 / span 5;
		padding-left: $baseline;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			column-width: initial;
		}
		a {
			text-decoration: underline;
		}
		.events-link {
			margin-top: $baseline * 2;
		}
		.description-html {
			margin-top: $baseline;
			@include grid;
			grid-template-columns: repeat(2, 1fr);
			&[open] {
				summary p, summary ul, summary ol, summary h2, summary h3 {
					display: none;
				}
			}
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
		summary::-webkit-details-marker {
			color: $accent-color;
		}
		summary::marker {
			color: $accent-color;
		}
		.edit-talk-link {
			margin-left: 8px;
		}
	}
	.vote-button {
		@include call-to-action;
		text-transform: uppercase;
		grid-row: 2;
		grid-column: 5 / span 2;
		color: white;
		outline: none;
		user-select: none;
		font-size: 20px;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
	}
}
</style>
