<template>
	<div class="talk talk-row" :id="`submission-${talk.id}`">
		<!-- <div class="image-icon">
			<img :src="photoUrl" alt="Speaker headshot" />
		</div>
		<span
			class="title-and-type featured"
			v-bind:class="{ featurd: talk.properties.isFeatured }"
		> -->
		<div class="image-icon" v-if="talk.properties.isFeatured">
			<img :src="photoUrl" alt="Speaker headshot" />
		</div>
		<span
			class="title-and-type"
			v-bind:class="{ featurd: talk.properties.isFeatured }"
		>
			<h4 v-if="view !== 'profile'" class="abbreviated">
				{{ abbreviatedText(talk.properties.title, 70) }}
			</h4>
			<h4 v-else>
				{{ talk.properties.title }}
			</h4>
			<h3>{{ talk.properties.type }}</h3>
			<h3 class="author" v-if="talk.properties.isFeatured">
				<router-link
					:to="{
						name: 'profile',
						params: {
							id: talk.properties.authorId,
						},
					}"
					>{{ talk.properties.firstName }}
					{{ talk.properties.lastName }}</router-link
				>
			</h3>
		</span>
		<div class="talk-description">
			<div
				v-if="view !== 'talkPage'"
				v-html="truncatedDescriptionHtml"
			></div>
			<router-link
				class="read-more-link"
				v-if="view !== 'talkPage'"
				:to="{ name: 'talk', params: { id: talk.id } }"
				>{{
					view === 'profile' ? 'See talk page' : 'Read more'
				}}</router-link
			>
			<div v-else v-html="descriptionHtml"></div>
		</div>
		<router-link
			v-if="isCurrentUserTalk"
			class="button edit-talk-link"
			:to="{ name: 'edit-talk', params: { id: talk.id } }"
		>
			<button>Edit Talk</button>
		</router-link>
		<button
			v-if="
				isAttendee && !talk.properties.isFeatured && view !== 'profile'
			"
			class="button vote-button"
			@click="voteOrUnvote"
		>
			{{ voteText }}
		</button>
	</div>
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
		view: String,
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
			const summaryLength = 170;
			let truncatedDescription = this.talk.properties.description || '';
			truncatedDescription =
				truncatedDescription.length > summaryLength
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
		isCurrentUserTalk() {
			return this.currentUser
				? +this.talk.properties.userId === +this.currentUser.id
				: false;
		},
		currentUser() {
			return this.$store.getters['services/user/currentProfile'];
		},
		voteText() {
			return this.talk.properties.voted ? 'unvote' : 'vote';
		},
		photoUrl() {
			const fallback =
				'https://pbs.twimg.com/profile_images/1033908994870374400/2nUcOGak_400x400.jpg';
			return this.talk.properties.profilePhotoUrl || fallback;
		},
	},
	methods: {
		abbreviatedText: function(text, maxLength) {
			if (text.length > maxLength) {
				//trim the string to the maximum length
				let trimmedString = text.substr(0, maxLength);

				//re-trim if we are in the middle of a word and
				trimmedString = trimmedString.substr(
					0,
					Math.min(
						trimmedString.length,
						trimmedString.lastIndexOf(' '),
					),
				);
				return trimmedString + '...';
			}
			return text;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.talk-row {
	@include grid-full-width;
	@include grid;
	@include align-items(center);
	padding-bottom: $baseline * 4;
	&:last-of-type {
		padding-bottom: 0;
	}
	.title-and-type {
		@include grid-full-width;
		grid-row: 1;
		padding-bottom: $baseline;
		&.featured {
			grid-column: 3 / span 3;
			@media (max-width: $small-breakpoint) {
				grid-column: 1;
			}
		}
		h4 {
			font-size: 30px;
			line-height: 1.5em;
			padding-bottom: $baseline / 5;
			width: 100%;
		}
	}
	.edit-talk-link {
		@include grid-full-width;
		// button {
		// 	margin-top: 0;
		// }
	}
	.talk-description {
		@include grid-full-width;
	}
	&:last-of-type {
		.talk-description {
			border-bottom: none;
		}
	}
	.vote-button {
		@include grid-full-width;
	}
}
</style>
