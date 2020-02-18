<template>
	<fragment>
		<section class="user-profile">
			<div class="profile-row">
				<div
					v-if="profile.properties.profilePhotoUrl"
					class="image-container"
				>
					<img
						:src="profile.properties.profilePhotoUrl"
						alt="profile photo"
					/>
				</div>
				<div class="profile-details">
					<h2>{{ fullName }}</h2>
					<h3>
						{{ profile.properties.position }}
					</h3>
					<h3 v-if="profile.properties.employer">
						{{ profile.properties.employer }}
					</h3>
				</div>
			</div>
			<div class="bio profile-row">
				<p>{{ profile.properties.bio }}</p>
				<p v-if="profile.properties.website" class="website">
					Website:
					<a :href="websiteWithProtocol" target="_BLANK">{{
						profile.properties.website
					}}</a>
				</p>
				<ul class="social">
					<li v-if="profile.properties.githubUsername" class="github">
						<a :href="githubUrl" target="_BLANK">
							<component v-bind:is="githubIcon"></component>
						</a>
					</li>
					<li
						v-if="profile.properties.linkedinUsername"
						class="linkedin"
					>
						<a :href="linkedinUrl" target="_BLANK">
							<img :src="linkedinIcon" alt="LinkedIn" />
						</a>
					</li>
					<li
						v-if="profile.properties.twitterUsername"
						class="twitter"
					>
						<a :href="twitterUrl" target="_BLANK">
							<component v-bind:is="twitterIcon"></component>
						</a>
					</li>
				</ul>
			</div>
		</section>
		<section v-if="submittedTalks.length">
			<HeaderBar
				title="Submitted Talks"
				v-bind:imageUrl="
					require('@/assets/icons/DD_SITE_ICONS_SMILEY.png')
				"
				v-bind:hoverUrl="
					require('@/assets/icons/DD_HOVER_DVLP_DNVR.svg')
				"
			/>
			<TalkInfo
				view="profile"
				:talk="talk"
				v-for="(talk, ix) in submittedTalks"
				:key="'submitted' + ix"
			/>
		</section>
	</fragment>
</template>

<script>
import Vue from 'vue';
import Fragment from 'vue-fragment';

import HeaderBar from '@/components/header-bar.vue';
import linkedinIcon from '@/assets/icons/linkedin.png';
import githubIcon from '@/components/icon-github.vue';
import twitterIcon from '@/components/icon-twitter.vue';
import TalkInfo from '@/components/talk-info.vue';

export default {
	components: {
		HeaderBar,
		TalkInfo,
	},
	data() {
		return { linkedinIcon, githubIcon, twitterIcon };
	},
	props: {
		profile: {
			type: Object,
			required: true,
		},
	},
	computed: {
		image() {
			return {
				url: this.profile.properties.profilePhotoUrl,
				altText: 'Profile photo',
			};
		},
		fullName() {
			return `${this.profile.properties.firstName} ${
				this.profile.properties.lastName
			}`;
		},
		submittedTalks() {
			return this.$store.getters['talks/getTalksByUserId'](
				this.profile.id,
			);
		},
		acceptedTalks() {
			return this.$store.getters['talks/getTalksByUserId'](
				this.profile.id,
			).filter(talk => talk.properties.isAccepted);
		},
		twitterUrl() {
			return `https://www.twitter.com/${
				this.profile.properties.twitterUsername
			}`;
		},
		githubUrl() {
			return `https://www.github.com/${
				this.profile.properties.githubUsername
			}`;
		},
		linkedinUrl() {
			return /^https?:/.test(this.profile.properties.linkedinUsername)
				? this.profile.properties.linkedinUsername
				: `https://www.linkedin.com/in/${
						this.profile.properties.linkedinUsername
				  }`;
		},
		websiteWithProtocol() {
			return /^https?:\/\//.test(this.profile.properties.website)
				? this.profile.properties.website
				: `https://${this.profile.properties.website}`;
		},
	},
	mounted() {
		this.$store.dispatch('talks/fetchTalks');
	},
};
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/_flex.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.user-profile {
	@include grid-full-width;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	.profile-row {
		@include grid;
		@include grid-full-width;
		@include align-items(end);
		&.bio {
			padding-top: $baseline;
			p,
			ul {
				@include grid-full-width;
			}
		}
	}
	.image-container {
		grid-column: 1 / span 2;
		padding-right: $baseline;
		img {
			filter: grayscale(100%);
			height: auto;
			max-width: 100%;
			width: 100%;
		}
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
			padding-right: 0;
		}
	}
	.profile-details {
		grid-column: 3 / span 3;
		@media (max-width: $small-breakpoint) {
			grid-column: 1;
		}
		display: flex;
		flex-flow: column nowrap;
	}
	.social {
		display: flex;
		flex-flow: row wrap;
		li {
			&:not(:first-child) {
				margin-left: $baseline;
			}
			width: 40px;
			height: 40px;
			&:hover {
				svg {
					path,
					rect,
					polygon {
						fill: $red;
					}
				}
			}
			svg {
				width: 100%;
				height: auto;
			}
		}
	}
}
</style>
